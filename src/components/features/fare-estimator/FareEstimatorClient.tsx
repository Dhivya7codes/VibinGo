
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee, ArrowRight, Navigation, Bike, CarFront, TrainTrack, Plane, LucideIcon } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";
import Image from 'next/image';

type TransportType = "two-wheeler" | "auto-rickshaw" | "taxi-cab" | "train" | "flight";

interface TransportOption {
  value: TransportType;
  label: string;
  icon: LucideIcon;
  startPlaceholder: string;
  endPlaceholder: string;
  baseFare: number;
  perKmRate: number;
  isLongDistance?: boolean;
}

const transportOptions: TransportOption[] = [
  { value: "two-wheeler", label: "Two Wheeler", icon: Bike, startPlaceholder: "e.g., Home", endPlaceholder: "e.g., Office", baseFare: 15, perKmRate: 8 },
  { value: "auto-rickshaw", label: "Auto-rickshaw", icon: CarFront, // Using CarFront as a generic vehicle icon
    startPlaceholder: "e.g., Bus Stand", endPlaceholder: "e.g., Market", baseFare: 25, perKmRate: 12 },
  { value: "taxi-cab", label: "Taxi/Cab", icon: CarFront, startPlaceholder: "e.g., Airport", endPlaceholder: "e.g., Hotel", baseFare: 50, perKmRate: 18 },
  { value: "train", label: "Train", icon: TrainTrack, startPlaceholder: "Departure Station", endPlaceholder: "Arrival Station", baseFare: 100, perKmRate: 2, isLongDistance: true },
  { value: "flight", label: "Flight", icon: Plane, startPlaceholder: "Departure Airport", endPlaceholder: "Arrival Airport", baseFare: 2000, perKmRate: 5, isLongDistance: true },
];

export function FareEstimatorClient() {
  const [selectedTransportType, setSelectedTransportType] = useState<TransportType>("taxi-cab");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentTransportOption = transportOptions.find(opt => opt.value === selectedTransportType) || transportOptions[2];

  const calculateFare = (start: string, end: string, type: TransportType): number => {
    const option = transportOptions.find(opt => opt.value === type);
    if (!option) return 0;

    // Mock distance calculation (very basic)
    // For long distance, we use a larger fixed multiplier or a different logic
    let distance;
    if (option.isLongDistance) {
      // Very rough estimate for long distances based on string length difference
      distance = Math.abs(start.length - end.length) * 50 + 200; // km
      distance += (start.charCodeAt(0) % 10 + end.charCodeAt(0) % 10) * 20; // Add some variability
    } else {
      distance = (start.length + end.length) % 20 + 5; // km
    }
    distance = Math.max(1, distance); // ensure minimum distance

    return option.baseFare + distance * option.perKmRate;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isClient) return;

    if (!startLocation.trim() || !endLocation.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter both start and end locations.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const fare = calculateFare(startLocation, endLocation, selectedTransportType);
      setEstimatedFare(fare);
      setIsLoading(false);
    }, 500);
  };

  const handleTransportTypeChange = (value: string) => {
    setSelectedTransportType(value as TransportType);
    setStartLocation("");
    setEndLocation("");
    setEstimatedFare(null);
  };
  
  const SelectedIcon = currentTransportOption.icon;

  return (
    <>
      {isClient && (
        <iframe
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none object-cover"
          src="https://www.youtube.com/embed/CcpvU_pzR-s?autoplay=1&mute=1&loop=1&playlist=CcpvU_pzR-s&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0"
          title="YouTube video player for Fare Estimator Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
        ></iframe>
      )}
      <div className="relative z-0 space-y-8">
        <Card className="shadow-lg rounded-xl bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <IndianRupee className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Transport Fare Estimator</CardTitle>
            </div>
            <CardDescription>
              Estimate fares for various transport modes.
              For trains and flights, estimates are highly simplified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="transportType" className="text-base">Transport Mode</Label>
                <Select 
                  value={selectedTransportType} 
                  onValueChange={handleTransportTypeChange}
                  disabled={isLoading || !isClient}
                >
                  <SelectTrigger id="transportType" className="w-full text-base bg-background/70 border-border/70">
                    <div className="flex items-center gap-2">
                      <SelectedIcon className="h-5 w-5 text-muted-foreground" />
                      <SelectValue placeholder="Select transport mode" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-popover/90 backdrop-blur-sm">
                    {transportOptions.map(option => {
                      const ItemIcon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value} className="text-base">
                          <div className="flex items-center gap-2">
                            <ItemIcon className="h-5 w-5" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <Label htmlFor="startLocation" className="text-base">
                    {currentTransportOption.isLongDistance ? "Departure Location" : "Start Location"}
                  </Label>
                  <Input
                    id="startLocation"
                    placeholder={currentTransportOption.startPlaceholder}
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    disabled={isLoading || !isClient}
                    className="text-base bg-background/70 border-border/70"
                  />
                </div>
                <div className="hidden md:flex items-center justify-center pb-3">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-2 md:col-start-3">
                  <Label htmlFor="endLocation" className="text-base">
                    {currentTransportOption.isLongDistance ? "Arrival Location" : "End Location"}
                  </Label>
                  <Input
                    id="endLocation"
                    placeholder={currentTransportOption.endPlaceholder}
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                    disabled={isLoading || !isClient}
                    className="text-base bg-background/70 border-border/70"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading || !isClient} className="w-full sm:w-auto text-base py-3 px-6">
                <Navigation className="mr-2 h-5 w-5" />
                {isLoading ? "Estimating..." : "Estimate Fare"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {(isLoading && isClient) && (
           <Card className="shadow-md rounded-xl animate-pulse bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Calculating Fare...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        )}

        {(estimatedFare !== null && !isLoading && isClient) && (
          <Card className="shadow-lg rounded-xl bg-accent/30 backdrop-blur-sm border-accent">
            <CardHeader>
              <CardTitle className="text-xl text-accent-foreground">Estimated Fare ({currentTransportOption.label})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold flex items-center">
                <IndianRupee className="h-8 w-8 mr-2" /> {estimatedFare.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                This is an approximate fare. Actual fare may vary based on traffic, time of day, and specific vehicle/service.
                {currentTransportOption.isLongDistance && " Train and flight estimates are highly simplified and for illustrative purposes only."}
              </p>
            </CardContent>
          </Card>
        )}
         {!isClient && (
          <Card className="shadow-md rounded-xl bg-card/80 backdrop-blur-sm border-border">
            <CardHeader><CardTitle>Loading Estimator...</CardTitle></CardHeader>
            <CardContent><p>Please wait...</p></CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
