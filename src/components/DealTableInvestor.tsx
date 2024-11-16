"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DealAttributes {
  id: string;
  username: string;
  date_joined: string;
  role: string;
}

interface Deal {
  attributes: DealAttributes;
}

function getStatusColor(status: string): string {
  const statusColors = {
    pending_investor: "bg-orange-100 text-orange-700",
    investor: "bg-green-100 text-green-700",
    startup: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    pending_startup: "bg-orange-100 text-orange-700",
    unassigned: "bg-gray-100 text-gray-700"
  };
  return statusColors[status.toLowerCase() as keyof typeof statusColors] || "bg-gray-100 text-gray-700";
}

function formatRole(role: string): string {
  const roles = {
    investor: "Investor",
    startup: "Startup",
    pending_startup: "Startup (pending)",
    pending_investor: "Investor (pending)",
    unassigned: "Unassigned"
  };
  return roles[role.toLowerCase() as keyof typeof roles] || "Unassigned";
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function DealTableInvestor() {
  const router = useRouter();
  const [users, setUsers] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ data: Deal[] }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/users`
      );
      setUsers(response.data.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleApproveInvestor = async (id: string, role: string) => {
    try {
      const newRole = role.includes("startup") ? "startup" : "investor";
      
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/auths/${id}/update-role/`,
        {
          data: {
            attributes: {
              role: newRole,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      
      await fetchUser(); // Refresh the list
      alert(`${newRole.charAt(0).toUpperCase() + newRole.slice(1)} was approved successfully.`);
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Error approving user. Please try again later.");
    }
  };

  const handleRejectInvestor = async (id: string) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/auths/${id}/update-role/`,
        {
          data: {
            attributes: {
              role: "unassigned",
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      
      await fetchUser(); // Refresh the list
      alert("User was rejected successfully.");
    } catch (error) {
      console.error("Error rejecting user:", error);
      alert("Error rejecting user. Please try again later.");
    }
  };

  const renderActionButtons = (user: Deal) => {
    const role = user.attributes.role.toLowerCase();
    const isPending = role.includes("pending");
    const isApproved = role === "investor" || role === "startup";

    return (
      <div className="flex gap-2">
        <Button
          color="primary"
          size="sm"
          onClick={() => handleApproveInvestor(user.attributes.id, user.attributes.role)}
          isDisabled={isApproved}
        >
          Accept
        </Button>
        <Button
          color="danger"
          size="sm"
          onClick={() => handleRejectInvestor(user.attributes.id)}
          isDisabled={role === "unassigned"}
        >
          Reject
        </Button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full p-4 text-center">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Mobile view */}
      <div className="block sm:hidden">
        {users.map((user) => (
          <div key={user.attributes.id} 
               className="bg-white p-4 mb-4 border-b">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{user.attributes.username}</h3>
                  <p className="text-sm text-gray-500">
                    ID: {user.attributes.id.slice(0, 8)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.attributes.role)}`}>
                  {formatRole(user.attributes.role)}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Joined: {formatDate(user.attributes.date_joined)}
              </p>
              <div className="mt-2">
                {renderActionButtons(user)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Joined
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.attributes.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.attributes.id.slice(0, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.attributes.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(user.attributes.date_joined)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(user.attributes.role)}`}>
                    {formatRole(user.attributes.role)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderActionButtons(user)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}