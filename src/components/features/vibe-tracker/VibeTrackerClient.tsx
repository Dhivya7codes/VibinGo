
"use client";

import type { LiveVibeInput, LiveVibeOutput } from '@/ai/flows/vibe-checker';
import { getLiveVibe } from '@/ai/flows/vibe-checker';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, MessageSquare, TrendingUp, Users, Clock, Smile, Music, Star, Send, Info, HomeIcon as CityNameIcon } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";

interface StarRatingInputProps {
  rating: number;
  setRating: (rating: number) => void;
  icon: React.ElementType;
  label: string;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ rating, setRating, icon: Icon, label }) => {
  return (
    <div className="flex flex-col items-center space-y-1 p-2 bg-background/50 rounded-md border border-border/30">
      <div className="flex items-center text-sm text-muted-foreground">
        <Icon className="mr-2 h-5 w-5" />
        <span>{label}</span>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button type="button" key={star} onClick={() => setRating(star)} aria-label={`Rate ${star} stars for ${label}`}>
            <Star
              className={`h-6 w-6 cursor-pointer transition-colors ${
                star <= rating ? "text-primary fill-primary" : "text-muted-foreground hover:text-primary/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

interface DisplayStarRatingProps {
  rating?: number;
  icon: React.ElementType;
  label: string;
}

const DisplayStarRating: React.FC<DisplayStarRatingProps> = ({ rating, icon: Icon, label }) => {
  const displayRating = rating ?? 0; // Default to 0 if undefined
  return (
    <div className="flex flex-col items-center space-y-1 p-2 bg-background/50 rounded-md border border-border/30">
      <div className="flex items-center text-sm text-muted-foreground">
        <Icon className="mr-1.5 h-5 w-5" />
        <span>{label}</span>
      </div>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= Math.round(displayRating) ? "text-primary fill-primary" : "text-muted-foreground/50"
            }`}
          />
        ))}
      </div>
       {typeof rating === 'number' && <p className="text-xs text-foreground">{rating.toFixed(1)}/5</p>}
       {typeof rating !== 'number' && <p className="text-xs text-muted-foreground">N/A</p>}
    </div>
  );
};


export function VibeTrackerClient() {
  const [placeName, setPlaceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [vibeData, setVibeData] = useState<LiveVibeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  const [userVibeComment, setUserVibeComment] = useState("");
  const [moodRating, setMoodRating] = useState(0);
  const [musicRating, setMusicRating] = useState(0);
  const [crowdRating, setCrowdRating] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!placeName.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a place name or area.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVibeData(null);
    setMoodRating(0);
    setMusicRating(0);
    setCrowdRating(0);

    try {
      const input: LiveVibeInput = { placeName, cityName: cityName || undefined };
      const result = await getLiveVibe(input);
      setVibeData(result);
    } catch (error) {
      console.error("Error getting vibe data:", error);
      toast({
        title: "Error",
        description: "Failed to get vibe data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePostComment = () => {
    if(!userVibeComment.trim()){
      toast({title: "Empty Comment", description: "Please write something to share your vibe.", variant: "destructive"});
      return;
    }
    toast({title: "Comment Posted (Simulated)", description: `Your vibe: "${userVibeComment}" has been shared! Ratings: Mood ${moodRating}, Music ${musicRating}, Crowd ${crowdRating}`});
    setUserVibeComment(""); 
    setMoodRating(0);
    setMusicRating(0);
    setCrowdRating(0);
  };

  const getOccupancyDetails = (crowdLevel?: string): { text: string; percentage: number } => {
    if (!crowdLevel || crowdLevel === "Not applicable") return { text: "Occupancy: N/A", percentage: 0 };
    if (crowdLevel.toLowerCase().includes("not busy")) return { text: `Occupancy: ${crowdLevel}`, percentage: 25 };
    if (crowdLevel.toLowerCase().includes("moderately busy")) return { text: `Occupancy: ${crowdLevel}`, percentage: 55 };
    if (crowdLevel.toLowerCase().includes("very busy")) return { text: `Occupancy: ${crowdLevel}`, percentage: 85 };
    return { text: `Occupancy: ${crowdLevel}`, percentage: 50 }; 
  };

  if (!isClient) {
    return (
      <div className="relative z-0 space-y-8 p-4">
        <Card className="shadow-md rounded-xl bg-card/80 backdrop-blur-sm border-border">
          <CardHeader><CardTitle>Loading Vibe Tracker...</CardTitle></CardHeader>
          <CardContent><p>Please wait...</p></CardContent>
        </Card>
      </div>
    );
  }
  
  const occupancy = getOccupancyDetails(vibeData?.crowdLevel);

  return (
    <>
      {isClient && (
        <iframe
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
          src="https://www.youtube.com/embed/tr4Uk7WaBKo?autoplay=1&mute=1&loop=1&playlist=tr4Uk7WaBKo&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0"
          title="YouTube video player for Vibe Tracker Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
        ></iframe>
      )}
      <div className="relative z-0 space-y-8">
        <Card className="shadow-lg rounded-xl bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">Vibe Tracker</CardTitle>
            </div>
            <CardDescription>
              See what’s trending in your area (cafes, bars, food trucks). Get live crowd updates, wait times,
              and a real-time “Vibe Feed” from people on the ground.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <Card className="shadow-md rounded-xl bg-card/90 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-xl">Check Place Vibe</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="placeName" className="text-base flex items-center gap-1"><MapPin className="h-4 w-4 text-muted-foreground"/>Place or Area Name</Label>
                        <Input
                          id="placeName"
                          placeholder="e.g., 'The Coffee House'"
                          value={placeName}
                          onChange={(e) => setPlaceName(e.target.value)}
                          disabled={isLoading}
                          className="text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cityName" className="text-base flex items-center gap-1"><CityNameIcon className="h-4 w-4 text-muted-foreground" />City Name</Label>
                        <Input
                          id="cityName"
                          placeholder="e.g., 'New York'"
                          value={cityName}
                          onChange={(e) => setCityName(e.target.value)}
                          disabled={isLoading}
                          className="text-base"
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto text-base py-3 px-6">
                      {isLoading ? "Checking Vibe..." : "Check Vibe"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
          </CardContent>
        </Card>
        
        {isLoading && (
          <Card className="shadow-md rounded-xl animate-pulse bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Loading Vibe Insights...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </CardContent>
          </Card>
        )}

        {vibeData && !isLoading && (
          <Card className="shadow-lg rounded-xl bg-card/90 backdrop-blur-md border-border p-6">
            <CardHeader className="p-0 pb-4 border-b border-border/50 mb-4">
              <CardTitle className="text-3xl text-primary">{placeName || "Selected Place"}</CardTitle>
              {cityName && <CardDescription className="text-base text-muted-foreground">in {cityName}</CardDescription>}
              {!cityName && <CardDescription className="text-base text-muted-foreground">Local Lens Vibe Report</CardDescription>}
            </CardHeader>
            
            <CardContent className="p-0 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-medium text-foreground">{occupancy.text}</p>
                  {occupancy.percentage > 0 && <p className="text-sm font-semibold text-primary">{occupancy.percentage}% Full</p>}
                </div>
                {occupancy.percentage > 0 && <Progress value={occupancy.percentage} aria-label={`${occupancy.percentage}% full`} className="h-3" />}
                {vibeData.estimatedWaitTime && vibeData.estimatedWaitTime !== "Not applicable" && (
                  <p className="text-sm text-muted-foreground mt-1 flex items-center"><Clock className="h-4 w-4 mr-1.5 text-accent"/>Est. Wait Time: {vibeData.estimatedWaitTime}</p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2"><Info className="h-5 w-5 text-accent"/>Community Vibe Snapshot</h3>
                 <p className="text-xs text-muted-foreground -mt-2">AI-simulated general ratings for this place.</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
                  <DisplayStarRating rating={vibeData.simulatedMoodRating} icon={Smile} label="Overall Mood" />
                  <DisplayStarRating rating={vibeData.simulatedMusicRating} icon={Music} label="Music Scene" />
                  <DisplayStarRating rating={vibeData.simulatedCrowdRating} icon={Users} label="Crowd Energy" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Your Vibe Rating:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center sm:justify-items-stretch">
                  <StarRatingInput rating={moodRating} setRating={setMoodRating} icon={Smile} label="Your Mood" />
                  <StarRatingInput rating={musicRating} setRating={setMusicRating} icon={Music} label="Your Music" />
                  <StarRatingInput rating={crowdRating} setRating={setCrowdRating} icon={Users} label="Your Crowd" />
                </div>
              </div>

              {vibeData.trendingPlaces && vibeData.trendingPlaces.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2"><TrendingUp className="h-5 w-5 text-accent"/>Trending Nearby Spots:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vibeData.trendingPlaces.map((place, index) => (
                      <div key={index} className="p-3 bg-background/50 rounded-md shadow-sm border border-border/50">
                        <p className="font-medium text-foreground">{place.name}</p>
                        <p className="text-sm text-muted-foreground">{place.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3"><MessageSquare className="h-5 w-5 text-accent"/>Live Comments</h3>
                {vibeData.comments && vibeData.comments.length > 0 ? (
                  <ul className="space-y-3 max-h-60 overflow-y-auto p-3 rounded-md border border-border/30 bg-background/30">
                    {vibeData.comments.map((comment, index) => (
                      <li key={index} className="p-3 bg-background/70 backdrop-blur-sm rounded-md shadow border border-border/50">
                        <p className="text-sm text-foreground">{comment}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-muted-foreground">No live comments found for this place.</p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <Label htmlFor="userVibeComment" className="text-lg font-semibold text-foreground">Share your vibe...</Label>
                <Textarea
                  id="userVibeComment"
                  placeholder="e.g., 'Great music and cocktails!'"
                  value={userVibeComment}
                  onChange={(e) => setUserVibeComment(e.target.value)}
                  className="min-h-[80px] text-base bg-background/70 border-border/70"
                />
                <Button type="button" onClick={handlePostComment} className="w-full sm:w-auto text-base" disabled={isLoading}>
                  <Send className="mr-2 h-4 w-4" /> Post Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
