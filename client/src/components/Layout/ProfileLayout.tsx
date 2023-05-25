import clsx from 'clsx';
import { Folder, Home } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return <div className='fixed flex h-16 w-full items-center justify-end pr-6 shadow'>Header</div>;
};

type SideNavigationItem = {
  name: string;
  to: string;
  icon: any;
};

const SideNavigation = () => {
  //   const { checkAccess } = useAuthorization();
  const navigation = [
    { name: 'Profile', to: './profile', icon: Home },
    { name: 'My-plan', to: './my-plan', icon: Folder },
    // checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
    //   name: 'Users',
    //   to: './users',
    //   icon: UsersIcon,
    // },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-900 hover:bg-gray-700 hover:text-white',
            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
          )}
          //   activeClassName="bg-gray-900 text-white"
        >
          <item.icon
            className={clsx(
              'text-gray-900 group-hover:text-gray-900',
              'mr-4 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden='true'
          />
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
          <div className='flex h-16 flex-shrink-0 items-center bg-slate-200 px-4'></div>
          <div className='flex flex-1 flex-col overflow-y-auto'>
            <nav className='flex-1 space-y-1 bg-slate-200 px-2 py-4'>
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
    <div className='flex h-[500px] w-[900px] overflow-hidden rounded-lg bg-gray-100'>
      <Sidebar />
      <div className='flex w-0 flex-1 flex-col overflow-hidden'>
        {/* <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <div className="flex-1 px-4 flex justify-end">
          <div className="ml-4 flex items-center md:ml-6">
            <UserNavigation />
          </div>
        </div>
      </div> */}
        <main className='relative flex-1 overflow-y-auto focus:outline-none'>{children}</main>
      </div>
    </div>
  );
};

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <>
      <Header />
      <div className='flex h-screen items-center justify-center pt-16'>
        <SettingsCard>{children}</SettingsCard>
      </div>
    </>
  );
};
