import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import { User } from '@/interfaces/user.interface';
import { axiosClient } from '@/lib';

type SingleUserProps = {
  user: User;
  isOnline: boolean;
};

const SingleUser = ({ user, isOnline }: SingleUserProps) => (
  <div key={user._id} className='my-1 flex items-center gap-3'>
    <div className={`rounded-full  ${isOnline ? 'border-2 border-green-400' : ''} p-0.5`}>
      <Avatar className={`h-7 w-7 cursor-pointer`}>
        <AvatarImage src={user?.picture} alt='@shadcn' />
        <AvatarFallback>
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </div>
    <div className='text-sm capitalize'>{`${user.firstName?.toLowerCase()}  ${
      user.lastName?.toLowerCase() || ''
    }`}</div>
  </div>
);

type PeersProps = {
  activeUsers: User[];
};

const Peers = ({ activeUsers }: PeersProps) => {
  const { id: docName } = useParams();

  const filterActiveUsers = (data: any) => {
    const activeUsersIds: any = activeUsers.map(({ _id }) => _id);
    const allUsers: any = [...data.owners, ...data.sharedUsers];

    return allUsers.filter((user: any) => !activeUsersIds.includes(user._id));
  };

  const {
    error,
    data: offlineUsers,
    refetch,
  } = useQuery({
    queryKey: ['sharedUsers'],
    queryFn: () => {
      return axiosClient.get(`/document/${docName}/shared-users`);
    },
    select: (res) => filterActiveUsers(res.data),
    enabled: !!docName,
  });

  if (error)
    return (
      <>
        <div>could not fetch active users</div>
        <button className='text-blue-500' onClick={() => refetch()}>
          Try again
        </button>
      </>
    );

  return (
    <>
      {activeUsers.map((user: any) => (
        <SingleUser key={user._id} user={user} isOnline={true} />
      ))}
      {offlineUsers?.map((user: any) => (
        <SingleUser key={user._id} user={user} isOnline={false} />
      ))}
    </>
  );
};

type ChatProps = {
  activeUsers: User[];
};

const Chat = ({ activeUsers }: ChatProps) => {
  return (
    <Tabs defaultValue='peers'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='peers'>Peers</TabsTrigger>
        <TabsTrigger value='groupchat'>Chat</TabsTrigger>
      </TabsList>
      <TabsContent value='peers'>
        <Peers activeUsers={activeUsers} />
      </TabsContent>
      <TabsContent value='groupchat'>
        <div>Comming soon..</div>
      </TabsContent>
    </Tabs>
  );
};

export default Chat;
