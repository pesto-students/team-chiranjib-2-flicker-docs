import { CreditCard, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { logout } from '@/lib';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function AvatarWithDropdown() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.picture} alt='@shadcn' />
          <AvatarFallback>
            {user?.firstName.charAt(0)}
            {user?.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate('/settings/profile')}>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/settings/my-plan')}>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Yourplan</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/plans')}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Subscription</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
