
"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState, type FormEvent } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from 'lucide-react';

export default function DashboardPage() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    // Delay the signup popup slightly to allow video to load/start
    const timer = setTimeout(() => setIsSignupOpen(true), 100); // 100ms delay
    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: "Error", description: "Email and password cannot be empty.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match!", variant: "destructive" });
      return;
    }
    // Simulate sign-up
    console.log("Attempting to sign up with:", { email, password });
    const username = email.split('@')[0];
    toast({ title: "Welcome!", description: `Hey ${username}, welcome to vinbingo! (This is a simulation)` });
    setIsSignupOpen(false);
    // Reset fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      {/* Background Video Wrapper */}
      {isClient && (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-[100vh] min-h-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/RDLgS3vZlsE?autoplay=1&mute=1&loop=1&playlist=RDLgS3vZlsE&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&rel=0&vq=hd1080"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
          ></iframe>
        </div>
      )}

      {/* Centered Content */}
      <div className="relative z-0 flex flex-col items-center text-center min-h-[calc(100vh-4rem)] justify-center">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center items-center gap-3 mb-6">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-primary drop-shadow-lg">
                Welcome to VibinGo
              </h1>
            </div>
            <p className="mx-auto max-w-[700px] text-primary md:text-2xl mt-4 drop-shadow-sm font-bold">
              Your ultimate local companion. Explore, navigate, and connect with your city like never before.
            </p>
          </div>
        </section>
      </div>

      {/* Sign-up Dialog */}
      {isClient && (
        <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
          <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-md border-border shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary text-center">Create Your Account</DialogTitle>
              <DialogDescription className="text-center">
                Join VibinGo to unlock a new way to experience your city.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSignUp} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input 
                    id="confirm-password" 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">Sign Up</Button>
              </DialogFooter>
            </form>
            <div className="mt-2 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
                onClick={() => {
                  setIsSignupOpen(false);
                  // Here you would typically navigate to a sign-in page or open a sign-in dialog
                  toast({ title: "Sign In", description: "Sign-in dialog/page would appear here." });
                }}
              >
                Sign In
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
