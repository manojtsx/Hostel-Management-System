"use client";

import { useState } from "react";
import { HostelList } from "./hostel-list";
import { HostelFilters } from "./hostel-filters";
import { HostelComparison } from "./hostel-comparison";
import { sampleHostels } from "@/data/sample-hostels";
import { Button } from "@/components/ui/button";
import { Building2, Search, Scale } from "lucide-react";

export function HostelPage() {
  const [selectedHostels, setSelectedHostels] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000] as [number, number],
    facilities: [] as string[],
    location: "",
    rating: 0,
  });

  const handleHostelSelect = (hostelId: string) => {
    setSelectedHostels(prev => {
      if (prev.includes(hostelId)) {
        return prev.filter(id => id !== hostelId);
      }
      if (prev.length < 3) {
        return [...prev, hostelId];
      }
      return prev;
    });
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-8 w-8" />
          Find Your Perfect Hostel
        </h1>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Compare
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <HostelFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
        </div>
        <div className="lg:col-span-3">
          <HostelList
            filters={filters}
            selectedHostels={selectedHostels}
            onHostelSelect={handleHostelSelect}
          />
        </div>
      </div>

      {selectedHostels.length > 0 && (
        <div className="mt-8">
          <HostelComparison hostelIds={selectedHostels} />
        </div>
      )}
    </div>
  );
} 