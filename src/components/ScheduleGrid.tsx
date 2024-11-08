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

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError('User ID not found');
          return;
        }

        const response = await axios.get<ApiResponse>(
          'https://b2d-ventures-backend.onrender.com/api/admin/dashboard/',
          {
            headers: {
              'Content-Type': 'application/json',
              // Add any authentication headers if required
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        // Access the upcoming_meetings from the correct path in the response
        const meetings = response.data.data.attributes.upcoming_meetings;
        
        if (meetings && Array.isArray(meetings)) {
          const filteredMeetings = meetings.filter(
            meeting => meeting.attributes.investor.id === userId
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

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      {scheduleData.length === 0 ? (
        <div className="text-center py-4">No meetings found</div>
      ) : (
        scheduleData.map((meeting: Meeting) => (
          <div key={meeting.id}>
            <div className="grid grid-cols-5 gap-4 mt-4 mb-4">
              <div className="text-black">{meeting.attributes.startup.name}</div>
              <div className="text-secondary font-light ml-10">Date</div>
              <div className="text-black font-light">
                {formatDate(meeting.attributes.start_time)}
              </div>
              <div className="text-secondary font-light ml-10">Time</div>
              <div className="text-black font-light">
                {formatTime(meeting.attributes.start_time)}
              </div>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}