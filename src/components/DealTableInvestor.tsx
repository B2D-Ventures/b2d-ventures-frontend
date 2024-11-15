"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
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
  switch (status.toLowerCase()) {
    case "pending_investor":
      return "text-orange-500";
    case "investor":
      return "text-green";
    case "startup":
      return "text-green";
    case "rejected":
      return "text-red";
    default:
      return "text-orange-500";
  }
}

function formatRole(role: string): string {
  switch (role.toLocaleLowerCase()) {
    case "investor":
      return "Investor";
    case "startup":
      return "Startup";
    case "pending_startup":
      return "Startup (pending)";
    case "pending_investor":
      return "Investor (pending)";
    default:
      return "Unassigned";
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
  const router = useRouter();
  const [users, setUsers] = useState<Deal[]>([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get<{ data: Deal[] }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/users`
      );
      setUsers(response.data.data);
      console.log("Users fetched:", response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleApproveInvestor = async (id: string, role: string) => {
    if (["startup"].includes(role)) {
      role = "startup";
    } else {
      role = "investor";
    }
    if (!id) {
      console.error("User id not found in URL");
      return;
    }
    try {
      console.log("user id:", id);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_URI}api/auths/${id}/update-role/`,
        {
          data: {
            attributes: {
              role: role,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
          },
        }
      );
      console.log("Role changed successfully:", response.data);
      localStorage.setItem("userId", response.data.attributes.id);
      alert("Investor was approves succesfully.");
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Error approved investor, please try again later.");
    }
  };

  const handleRejectInvestor = async (id: string) => {
    if (!id) {
      console.error("User token not found in URL");
      return;
    }
    try {
      console.log("user token:", id);
      const response = await axios.put(
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
      console.log("Role changed successfully:", response.data);
      localStorage.setItem("userId", response.data.id);
      alert("Investor was rejected succesfully.");
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Error rejected investor, please try again later.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Investor id.</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Date Joined</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.attributes.id}>
              <td className="py-2 px-4 border-b">
                {user.attributes.id.slice(0, 8)}
              </td>
              <td className="py-2 px-4 border-b">{user.attributes.username}</td>
              <td className="py-2 px-4 border-b">
                {formatDate(user.attributes.date_joined)}
              </td>
              <td
                className={`py-2 px-4 border-b ${getStatusColor(
                  user.attributes.role
                )}`}
              >
                {formatRole(user.attributes.role)}
              </td>
              <td className="py-2 px-4 border-b">
                <Checkbox
                  onClick={
                    user.attributes.role.toLowerCase() !== "startup" ||
                    user.attributes.role.toLowerCase() !== "investor"
                      ? () => handleApproveInvestor(user.attributes.id, user.attributes.role)
                      : undefined
                  }
                  data-testid="approve-checkbox"
                  defaultSelected={
                    user.attributes.role.toLowerCase() !== "startup" ||
                    user.attributes.role.toLowerCase() !== "investor"
                  }
                  color="warning"
                  isDisabled={
                    user.attributes.role.toLowerCase() === "startup" ||
                    user.attributes.role.toLowerCase() === "investor"
                  }
                />
                <Checkbox
                  isIndeterminate
                  color="warning"
                  onClick={
                    user.attributes.role.toLowerCase() !== "pending_startup" ||
                    user.attributes.role.toLowerCase() !== "pending_investor"
                      ? () => handleRejectInvestor(user.attributes.id)
                      : undefined
                  }
                  data-testid="reject-checkbox"
                  defaultSelected={
                    user.attributes.role.toLowerCase() !== "pending_startup" ||
                    user.attributes.role.toLowerCase() !== "pending_investor"
                  }
                  isDisabled={
                    user.attributes.role.toLowerCase() === "pending_startup" ||
                    user.attributes.role.toLowerCase() === "pending_investor"
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
