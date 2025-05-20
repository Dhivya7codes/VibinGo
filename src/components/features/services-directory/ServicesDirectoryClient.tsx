
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Banknote, ShoppingBasket, BriefcaseMedical, Bus, Briefcase, Wifi, Landmark, MapPin, Phone, LocateFixed, Navigation } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface ServiceItem {
  name: string;
  address?: string;
  notes?: string;
  phone?: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  items: ServiceItem[];
  description: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "atms",
    name: "ATMs & Banks",
    icon: Banknote,
    description: "Find nearby ATMs and bank branches for your financial needs.",
    items: [
      { name: "City Bank ATM", address: "123 Main St, Downtown", notes: "Open 24/7" },
      { name: "National Bank Branch", address: "456 Oak Ave, Uptown", notes: "Mon-Fri 9am-5pm", phone: "555-0101" },
      { name: "Secure ATM", address: "789 Pine Ln, Suburbia", notes: "Located inside mall" },
    ],
  },
  {
    id: "grocery",
    name: "Grocery Stores",
    icon: ShoppingBasket,
    description: "Stock up on essentials from local grocery stores and supermarkets.",
    items: [
      { name: "FreshMart", address: "234 Elm Rd, Downtown", notes: "Organic produce available", phone: "555-0202" },
      { name: "QuickStop Groceries", address: "567 Maple Dr, Suburbia", notes: "Open late" },
      { name: "The Corner Store", address: "890 Birch Ct, Uptown", notes: "Local specialties" },
    ],
  },
  {
    id: "pharmacies",
    name: "Pharmacies",
    icon: BriefcaseMedical,
    description: "Locate pharmacies for prescriptions and healthcare products.",
    items: [
      { name: "HealthFirst Pharmacy", address: "345 Cedar Ave, Suburbia", notes: "24/7 Emergency Service", phone: "555-0303" },
      { name: "Wellness Drugstore", address: "678 Willow St, Downtown", notes: "Flu shots available" },
    ],
  },
  {
    id: "transport",
    name: "Public Transport",
    icon: Bus,
    description: "Information on bus stops, metro stations, and transport hubs.",
    items: [
      { name: "Central Bus Terminal", address: "Plaza Central, Downtown", notes: "Hub for all city lines" },
      { name: "Uptown Metro Station", address: "901 Transit Way, Uptown", notes: "Connects to airport line" },
    ],
  },
   {
    id: "others",
    name: "Other Essentials",
    icon: Briefcase,
    description: "Find other essential services like repair shops, post offices, etc.",
    items: [
      { name: "City Post Office", address: "111 Mail St, Downtown", notes: "Passport services available", phone: "555-0404" },
      { name: "FixIt Hardware", address: "222 Tool Ave, Suburbia", notes: "Key cutting available" },
      { name: "Public Library", address: "333 Bookworm Rd, Uptown", notes: "Free Wi-Fi, Public Computers", phone: "555-0505"},
    ],
  },
];


export function ServicesDirectoryClient() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUseCurrentLocation = () => {
    if (!isClient) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Fetched!",
            description: `Services would now be prioritized based on your location (Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}) - (simulated).`,
          });
          // Here you would typically re-fetch or re-filter services
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please ensure location services are enabled. Showing default list.",
            variant: "destructive",
          });
          console.error("Error getting location", error);
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser. Showing default list.",
        variant: "destructive",
      });
    }
  };

  const handleSaathiGuide = (serviceName: string) => {
    toast({
      title: "SaathiGuide Activated",
      description: `Map and AI assistance for ${serviceName} would appear here (simulated).`,
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
           <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Essential Services Directory</CardTitle>
          </div>
          <CardDescription>Find ATMs, grocery stores, pharmacies, transport schedules, and more. Use your location to find services near you. I've got you buddy!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleUseCurrentLocation} className="mb-6 w-full sm:w-auto" variant="outline">
            <LocateFixed className="mr-2 h-5 w-5" /> Use My Current Location
          </Button>
          <Accordion type="single" collapsible className="w-full">
            {serviceCategories.map((category) => (
              <AccordionItem value={category.id} key={category.id} className="border-b-2 border-border last:border-b-0 mb-2 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline data-[state=open]:bg-accent/10 data-[state=open]:text-primary rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-accent" />
                    <span>{category.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 space-y-4 bg-card text-card-foreground rounded-b-lg">
                  <p className="text-sm mb-4">{category.description}</p>
                  {category.items.length > 0 ? (
                    <ul className="space-y-3">
                      {category.items.map((item, index) => (
                        <li key={index} className="p-4 border rounded-md bg-background/80 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-md text-foreground">{item.name}</h4>
                              {item.address && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-4 w-4 "/>{item.address}</p>}
                              {item.phone && <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Phone className="h-4 w-4 "/>{item.phone}</p>}
                              {item.notes && <p className="text-xs text-primary mt-2">{item.notes}</p>}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSaathiGuide(item.name)}
                              className="ml-4 shrink-0"
                            >
                              <Navigation className="mr-1.5 h-4 w-4" />
                              SaathiGuide
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm ">No services listed in this category yet.</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

    
