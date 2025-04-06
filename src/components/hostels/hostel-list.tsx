"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Star, Wifi, Utensils, Dumbbell, Droplets, Users } from "lucide-react";
import { sampleHostels, Hostel } from "@/data/sample-hostels";

interface HostelListProps {
  filters: {
    priceRange: [number, number];
    facilities: string[];
    location: string;
    rating: number;
  };
  selectedHostels: string[];
  onHostelSelect: (hostelId: string) => void;
}

export function HostelList({ filters, selectedHostels, onHostelSelect }: HostelListProps) {
  const filteredHostels = sampleHostels.filter(hostel => {
    const matchesPrice = hostel.price >= filters.priceRange[0] && hostel.price <= filters.priceRange[1];
    const matchesLocation = !filters.location || hostel.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesRating = hostel.rating >= filters.rating;
    const matchesFacilities = filters.facilities.length === 0 || 
      filters.facilities.every(facility => hostel.facilities.includes(facility));
    
    return matchesPrice && matchesLocation && matchesRating && matchesFacilities;
  });

  return (
    <div className="grid gap-4">
      {filteredHostels.map((hostel) => (
        <Card key={hostel.id} className={selectedHostels.includes(hostel.id) ? "border-primary" : ""}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {hostel.name}
                </CardTitle>
                <CardDescription>{hostel.location}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{hostel.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {hostel.facilities.map((facility) => (
                <Badge key={facility} variant="secondary">
                  {facility === "wifi" && <Wifi className="h-3 w-3 mr-1" />}
                  {facility === "food" && <Utensils className="h-3 w-3 mr-1" />}
                  {facility === "gym" && <Dumbbell className="h-3 w-3 mr-1" />}
                  {facility === "laundry" && <Droplets className="h-3 w-3 mr-1" />}
                  {facility === "common-room" && <Users className="h-3 w-3 mr-1" />}
                  {facility}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{hostel.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">₹{hostel.price}</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedHostels.includes(hostel.id)}
                onCheckedChange={() => onHostelSelect(hostel.id)}
                aria-label="Compare hostel"
              />
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 