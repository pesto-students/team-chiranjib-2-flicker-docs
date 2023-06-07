import { Avatar, AvatarFallback, AvatarImage } from '@/components';
import { User } from '@/interfaces/user.interface';

type Props = {
  activeUsers: User[];
};

const Peers = ({ activeUsers }: Props) => {
  return (
    <>
      {activeUsers.map((user) => (
        <div key={user._id} className='flex items-center gap-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.picture} alt='@shadcn' />
            <AvatarFallback>
              {user?.name.charAt(0)}
              {user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='capitalize'>{`${user.name.toLowerCase()}  ${user.lastName.toLowerCase()}`}</div>
        </div>
      ))}
    </>
  );
};

export default Peers;
