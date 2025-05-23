
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserPlus, Terminal } from "lucide-react"; // Removed ShieldCheck

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Removed isAdminSignup state
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Call signup without isAdminSignup, it will default to false
    const success = signup(username, password); 
    if (success) {
      router.push('/profile'); // Regular users go to profile
    } else {
      setError('Username already taken or signup failed. Please try a different username.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary flex items-center justify-center">
            <UserPlus className="h-8 w-8 mr-2"/> Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Join CODE XI to save your progress and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
               <Alert variant="destructive">
                 <Terminal className="h-4 w-4" />
                 <AlertTitle>Signup Failed</AlertTitle>
                 <AlertDescription>
                   {error}
                 </AlertDescription>
               </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min. 6 characters)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            {/* Removed Admin Signup Switch */}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/login">Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
