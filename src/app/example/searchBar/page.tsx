"use client";

import React from "react";
import SearchBar from "@/components/searchBar";
import Filter from "@/components/filter";

export default function SearchBarPage({}) {
  return (
    <div className="flex w-full justify-center items-center p-4">
      <SearchBar />
      <Filter />
    </div>  
  );
}
