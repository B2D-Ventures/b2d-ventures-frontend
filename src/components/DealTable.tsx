import React from 'react';
import {Checkbox} from "@nextui-org/checkbox";

type Deal = {
  id: string;
  startup: string;
  date: string;
  status: 'WAITING' | 'APPROVE' | 'DECLINE';
};

const deals: Deal[] = [
  { id: '10000011', startup: 'Angrybid', date: '19/08/2024', status: 'WAITING' },
  { id: '10000012', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
  { id: '10000013', startup: 'Oily', date: '20/08/2024', status: 'DECLINE' },
  { id: '10000014', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
  { id: '10000015', startup: 'LEXI', date: '20/08/2024', status: 'APPROVE' },
];

const getStatusColor = (status: Deal['status']): string => {
  switch (status) {
    case 'WAITING':
      return 'text-orange-500';
    case 'APPROVE':
      return 'text-green-500';
    case 'DECLINE':
      return 'text-red-500';
    default:
      return '';
  }
};

const DealTable: React.FC = () => {
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
            <tr key={deal.id}>
                <td className="py-2 px-4 border-b">{deal.id}</td>
                <td className="py-2 px-4 border-b">{deal.startup}</td>
                <td className="py-2 px-4 border-b">{deal.date}</td>
                <td className={`py-2 px-4 border-b ${getStatusColor(deal.status)}`}>{deal.status}</td>
                <td className="py-2 px-4 border-b">
                <Checkbox defaultSelected color="warning"></Checkbox>
                <Checkbox isIndeterminate color="warning"></Checkbox>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
};

export default DealTable;