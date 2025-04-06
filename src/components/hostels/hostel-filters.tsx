"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Star } from "lucide-react";

interface HostelFiltersProps {
  filters: {
    priceRange: [number, number];
    facilities: string[];
    location: string;
    rating: number;
  };
  onFiltersChange: (filters: any) => void;
}

const facilities = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "food", label: "Food" },
  { id: "gym", label: "Gym" },
  { id: "laundry", label: "Laundry" },
  { id: "common-room", label: "Common Room" },
];

export function HostelFilters({ filters, onFiltersChange }: HostelFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Price Range</Label>
          <Slider
            min={0}
            max={10000}
            step={500}
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="Search location"
            value={filters.location}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={[filters.rating]}
              onValueChange={(value) => onFiltersChange({ ...filters, rating: value[0] })}
            />
            <span className="text-sm font-medium">{filters.rating}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Facilities</Label>
          <div className="space-y-2">
            {facilities.map((facility) => (
              <div key={facility.id} className="flex items-center space-x-2">
                <Checkbox
                  id={facility.id}
                  checked={filters.facilities.includes(facility.id)}
                  onCheckedChange={(checked) => {
                    const newFacilities = checked
                      ? [...filters.facilities, facility.id]
                      : filters.facilities.filter((f) => f !== facility.id);
                    onFiltersChange({ ...filters, facilities: newFacilities });
                  }}
                />
                <Label htmlFor={facility.id}>{facility.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 