
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, MapPin, Tag, MessageCircle, CalendarDays, CheckCircle, UserPlus, Compass, BookOpen, Drumstick, Film, HomeIcon as ProfileHomeIcon, Search } from 'lucide-react';

interface VibeTag {
  label: string;
  icon: React.ElementType;
  color?: string; // Optional: for tag-specific colors
}

interface MockUser {
  id: string;
  name: string;
  isNewToCity: boolean;
  tags: VibeTag[];
  avatarText: string; // For AvatarFallback
  status?: string; // e.g., "Looking for Biryani spots!"
}

interface MockEvent {
  id: string;
  name: string;
  location: string;
  time: string;
  attendees: number;
  imageUrl: string;
  description: string;
  dataAiHint?: string;
}

const predefinedVibeTags: Record<string, VibeTag> = {
  books: { label: "Into books", icon: BookOpen, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  biryani: { label: "Biryani lover", icon: Drumstick, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  explore: { label: "Down to explore", icon: Compass, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  movies: { label: "Movie night?", icon: Film, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  shifted: { label: "Just shifted", icon: ProfileHomeIcon, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  foodie: { label: "Foodie", icon: Drumstick, color: "bg-red-500/20 text-red-400 border-red-500/30" },
  tech: { label: "Tech Enthusiast", icon: Search, color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
};


const mockUsers: MockUser[] = [
  { id: '1', name: 'Alex P.', isNewToCity: true, tags: [predefinedVibeTags.explore, predefinedVibeTags.movies], avatarText: 'AP', status: "Exploring cafes this weekend!" },
  { id: '2', name: 'Priya K.', isNewToCity: false, tags: [predefinedVibeTags.biryani, predefinedVibeTags.books], avatarText: 'PK', status: "Anyone read 'Project Hail Mary'?" },
  { id: '3', name: 'Chris B.', isNewToCity: true, tags: [predefinedVibeTags.shifted, predefinedVibeTags.tech], avatarText: 'CB', status: "New to Anna Nagar, looking for tech meetups." },
  { id: '4', name: 'Samira Z.', isNewToCity: true, tags: [predefinedVibeTags.foodie, predefinedVibeTags.explore], avatarText: 'SZ', status: "On a quest for the best street food!" },
];

const mockEvents: MockEvent[] = [
  { id: 'e1', name: 'Weekend Market Tour', location: 'Mylapore Market', time: 'Sat, 10:00 AM', attendees: 12, imageUrl: 'https://i.pinimg.com/736x/5d/30/6d/5d306d64741bb91243083f9d1873378d.jpg', description: 'Explore local crafts and foods.', dataAiHint: 'market stall' },
  { id: 'e2', name: 'Beach Cleanup Drive', location: 'Marina Beach', time: 'Sun, 8:00 AM', attendees: 25, imageUrl: 'https://www.shutterstock.com/editorial/image-editorial/M4T3Q2x6M6z2c853MTQxNzM=/volunteers-pick-trash-during-beach-cleanup-drive-550nw-14010333f.jpg', description: 'Help keep our beaches clean!', dataAiHint: 'beach cleanup' },
  { id: 'e3', name: 'Open Mic Night', location: 'The Hangout Cafe', time: 'Fri, 7:00 PM', attendees: 8, imageUrl: 'https://i.pinimg.com/736x/61/9b/3d/619b3db156ec89b17211812c4891345e.jpg', description: 'Share your talent or enjoy the show.', dataAiHint: 'open mic performance' },
];


export function ConnectClient() {
  const [isLookingToConnect, setIsLookingToConnect] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleConnectRequest = (userName: string) => {
    toast({
      title: "Connection Sent!",
      description: `Your request to connect with ${userName} has been sent (simulated).`,
    });
  };

  const handleJoinEvent = (eventName: string) => {
    toast({
      title: "Event Joined!",
      description: `You've expressed interest in joining ${eventName} (simulated).`,
    });
  };

  if (!isClient) {
    return (
      <div className="space-y-8">
        <Card className="shadow-lg rounded-xl animate-pulse">
          <CardHeader><div className="h-8 bg-muted rounded w-1/2"></div></CardHeader>
          <CardContent><div className="h-40 bg-muted rounded"></div></CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-card-foreground/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold text-primary">Local Friend Finder</CardTitle>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-card rounded-lg border border-border shadow-sm">
              <Switch
                id="lookingToConnect"
                checked={isLookingToConnect}
                onCheckedChange={setIsLookingToConnect}
                aria-label="Toggle looking to connect mode"
              />
              <Label htmlFor="lookingToConnect" className="text-sm font-medium text-foreground">
                {isLookingToConnect ? "Looking to Connect" : "Incognito Mode"}
              </Label>
            </div>
          </div>
          <CardDescription className="mt-2 text-muted-foreground">
            Find, connect, and vibe with people in your area. Discover new friends and explore the city together!
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Map Area Placeholder */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" /> People Near You
            </h2>
            <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden border border-border shadow-inner flex items-center justify-center">
              <Image
                src="https://miro.medium.com/v2/resize:fit:1400/1*KpXU-4IowsC30I647FMWWg.png"
                alt="Map showing people nearby"
                width={800}
                height={450}
                className="object-cover w-full h-full"
                data-ai-hint="social map interface" 
                unoptimized={true}
              />
              {/* Future: Add actual map component here */}
            </div>
             {isLookingToConnect && (
                <p className="text-sm text-accent mt-2 text-center">
                  You are currently visible on the map to others looking to connect.
                </p>
            )}
          </section>

          {/* Discover People Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Compass className="h-6 w-6 text-accent" /> Discover Locals & Newcomers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUsers.map((user) => (
                <Card key={user.id} className="flex flex-col hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src={`https://placehold.co/100x100.png?text=${user.avatarText}`} alt={user.name} data-ai-hint="profile avatar" />
                        <AvatarFallback>{user.avatarText}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl text-foreground">{user.name}</CardTitle>
                        {user.isNewToCity && (
                          <Badge variant="outline" className="mt-1 border-accent/50 bg-accent/10 text-accent">
                            <CheckCircle className="mr-1 h-3 w-3" /> New to City
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3">
                    {user.status && <p className="text-sm text-muted-foreground italic">"{user.status}"</p>}
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-1">
                        <Tag className="h-4 w-4 text-accent" /> Vibe Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {user.tags.map((tag) => (
                          <Badge key={tag.label} variant="outline" className={`text-xs ${tag.color || 'border-muted-foreground/30 bg-muted/50 text-muted-foreground'}`}>
                            <tag.icon className="mr-1 h-3 w-3" /> {tag.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleConnectRequest(user.name)}>
                      <UserPlus className="mr-2 h-4 w-4" /> Request to Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Local Events & Meetups Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-accent" /> Local Events & Meetups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <Card key={event.id} className="flex flex-col hover:shadow-xl transition-shadow duration-200 rounded-lg overflow-hidden border-border">
                  <div className="aspect-video w-full overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.name}
                      width={600}
                      height={338}
                      className="object-cover w-full h-full"
                      data-ai-hint={event.dataAiHint}
                      unoptimized={true}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">{event.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      <MapPin className="inline mr-1 h-4 w-4" /> {event.location} - {event.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-foreground/90 mb-3">{event.description}</p>
                    <Badge variant="secondary">{event.attendees} people interested</Badge>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" className="w-full" onClick={() => handleJoinEvent(event.name)}>
                      <MessageCircle className="mr-2 h-4 w-4" /> Chat / Details
                    </Button>
                     <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleJoinEvent(event.name)}>
                      Join Event
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}

