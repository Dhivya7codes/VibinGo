
"use client";

import type { PgRoomMatcherInput, PgRoomMatcherOutput } from '@/ai/flows/pg-room-matcher';
import { findPgRoomMatches } from '@/ai/flows/pg-room-matcher';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { HomeIcon, IndianRupee, Search, Building, UserCog, CheckCircle } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";

interface FormData {
  budget: string;
  location: string;
  facilities: string;
  roommatePreference: string;
}

export function PgFinderClient() {
  const [formData, setFormData] = useState<FormData>({
    budget: "",
    location: "",
    facilities: "",
    roommatePreference: "",
  });
  const [matches, setMatches] = useState<PgRoomMatcherOutput['matches'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.budget || !formData.location) {
      toast({
        title: "Input Required",
        description: "Please fill in at least budget and location.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setMatches(null);

    try {
      const input: PgRoomMatcherInput = {
        budget: parseFloat(formData.budget),
        location: formData.location,
        facilities: formData.facilities,
        roommatePreference: formData.roommatePreference,
      };
      const result = await findPgRoomMatches(input);
      setMatches(result.matches);
      if (result.matches.length === 0) {
        toast({
          title: "No Matches Found",
          description: "Try adjusting your criteria for better results.",
        });
      }
    } catch (error) {
      console.error("Error finding PG/room matches:", error);
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isClient && (
        <iframe
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
          src="https://www.youtube.com/embed/NoWyNgAQe34?autoplay=1&mute=1&loop=1&playlist=NoWyNgAQe34&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0"
          title="YouTube video player for PG Finder Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
        ></iframe>
      )}
      <div className="relative z-0 space-y-8">
        <Card className="shadow-lg rounded-xl bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HomeIcon className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">PG & Room Finder</CardTitle>
            </div>
            <CardDescription>Describe your ideal PG/room, and let AI find the best options for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-base">Budget (Max Monthly)</Label>
                  <Input id="budget" type="number" placeholder="e.g., 10000" value={formData.budget} onChange={handleChange} disabled={isLoading} className="text-base bg-background/70 border-border/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base">Preferred Location</Label>
                  <Input id="location" placeholder="e.g., Koramangala, Bangalore" value={formData.location} onChange={handleChange} disabled={isLoading} className="text-base bg-background/70 border-border/70" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facilities" className="text-base">Desired Facilities (comma-separated)</Label>
                <Textarea id="facilities" placeholder="e.g., wifi, laundry, AC" value={formData.facilities} onChange={handleChange} disabled={isLoading} className="text-base min-h-[80px] bg-background/70 border-border/70" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roommatePreference" className="text-base">Roommate Preferences</Label>
                <Textarea id="roommatePreference" placeholder="e.g., female, student, non-smoker" value={formData.roommatePreference} onChange={handleChange} disabled={isLoading} className="text-base min-h-[80px] bg-background/70 border-border/70" />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto text-base py-3 px-6">
                <Search className="mr-2 h-5 w-5" />
                {isLoading ? "Searching..." : "Find Matches"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="shadow-md rounded-xl animate-pulse bg-card/80 backdrop-blur-sm border-border">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {matches && !isLoading && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Matching Properties ({matches.length})</h2>
            {matches.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match, index) => (
                  <Card key={index} className="flex flex-col shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="text-xl text-accent">{match.pgName}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" /> {match.address}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-grow">
                      <div className="flex items-center text-lg font-semibold">
                        <IndianRupee className="h-5 w-5 mr-1 text-primary" /> {match.price.toLocaleString()} / month
                      </div>
                      <div>
                        <h4 className="font-medium text-sm flex items-center gap-1"><CheckCircle className="h-4 w-4 text-primary" />Facilities:</h4>
                        <p className="text-sm text-muted-foreground ml-5">{match.facilities || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm flex items-center gap-1"><UserCog className="h-4 w-4 text-accent" />Contact:</h4>
                        <p className="text-sm text-muted-foreground ml-5">{match.contact}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Match Score:</h4>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${match.matchScore * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-right text-muted-foreground">{(match.matchScore * 100).toFixed(0)}%</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-8 rounded-xl bg-card/80 backdrop-blur-sm border-border">
                <CardContent>
                  <p className="text-lg text-muted-foreground">No properties matched your criteria. Try broadening your search.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  );
}
