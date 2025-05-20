
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, ImagePlus, MessageSquare, Heart, Send, Filter, Star } from 'lucide-react';

interface Moment {
  id: string;
  userName: string;
  userAvatar: string;
  userAvatarFallback: string;
  placeName: string;
  imageUrl: string;
  imageAiHint: string;
  caption: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  ratingsCount: number;
}

const mockMomentsData: Moment[] = [
  {
    id: '1',
    userName: 'Explorer_Adi',
    userAvatar: 'https://placehold.co/100x100.png?text=EA',
    userAvatarFallback: 'EA',
    placeName: 'Marina Beach',
    imageUrl: 'https://i.pinimg.com/736x/d1/a8/95/d1a8959e6a4330f0a2769035554cfa96.jpg',
    imageAiHint: 'beach waves',
    caption: 'Beautiful sunset at Marina Beach today! The waves were so calming. #ChennaiVibes',
    timestamp: '2 hours ago',
    likes: 15,
    commentsCount: 3,
    ratingsCount: 4,
  },
  {
    id: '2',
    userName: 'FoodiePriya',
    userAvatar: 'https://placehold.co/100x100.png?text=FP',
    userAvatarFallback: 'FP',
    placeName: 'Murugan Idli Shop',
    imageUrl: 'https://i.pinimg.com/736x/36/91/8c/36918c18f085ca6c71a178c004fe14ce.jpg',
    imageAiHint: 'idli food',
    caption: 'Best idlis in town, hands down! So soft and fluffy. Highly recommend this place if you are in T. Nagar.',
    timestamp: '5 hours ago',
    likes: 22,
    commentsCount: 7,
    ratingsCount: 5,
  },
  {
    id: '3',
    userName: 'Wanderlust_Raj',
    userAvatar: 'https://placehold.co/100x100.png?text=WR',
    userAvatarFallback: 'WR',
    placeName: 'Kapaleeshwarar Temple',
    imageUrl: 'https://i.pinimg.com/736x/0f/2c/e2/0f2ce2947872304ef739c2bb206f0a72.jpg',
    imageAiHint: 'temple gopuram',
    caption: 'Visited the magnificent Kapaleeshwarar Temple. The architecture is breathtaking!',
    timestamp: 'Yesterday',
    likes: 30,
    commentsCount: 5,
    ratingsCount: 5,
  },
  {
    id: '4',
    userName: 'CafeHopper_Sue',
    userAvatar: 'https://placehold.co/100x100.png?text=CS',
    userAvatarFallback: 'CS',
    placeName: 'Amethyst Cafe',
    imageUrl: 'https://i.pinimg.com/736x/43/04/d9/4304d9671b4ef3db8e5b8d61ccb37931.jpg',
    imageAiHint: 'cafe garden',
    caption: 'Chilling at Amethyst Cafe. Love the garden vibes here, perfect for a quiet afternoon. Coffee is great too!',
    timestamp: '3 days ago',
    likes: 18,
    commentsCount: 2,
    ratingsCount: 4,
  },
];

export function CityMomentsClient() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [isCreateMomentOpen, setIsCreateMomentOpen] = useState(false);
  const [newMomentPlace, setNewMomentPlace] = useState("");
  const [newMomentCaption, setNewMomentCaption] = useState("");
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulate fetching moments
    setMoments(mockMomentsData);
  }, []);

  const handlePostMoment = () => {
    if (!newMomentPlace.trim() || !newMomentCaption.trim()) {
      toast({ title: "Incomplete Moment", description: "Please add a place and caption.", variant: "destructive" });
      return;
    }
    toast({ title: "Moment Posted!", description: `Your moment at ${newMomentPlace} has been shared (simulated).` });
    setIsCreateMomentOpen(false);
    setNewMomentPlace("");
    setNewMomentCaption("");
  };

  const handleLike = (momentId: string) => {
    toast({ title: "Liked!", description: `You liked moment ${momentId} (simulated).` });
  };

  const handleComment = (momentId: string) => {
    toast({ title: "Commented!", description: `Your comment on moment ${momentId} has been added (simulated).` });
  };

  const handleRate = (momentId: string) => {
    toast({ title: "Rate Moment", description: `Rating functionality for moment ${momentId} is coming soon!` });
  };
  
  if (!isClient) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader><div className="h-8 bg-muted rounded w-1/2"></div></CardHeader>
          <CardContent><div className="h-40 bg-muted rounded"></div></CardContent>
        </Card>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg"></div>
              <CardHeader><div className="h-6 bg-muted rounded w-3/4"></div></CardHeader>
              <CardContent><div className="h-10 bg-muted rounded"></div></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-xl bg-card/80 backdrop-blur-sm border-border">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-3xl font-bold text-primary flex items-center gap-2">
              <Camera className="h-8 w-8" /> City Moments
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              Share your experiences and discover what's happening around the city.
            </CardDescription>
          </div>
          <Dialog open={isCreateMomentOpen} onOpenChange={setIsCreateMomentOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ImagePlus className="mr-2 h-5 w-5" /> Share Your Moment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] bg-card/95 backdrop-blur-md border-border">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary">Create a New Moment</DialogTitle>
                <DialogDescription>
                  Share where you went, what you did, and how you felt!
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="moment-place">Place Name</Label>
                  <Input 
                    id="moment-place" 
                    placeholder="e.g., Marina Beach, Express Avenue Mall" 
                    value={newMomentPlace}
                    onChange={(e) => setNewMomentPlace(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Photo/Video</Label>
                  <Button variant="outline" className="w-full justify-start text-muted-foreground">
                    <ImagePlus className="mr-2 h-4 w-4" /> Add Photo or Video (Placeholder)
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="moment-caption">Caption</Label>
                  <Textarea 
                    id="moment-caption" 
                    placeholder="Describe your moment..." 
                    value={newMomentCaption}
                    onChange={(e) => setNewMomentCaption(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handlePostMoment} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" />Post Moment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <Card className="shadow-md rounded-xl bg-card/80 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><Filter className="h-5 w-5 text-accent"/>Explore Moments</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 items-start">
          <div>
            <Label htmlFor="filter-location" className="block mb-1">Location/Place</Label>
            <Input id="filter-location" placeholder="Search by location..." />
          </div>
          <div>
            <Label htmlFor="filter-category" className="block mb-1">Category</Label>
            <Select defaultValue="all">
              <SelectTrigger id="filter-category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food & Drinks</SelectItem>
                <SelectItem value="sights">Sights & Landmarks</SelectItem>
                <SelectItem value="nightlife">Nightlife</SelectItem>
                <SelectItem value="chill">Chill Spots</SelectItem>
                <SelectItem value="events">Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter-time" className="block mb-1">Time</Label>
            <Select defaultValue="today">
              <SelectTrigger id="filter-time">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moments.map((moment) => (
          <Card key={moment.id} className="flex flex-col shadow-lg rounded-xl overflow-hidden bg-card/80 backdrop-blur-sm border-border hover:shadow-xl transition-shadow duration-200">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={moment.imageUrl}
                alt={`Moment at ${moment.placeName} by ${moment.userName}`}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint={moment.imageAiHint}
                unoptimized={true} 
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={moment.userAvatar} alt={moment.userName} data-ai-hint="profile avatar" />
                  <AvatarFallback>{moment.userAvatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{moment.userName}</p>
                  <p className="text-xs text-muted-foreground">{moment.timestamp}</p>
                </div>
              </div>
              <CardTitle className="text-lg text-accent flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />{moment.placeName}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-foreground/90 leading-relaxed">{moment.caption}</p>
            </CardContent>
            <CardFooter className="flex items-center pt-4 border-t border-border/50">
              <div className="flex gap-3 sm:gap-4 flex-wrap items-center">
                <Button variant="ghost" size="sm" onClick={() => handleLike(moment.id)} className="text-secondary-foreground hover:text-primary px-2 sm:px-3">
                  <Heart className="mr-1.5 h-4 w-4" /> {moment.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleComment(moment.id)} className="text-secondary-foreground hover:text-primary px-2 sm:px-3">
                  <MessageSquare className="mr-1.5 h-4 w-4" /> {moment.commentsCount}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleRate(moment.id)} className="text-secondary-foreground hover:text-primary px-2 sm:px-3">
                  <Star className="mr-1.5 h-4 w-4" /> {moment.ratingsCount}
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({title: "Connect clicked!", description: "Connect with user feature coming soon."})}>Connect</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
    

    

    
