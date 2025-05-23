
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
import { Switch } from "@/components/ui/switch"; // Added Switch import
import { LogIn, Terminal, ShieldCheck } from "lucide-react"; // Added ShieldCheck

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemptAdminLogin, setAttemptAdminLogin] = useState(false); // State for admin login toggle
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    // Pass attemptAdminLogin to the login function
    const success = login(username, password, attemptAdminLogin); 
    if (success) {
      // AuthContext's login will set isAdmin, redirect accordingly
      if (attemptAdminLogin) { // Check if attempted admin login was successful by checking the toggle
        const { isAdmin } = useAuth(); // Re-fetch to ensure latest state if needed, though login should set it
         if(isAdmin){ // This is a bit redundant if login correctly sets context, but explicit check
            router.push('/admin/dashboard');
         } else {
            // This case means they toggled admin login, but credentials were not for an admin
            // or were incorrect. The login function itself would return false for invalid admin creds.
            // If login returned true but they are not admin, it means they logged in as a regular user
            // who might exist with same creds but isn't admin (edge case, depends on auth logic).
            // For simplicity, if login is success & toggle was on, assume admin success handled by login.
            // If login failed, error state is set below.
            // If login success but not admin (despite toggle), redirect to profile.
             router.push('/profile');
         }
      } else {
        router.push('/profile');
      }
    } else {
      if (attemptAdminLogin) {
        setError('Invalid admin credentials or user is not an administrator.');
      } else {
        setError('Invalid username or password. Please try again or sign up.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary flex items-center justify-center">
            <LogIn className="h-8 w-8 mr-2"/> User Login
          </CardTitle>
          <CardDescription className="text-center">
            Access your CODE XI profile and saved progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
             {error && (
               <Alert variant="destructive">
                 <Terminal className="h-4 w-4" />
                 <AlertTitle>Login Failed</AlertTitle>
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
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="admin-login"
                checked={attemptAdminLogin}
                onCheckedChange={setAttemptAdminLogin}
                aria-label="Login as admin"
              />
              <Label htmlFor="admin-login" className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                Login as Administrator
              </Label>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/signup">Sign up</Link>
            </Button>
          </p>
           <p className="text-xs text-center text-muted-foreground">Default admin: kishan / kishan2314 (toggle admin login)</p>
           <p className="text-xs text-center text-muted-foreground">Mock user: testuser / password</p>
        </CardFooter>
      </Card>
    </div>
  );
}
