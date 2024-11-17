import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";

interface DealAttributes {
  id: string;
  name: string;
  start_date: string;
  status: string;
}

interface Deal {
  attributes: DealAttributes;
}

// Define a type for the possible statuses
type DealStatus = "pending" | "approved" | "rejected";

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "text-orange-500";
    case "approved":
      return "text-green";
    case "rejected":
      return "text-red";
    default:
      return "";
  }
}

function formatWord(role: string): string {
  switch (role.toLocaleLowerCase()) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Unknown";
  }
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DealTable() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [actionStates, setActionStates] = useState<{ [key: string]: string }>(
    {}
  );

  const fetchDeals = async () => {
    try {
      const response = await axios.get<{ data: Deal[] }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/deals`
      );
      const fetchedDeals = response.data.data;

      // Sort deals: pending first, then approved, then rejected
      const statusOrder: Record<DealStatus, number> = {
        pending: 1,
        approved: 2,
        rejected: 3,
      };
      const sortedDeals = fetchedDeals.sort((a, b) => {
        const statusA = a.attributes.status.toLowerCase() as DealStatus;
        const statusB = b.attributes.status.toLowerCase() as DealStatus;
        return statusOrder[statusA] - statusOrder[statusB];
      });

      setDeals(sortedDeals);
      console.log("Deals fetched and sorted:", sortedDeals);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleApproveDeal = async (dealId: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/admin/${dealId}/deals/`,
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
      setActionStates({ ...actionStates, [dealId]: "approved" });
      alert("Deal approved successfully");
      await fetchDeals();
    } catch (error) {
      console.error("Error approving deal:", error);
      alert("Error approving deal");
    }
  };

  const handleRejectDeal = async (dealId: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/admin/${dealId}/deals/`,
        {
          data: {
            attributes: {
              action: "reject",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      setActionStates({ ...actionStates, [dealId]: "rejected" });
      alert("Deal rejected successfully");
      await fetchDeals();
    } catch (error) {
      console.error("Error rejecting deal:", error);
      alert("Error rejecting deal");
    }
  };

  const renderActionButtons = (deal: Deal) => {
    const status = deal.attributes.status.toLowerCase();
    const actionState = actionStates[deal.attributes.id];

    if (status === "approved") {
      return (
        <div className="flex gap-2">
          <Button isDisabled color="default">
            Accept
          </Button>
          <Button
            color="danger"
            onClick={() => handleRejectDeal(deal.attributes.id)}
          >
            Reject
          </Button>
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className="flex gap-2">
          <Button
            color="primary"
            onClick={() => handleApproveDeal(deal.attributes.id)}
          >
            Accept
          </Button>
          <Button isDisabled color="default">
            Reject
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <Button
          data-testid="approve-deal-button"
          color="primary"
          onClick={() => handleApproveDeal(deal.attributes.id)}
        >
          Accept
        </Button>
        <Button
          data-testid="reject-deal-button"
          color="danger"
          onClick={() => handleRejectDeal(deal.attributes.id)}
        >
          Reject
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-sm">
      <div className="block sm:hidden">
        {deals.map((deal) => (
          <div
            key={deal.attributes.id}
            className="bg-white p-4 mb-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold">{deal.attributes.name}</p>
                <p className="text-sm text-gray-600">
                  ID: {deal.attributes.id.slice(0, 8)}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                  deal.attributes.status
                )} bg-opacity-10`}
              >
                {formatWord(deal.attributes.status)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-3">
              {formatDate(deal.attributes.start_date)}
            </div>
            <div className="flex justify-end gap-2">
              {renderActionButtons(deal)}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal id.
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Startup
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deals.map((deal) => (
              <tr
                key={deal.attributes.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 whitespace-nowrap text-sm">
                  {deal.attributes.id.slice(0, 8)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {deal.attributes.name}
                </td>
                <td className="py-4 px-4 whitespace-nowrap text-sm">
                  {formatDate(deal.attributes.start_date)}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                      deal.attributes.status
                    )} bg-opacity-10`}
                  >
                    {formatWord(deal.attributes.status)}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap" data-testid="approve-section">
                  {renderActionButtons(deal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
