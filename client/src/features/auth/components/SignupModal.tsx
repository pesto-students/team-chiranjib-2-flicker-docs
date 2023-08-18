// import { Icons } from '@/components/icons';
// import { Button } from '@/registry/new-york/ui/button';

// import { Input } from '@/registry/new-york/ui/input';
// import { Label } from '@/registry/new-york/ui/label';

import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components';

interface SignupModal {
  signInWithEmail: (email: string, password: string) => void;
}
export function SignupModal({ signInWithEmail }: SignupModal) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card className='w-96'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>Sign In</CardTitle>
        <CardDescription>Enter your email or continue with google</CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='flex justify-center gap-6'>
          <div id='signUpDiv' data-text='signup_with'></div>
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
          </div>
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='m@example.com'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={() => signInWithEmail(email, password)}>
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
