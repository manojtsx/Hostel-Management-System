export interface Hostel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  facilities: string[];
  description: string;
  image: string;
}

export const sampleHostels: Hostel[] = [
  {
    id: "1",
    name: "Green Valley Hostel",
    location: "Downtown",
    price: 5000,
    rating: 4.5,
    facilities: ["wifi", "food", "laundry"],
    description: "A comfortable hostel with modern amenities and a friendly atmosphere.",
    image: "/images/hostels/green-valley.jpg"
  },
  {
    id: "2",
    name: "Mountain View Hostel",
    location: "Uptown",
    price: 6000,
    rating: 4.8,
    facilities: ["wifi", "food", "gym", "laundry"],
    description: "Premium hostel with excellent views and top-notch facilities.",
    image: "/images/hostels/mountain-view.jpg"
  },
  {
    id: "3",
    name: "City Lights Hostel",
    location: "City Center",
    price: 4500,
    rating: 4.2,
    facilities: ["wifi", "laundry", "common-room"],
    description: "Affordable accommodation in the heart of the city.",
    image: "/images/hostels/city-lights.jpg"
  },
  {
    id: "4",
    name: "Ocean Breeze Hostel",
    location: "Beachside",
    price: 5500,
    rating: 4.6,
    facilities: ["wifi", "food", "laundry", "common-room"],
    description: "Relaxing hostel with ocean views and beach access.",
    image: "/images/hostels/ocean-breeze.jpg"
  }
]; 