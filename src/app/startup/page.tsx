// pages/dashboard.tsx
"use client";

import React, { useEffect, useState } from "react";
import DealCard from "@/components/card";
import CategoryFilter from "@/components/filter";
import SortFilter from "@/components/sort";
import SearchBar from "@/components/searchBar";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Chip } from "@nextui-org/react";

interface Deal {
  attributes: {
    id: string;
    name: string;
    description: string;
    target_amount: string;
    amount_raised: string;
    investor_count: number;
    image_logo_url: string;
    image_content_url: string;
    type: string;
    status: string;
    end_date: string;
    start_date: string;
    category: string;
    location: string;
  };
}

// Filter functions
const filterFunctions = {
  status: (deals: Deal[]) => 
    deals.filter((deal) => deal.attributes.status === "approved"),

  category: (deals: Deal[], type: string) =>
    type ? deals.filter((deal) => deal.attributes.type === type) : deals,

  search: (deals: Deal[], query: string) =>
    query
      ? deals.filter((deal) =>
          deal.attributes.name.toLowerCase().includes(query.toLowerCase())
        )
      : deals,

  sort: {
    "trending": (deals: Deal[]) => {
      return deals
        .sort((a, b) => b.attributes.investor_count - a.attributes.investor_count);
    },

    "closing-soon": (deals: Deal[]) => {
      return deals
        .sort((a, b) => 
          new Date(a.attributes.end_date).getTime() - 
          new Date(b.attributes.end_date).getTime()
        );
    },

    "newest": (deals: Deal[]) => {
      return deals
        .sort((a, b) => 
          new Date(b.attributes.start_date).getTime() - 
          new Date(a.attributes.start_date).getTime()
        );
    },
  },
};

const DealDashboard: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRole(localStorage.getItem("userRole"));
    fetchDeals();
  }, []);

  useEffect(() => {
    filterAndSortDeals();
  }, [selectedCategory, sortOption, searchQuery, deals]);

  const handleCreateDeal = () => {
    router.push("/startup-form");
  };

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<{ data: Deal[] }>(
        `${process.env.NEXT_PUBLIC_URI}api/admin/deals`
      );
      setDeals(response.data.data);
      setFilteredDeals(response.data.data);
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealClick = (dealId: string) => {
    router.push(`/detail-deal/${dealId}`);
  };

  const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    updateActiveFilters(selectedValue, "category");
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortOption(selectedValue);
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      updateActiveFilters(query, "search");
    } else {
      removeFilter("search");
    }
  };

  const updateActiveFilters = (value: string, type: string) => {
    if (value) {
      setActiveFilters((prev) => {
        const filtered = prev.filter((filter) => !filter.startsWith(type));
        return [...filtered, `${type}:${value}`];
      });
    } else {
      removeFilter(type);
    }
  };

  const removeFilter = (filterType: string) => {
    setActiveFilters((prev) =>
      prev.filter((filter) => !filter.startsWith(filterType))
    );
    switch (filterType) {
      case "category":
        setSelectedCategory("");
        break;
      case "search":
        setSearchQuery("");
        break;
    }
  };

  const filterAndSortDeals = () => {
    let filtered = [...deals];

    // Apply status filter
    filtered = filterFunctions.status(filtered);

    // Apply category filter
    filtered = filterFunctions.category(filtered, selectedCategory);

    // Apply search filter
    filtered = filterFunctions.search(filtered, searchQuery);

    // Apply sort filter
    if (sortOption && filterFunctions.sort[sortOption as keyof typeof filterFunctions.sort]) {
      filtered = filterFunctions.sort[sortOption as keyof typeof filterFunctions.sort](filtered);
    }

    setFilteredDeals(filtered);
  };
  return (
    <div className="min-h-screen bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Header Section */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Investment Opportunities
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Browse current investment opportunities on B2D.
      </p>
    </div>

    {/* Filters Section with Create Deal Button */}
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex flex-1 flex-col sm:flex-row gap-4">
          <CategoryFilter value={selectedCategory} onChange={onCategoryChange} />
          <SortFilter value={sortOption} onChange={onSortChange} />
          <SearchBar onSearch={onSearch} />
        </div>
        {role === "startup" && (
          <div className="flex justify-start sm:justify-end">
            <button
              className="flex items-center justify-center rounded-[8px] w-[144px] h-[32px] bg-purple text-white hover:cursor-pointer"
              onClick={handleCreateDeal}
            >
              Create Deal
            </button>
          </div>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(":");
            return (
              <Chip
                key={filter}
                onClose={() => removeFilter(type)}
                variant="flat"
                className="bg-purple-100"
              >
                {`${type}: ${value}`}
              </Chip>
            );
          })}
        </div>
      )}
    </div>

    {/* Deals Grid */}
    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
            <div
              data-testid="deal-card"
              key={deal.attributes.id}
              onClick={() => handleDealClick(deal.attributes.id)}
              className="transform transition-transform hover:scale-105"
            >
              <DealCard
                name={deal.attributes.name}
                description={deal.attributes.description}
                fundingGoal={parseFloat(deal.attributes.target_amount)}
                raisedAmount={parseFloat(deal.attributes.amount_raised)}
                investorNumber={deal.attributes.investor_count}
                icon={deal.attributes.image_logo_url}
                bgImage={deal.attributes.image_content_url}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No investment opportunities match your criteria.
          </div>
        )}
      </div>
    )}
  </div>
</div>

  );
}

export default DealDashboard;