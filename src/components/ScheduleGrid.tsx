import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {

  interface Investor {
    id: string;
    username: string;
    email: string;
  }
  
  interface Startup {
    id: string;
    name: string;
    email: string;
  }
  
  interface MeetingAttributes {
    id: string;
    investor: Investor;
    startup: Startup;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    investor_event_id: string;
  }
  
  interface Meeting {
    type: string;
    id: string;
    attributes: MeetingAttributes;
  }
  
  interface DashboardAttributes {
    statistics: any;
    recent_users: any[];
    recent_deals: any[];
    recent_investments: any[];
    upcoming_meetings: Meeting[];
  }
  
  interface ApiResponse {
    data: {
      type: string;
      attributes: DashboardAttributes;
    };
  }
  
  const [scheduleData, setScheduleData] = useState<Meeting[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("userRole");
        
        if (!userId) {
          setError('User ID not found');
          return;
        }

        if (!role) {
          setError('User role not found');
          return;
        }

        setUserRole(role);

        const response = await axios.get<ApiResponse>(
          `${process.env.NEXT_PUBLIC_URI}api/admin/dashboard/`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const meetings = response.data.data.attributes.upcoming_meetings;
        
        if (meetings && Array.isArray(meetings)) {
          const filteredMeetings = meetings.filter(meeting => 
            role === 'investor' 
              ? meeting.attributes.investor.id === userId
              : meeting.attributes.startup.id === userId
          );
          setScheduleData(filteredMeetings);
        } else {
          console.error('Unexpected API response structure:', response.data);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching meetings:', error);
        setError('Failed to fetch meetings data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return `${date.getHours().toString().padStart(2, '0')}.${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const getDisplayName = (meeting: Meeting): string => {
    return userRole === 'investor' 
      ? meeting.attributes.startup.name 
      : meeting.attributes.investor.username;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[300px] sm:min-w-none">
        {scheduleData.length === 0 ? (
          <div className="text-center py-4">No meetings found</div>
        ) : (
          scheduleData.map((meeting: Meeting) => (
            <div key={meeting.id}>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 mt-4 mb-4">
                <div className="text-black text-sm sm:text-base">
                  {getDisplayName(meeting)}
                </div>
                <div className="text-secondary font-light text-sm sm:text-base sm:ml-10">
                  Date
                </div>
                <div className="text-black font-light text-sm sm:text-base">
                  {formatDate(meeting.attributes.start_time)}
                </div>
                <div className="text-secondary font-light text-sm sm:text-base sm:ml-10">
                  Time
                </div>
                <div className="text-black font-light text-sm sm:text-base">
                  {formatTime(meeting.attributes.start_time)}
                </div>
              </div>
              <hr className="my-2 sm:my-0" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}