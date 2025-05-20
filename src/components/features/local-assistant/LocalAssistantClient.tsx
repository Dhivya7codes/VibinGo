
"use client";

import type { LocalAssistantInput, LocalAssistantOutput } from '@/ai/flows/local-assistant';
import { getLocalAssistantResponse } from '@/ai/flows/local-assistant';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Bot, Mic, MessageSquare } from "lucide-react";
import { useState, type FormEvent, useEffect } from "react";
import Image from 'next/image';

export function LocalAssistantClient() {
  const [userQuery, setUserQuery] = useState("");
  const [response, setResponse] = useState<LocalAssistantOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userQuery.trim()) {
      toast({
        title: "Input Required",
        description: "Please ask a question or tell me what you need.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      const input: LocalAssistantInput = { userQuery };
      const result = await getLocalAssistantResponse(input);
      setResponse(result);
    } catch (error) {
      console.error("Error getting response from assistant:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInputClick = () => {
    toast({
      title: "Voice Input Coming Soon!",
      description: "This feature is under development. For now, please type your query.",
    });
  };

  const handleSpeakWithCitySathiClick = () => {
    toast({
      title: "CitySathi Chat Coming Soon!",
      description: "A personal chat feature with CitySathi is planned for the future.",
    });
  };

  return (
    <>
      {isClient && (
        <Image
          src="https://i.pinimg.com/736x/c4/22/bb/c422bb18deb20b94d08c4c12839c2ae5.jpg"
          alt="Abstract gradient background for AI Local Assistant"
          fill
          className="fixed top-0 left-0 w-full h-full -z-10 object-cover pointer-events-none"
          data-ai-hint="abstract gradient"
          unoptimized={true}
        />
      )}
      <div className="relative z-0 space-y-8">
        <Card className="shadow-lg rounded-xl bg-card/80 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">AI Local Assistant</CardTitle>
            </div>
            <CardDescription>
              Ask me anything about the city! From local info to recommendations. You can also tell me your mood or craving, and I'll recommend the exact spot for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userQuery" className="text-base">Your Question, Mood, or Craving</Label>
                <Textarea
                  id="userQuery"
                  placeholder="e.g., 'craving spicy biryani', 'feeling adventurous for dessert', 'need a quiet cafe to read'"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="min-h-[100px] text-base bg-background/70 border-border/70"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button type="submit" disabled={isLoading} className="text-base py-3 px-6">
                  {isLoading ? "Getting Response..." : "Ask Assistant"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceInputClick}
                  disabled={isLoading}
                  aria-label="Use voice input"
                  className="p-3"
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSpeakWithCitySathiClick}
                  disabled={isLoading}
                  className="text-base py-3 px-4"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Speak with CitySathi
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="shadow-md rounded-xl animate-pulse bg-card/80 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Thinking...</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        )}

        {response && !isLoading && (
          <Card className="shadow-lg rounded-xl bg-accent/30 backdrop-blur-sm border-accent">
            <CardHeader>
              <CardTitle className="text-xl text-accent-foreground">Here's what I found:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Response:</h3>
                <p className="text-base">{response.recommendation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Context/Reason:</h3>
                <p className="text-base">{response.reason}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}

