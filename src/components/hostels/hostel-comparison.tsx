"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Star, Wifi, Utensils, Dumbbell, Droplets, Users } from "lucide-react";
import { sampleHostels, Hostel } from "@/data/sample-hostels";

interface HostelComparisonProps {
  hostelIds: string[];
}

type ComparisonField = {
  id: keyof Hostel;
  label: string;
  format?: (value: any) => string;
};

export function HostelComparison({ hostelIds }: HostelComparisonProps) {
  const selectedHostels = sampleHostels.filter(hostel => hostelIds.includes(hostel.id));

  const comparisonFields: ComparisonField[] = [
    { id: "price", label: "Price", format: (value: number) => `₹${value}/month` },
    { id: "rating", label: "Rating", format: (value: number) => `${value}/5` },
    { id: "location", label: "Location" },
    { id: "facilities", label: "Facilities" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hostel Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              {selectedHostels.map((hostel) => (
                <TableHead key={hostel.id} className="text-center">
                  {hostel.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonFields.map((field) => (
              <TableRow key={field.id}>
                <TableCell className="font-medium">{field.label}</TableCell>
                {selectedHostels.map((hostel) => (
                  <TableCell key={hostel.id} className="text-center">
                    {field.id === "facilities" ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {hostel.facilities.map((facility) => (
                          <span key={facility} className="text-xs">
                            {facility === "wifi" && <Wifi className="h-3 w-3 inline mr-1" />}
                            {facility === "food" && <Utensils className="h-3 w-3 inline mr-1" />}
                            {facility === "gym" && <Dumbbell className="h-3 w-3 inline mr-1" />}
                            {facility === "laundry" && <Droplets className="h-3 w-3 inline mr-1" />}
                            {facility === "common-room" && <Users className="h-3 w-3 inline mr-1" />}
                            {facility}
                          </span>
                        ))}
                      </div>
                    ) : field.id === "rating" ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        {field.format ? field.format(hostel[field.id]) : hostel[field.id]}
                      </div>
                    ) : (
                      field.format ? field.format(hostel[field.id]) : hostel[field.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 