
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
import { Switch } from "@/components/ui/switch"; 
import { LogIn, Terminal, ShieldCheck } from "lucide-react"; 

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemptAdminLogin, setAttemptAdminLogin] = useState(false); 
  const [error, setError] = useState('');
  const { login, isAdmin: contextIsAdmin } = useAuth(); // get isAdmin from context
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password, attemptAdminLogin); 
    if (success) {
      // After successful login, the AuthContext's isAdmin state will be updated.
      // We need to use a brief delay or a mechanism to ensure the context has updated
      // before checking contextIsAdmin for routing.
      // A more robust way would be for `login` to return the user object or admin status.
      // For now, this relies on the state update propagating quickly.
      setTimeout(() => { // Use timeout to allow context to update
        if (attemptAdminLogin && contextIsAdmin) { 
          router.push('/admin/dashboard');
        } else {
          router.push('/profile');
        }
      }, 0);
    } else {
      if (attemptAdminLogin) {
        setError('Invalid admin credentials or user is not an administrator.');
      } else {
        setError('Invalid username or password. Please try again or sign up.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-primary flex items-center justify-center">
            <LogIn className="h-7 w-7 sm:h-8 sm:w-8 mr-2"/> User Login
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
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="admin-login"
                checked={attemptAdminLogin}
                onCheckedChange={setAttemptAdminLogin}
                aria-label="Login as admin"
              />
              <Label htmlFor="admin-login" className="flex items-center text-sm">
                <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                Login as Administrator
              </Label>
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 pt-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button variant="link" asChild className="text-primary p-0 h-auto">
              <Link href="/signup">Sign up</Link>
            </Button>
          </p>
           <p className="text-xs text-center text-muted-foreground">Mock user: testuser / password</p>
        </CardFooter>
      </Card>
    </div>
  );
}
