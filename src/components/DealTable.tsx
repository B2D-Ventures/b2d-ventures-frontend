"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";

// type Deal = {
//   id: string;
//   startup: string;
//   date: string;
//   status: string;
// };

// const deals: Deal[] = [
//   { id: '10000011', startup: 'Angrybid', date: '19/08/2024', status: 'WAITING' },
//   { id: '10000012', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
//   { id: '10000013', startup: 'Oily', date: '20/08/2024', status: 'DECLINE' },
//   { id: '10000014', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
//   { id: '10000015', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
// ];

// const [deals, setDeals] = useState([]);

function getStatusColor(status: String) {
  switch (status) {
    case "pending":
      return "text-orange-500";
    case "approved":
      return "text-green";
    case "Decline":
      return "text-red-500";
    default:
      return "";
  }
}

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString();
}

export default function DealTable() {
  const [deals, setDeals] = useState([]);

  const fetchDeals = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/admin/deals");
      setDeals(response.data.data);
      console.log("Deals fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleApproveDeal = async (dealId: string) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/${dealId}/deals/`,
        {
          data: {
            attributes: {
              action: "approve",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      console.log("Deal approved:", response.data);
      alert("Deal approved successfully");
      await fetchDeals();
    } catch (error) {
      console.error("Error approving deal:", error);
      alert("Error approving deal");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Deal id.</th>
            <th className="py-2 px-4 border-b text-left">Startup</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.attributes.id}>
              <td className="py-2 px-4 border-b">
                {deal.attributes.id.slice(0, 8)}
              </td>
              <td className="py-2 px-4 border-b">{deal.attributes.name}</td>
              <td className="py-2 px-4 border-b">
                {formatDate(deal.attributes.start_date)}
              </td>
              <td
                className={`py-2 px-4 border-b ${getStatusColor(
                  deal.attributes.status
                )}`}
              >
                {deal.attributes.status}
              </td>
              <td className="py-2 px-4 border-b">
                
                  <Checkbox
                    onClick={
                      deal.attributes.status.toLowerCase() !== "approve"
                        ? () => handleApproveDeal(deal.attributes.id)
                        : undefined
                    }
                    defaultSelected={deal.attributes.status.toLowerCase() !== "approved"}
                    color="warning"
                    isDisabled={deal.attributes.status.toLowerCase() === "approved"}
                  />
                
                  <Checkbox isIndeterminate color="warning"></Checkbox>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
