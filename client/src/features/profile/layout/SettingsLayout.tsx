import clsx from 'clsx';
import { Folder, Home } from 'lucide-react';
import { Suspense } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Spinner } from '@/components';

import { Header } from '../../../components/Header';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: any;
};

const SideNavigation = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Profile', to: './profile', icon: Home },
    { name: 'My-plan', to: './my-plan', icon: Folder },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-900 hover:bg-slate-200',
            'group flex items-center rounded-md px-2 py-2 text-base font-medium',
            location.pathname === `/settings/${item.name.toLowerCase()}` ? 'bg-slate-300' : ''
          )}
        >
          <item.icon className={'text-gray-90 mr-4 h-6 w-6 flex-shrink-0'} aria-hidden='true' />
          {item.name}
        </NavLink>
      ))}
    </>
  );
};

const Sidebar = () => {
  return (
    <div className='hidden border-r md:flex md:flex-shrink-0'>
      <div className='flex w-64 flex-col'>
        <div className='flex h-0 flex-1 flex-col'>
          <div className='flex h-16 flex-shrink-0 items-center bg-slate-100 px-4'></div>
          <div className='scrollbar flex flex-1 flex-col overflow-y-auto'>
            <nav className='flex-1 space-y-1 bg-slate-100 px-2 py-4'>
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

type SettingsLayoutProps = {
  children: React.ReactNode;
};

const SettingsCard = ({ children }: SettingsLayoutProps) => {
  return (
    <div className='flex h-[500px] w-[900px] overflow-hidden rounded-lg bg-slate-50'>
      <Sidebar />
      <div className='flex w-0 flex-1 flex-col overflow-hidden'>
        <main className='scrollbar relative flex-1 overflow-y-auto focus:outline-none'>
          {children}
        </main>
      </div>
    </div>
  );
};

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <div className='flex h-full flex-1 items-center justify-center'>
        <SettingsCard>{children}</SettingsCard>
      </div>
    </div>
  );
};

export const Settings = () => {
  return (
    <SettingsLayout>
      <Suspense
        fallback={
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner size='md' />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </SettingsLayout>
  );
};
