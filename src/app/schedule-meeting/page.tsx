"use client"; // Ensure this is a client component
import React, { useState, useEffect } from "react";
import { TimeInput } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const Home: React.FC = () => {
  const [startupId, setStartupId] = useState<string | null>(null);
  const [investorId, setInvestorId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(""); // State for title
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve investorId from localStorage
    const storedInvestorId = localStorage.getItem("userId");
    if (storedInvestorId) {
      setInvestorId(storedInvestorId);
    } else {
      console.error("Investor ID not found in localStorage");
    }

    // Retrieve startupId from URL
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

    const apiUrl = `http://127.0.0.1:8000/api/investor/${investorId}/schedule-meeting/${startupId}/`;

    const data = {
      data: {
        attributes: {
          start_time: `${date}T${startTime}:00+00:00`,
          end_time: `${date}T${endTime}:00+00:00`,
          title: title,
          description: description,
        },
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFeedbackMessage("Meeting scheduled successfully");
      } else {
        setFeedbackMessage("Failed to schedule meeting");
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedbackMessage("An error occurred while scheduling the meeting");
    }
  };

  const handleTimeChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (value: any) => {
    if (value && typeof value.format === 'function') {
      setter(value.format("HH:mm"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Feedback Message */}
      {feedbackMessage && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded-md">
          {feedbackMessage}
        </div>
      )}

      {/* Meeting Scheduling Form */}
      <div className="p-6 bg-white rounded-xl shadow-md">
        <DatePicker
          label="Day"
          className="max-w-[284px]"
          isRequired
          onChange={(value) => setDate(value)}
        />
        <div className="flex flex-wrap gap-4 mt-2">
          <TimeInput
            label="Start Time"
            description="Please enter your meeting time"
            onChange={handleTimeChange(setStartTime)}
          />

          <TimeInput
            label="End Time"
            description="Please enter your meeting time"
            onChange={handleTimeChange(setEndTime)}
          />

          <Textarea
            label="Title"
            placeholder="Enter your title"
            className="max-w-xs"
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            label="Description"
            placeholder="Enter your description"
            className="max-w-xs"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button color="primary" onClick={handleSend} className="mt-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Home;