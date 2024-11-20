"use client"; // Ensure this is a client component
import React, { useState, useEffect } from "react";
import { TimeInput, DatePicker, Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import axios from "axios"; // Import axios

const Home: React.FC = () => {
  const [startupId, setStartupId] = useState<string | null>(null);
  const [investorId, setInvestorId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedInvestorId = localStorage.getItem("userId");
    if (storedInvestorId) {
      setInvestorId(storedInvestorId);
    } else {
      console.error("Investor ID not found in localStorage");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) {
      setStartupId(idFromUrl);
    } else {
      console.error("Startup ID not found in URL");
    }
  }, []);

  const handleSend = async () => {
    if (!startupId || !investorId) {
      setFeedbackMessage("Startup ID or Investor ID is missing");
      return;
    }

    // Combine date and time into ISO 8601 format
    const startDateTime = dayjs(`${date}T${startTime}`).toISOString();
    const endDateTime = dayjs(`${date}T${endTime}`).toISOString();

    const data = {
      data: {
        attributes: {
          start_time: startDateTime,
          end_time: endDateTime,
          title: title,
          description: description,
        },
      },
    };
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URI}api/investor/${investorId}/schedule-meeting/${startupId}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFeedbackMessage("Meeting scheduled successfully");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Token expired, try to refresh
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const refreshResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_URI}api/auths/refresh-token/`,
            {
              data: {
                attributes: {
                  "refresh-token": refreshToken,
                },
              },
            }
          );

          const newAccessToken = refreshResponse.data.data.access;
          localStorage.setItem("accessToken", newAccessToken);
          // Retry the original request with the new access token
          const retryResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_URI}api/investor/${investorId}/schedule-meeting/${startupId}/`,
            data,
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          console.log(retryResponse);
          setFeedbackMessage("Meeting scheduled successfully");
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          alert("Please ensure you are logged in as a verified investor. Please try again later.");
        }
      } else {
        console.error("Error:", error);
        setFeedbackMessage("An error occurred while scheduling the meeting");
      }
    }
  };

  const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: any) => {
    const timeString = value?.toString() || ""; // Adjust based on actual structure
    console.log("Time Value:", timeString);
    setter(timeString);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {feedbackMessage && (
        <div className="p-4 bg-white text-green rounded-md shadow-md mb-4 transition duration-300 ease-in-out transform hover:scale-105">
          {feedbackMessage}
        </div>
      )}
  
      <div className="w-full sm:w-[380px] lg:w-[440px] bg-white rounded-[8px] border-[1px] border-border p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-purple mb-4">Schedule a Meeting</h2>
          
          <DatePicker
            data-testid="date-meeting"
            label="Select Date"
            className="w-full"
            isRequired
            onChange={(value: any) => {
              const formattedDate = dayjs(value).format("YYYY-MM-DD");
              console.log("Selected Date:", formattedDate);
              setDate(formattedDate);
            }}
          />
  
          <TimeInput
            data-testid="start-time-meeting"
            label="Start Time"
            description="Please enter your meeting start time"
            onChange={handleTimeChange(setStartTime)}
            className="w-full"
          />
  
          <TimeInput
            data-testid="end-time-meeting"
            label="End Time"
            description="Please enter your meeting end time"
            onChange={handleTimeChange(setEndTime)}
            className="w-full"
          />
  
          <Textarea
            data-testid="title-meeting"
            label="Title"
            placeholder="Enter your title"
            className="w-full"
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <Textarea
            data-testid="description-meeting"
            label="Description"
            placeholder="Enter your description"
            className="w-full"
            onChange={(e) => setDescription(e.target.value)}
          />
  
          <Button 
            data-testid="confirm-button" 
            onClick={handleSend} 
            className="w-full h-[44px] bg-purple text-white rounded-[8px] font-semibold transition duration-300 ease-in-out transform hover:scale-105"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;