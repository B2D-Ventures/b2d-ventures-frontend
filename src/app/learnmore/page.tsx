"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [activeRole, setActiveRole] = React.useState<'investor' | 'startup'>('investor');

  const features: { [key in 'investor' | 'startup']: { title: string; description: string; icon: string; }[] } = {
    investor: [
      {
        title: 'Schedule Meeting',
        description: 'Book appointments with promising startups and discuss investment opportunities.',
        icon: 'fa-calendar-check'
      },
      {
        title: 'Invest',
        description: 'Access our secure platform to make direct investments in vetted startups.',
        icon: 'fa-money-bill-trend-up'
      },
      {
        title: 'Request Data Room',
        description: 'Get detailed information and documents about startups in our portfolio.',
        icon: 'fa-folder-open'
      },
      {
        title: 'View Dashboard',
        description: 'Track your investments and monitor portfolio performance in real-time.',
        icon: 'fa-chart-line'
      }
    ],
    startup: [
      {
        title: 'Create Deal',
        description: 'List your startup and create investment opportunities for potential investors.',
        icon: 'fa-handshake'
      },
      {
        title: 'View Dashboard',
        description: 'Monitor your fundraising progress and investor interactions.',
        icon: 'fa-chart-simple'
      }
    ]
  };

  const handleOnclick = () => {
    router.push("/startup");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to B2D Ventures
          </h1>
          <p className="text-xl text-gray-600">
            Your Gateway to Smart Investments and Startup Growth
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setActiveRole('investor')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeRole === 'investor'
                ? 'bg-purple text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Investor
          </button>
          <button
            onClick={() => setActiveRole('startup')}
            className={`px-6 py-3 rounded-lg font-medium ${
              activeRole === 'startup'
                ? 'bg-purple text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Startup
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features[activeRole].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-purple/10 rounded-full p-3 mr-4">
                  <i className={`fas ${feature.icon} text-purple text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <button 
            onClick={handleOnclick}
            className="bg-purple text-white px-8 py-3 rounded-lg font-medium hover:bg-purple/90 transition-colors duration-300"
          >
            Join B2D Ventures Now
          </button>
        </div>
      </div>
    </div>
  );
}