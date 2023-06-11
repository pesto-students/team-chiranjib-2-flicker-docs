import { Avatar, AvatarFallback, AvatarImage, Input, Label } from '@/components';
import { useAuth } from '@/hooks';

type InputWithLabelProps = {
  label: string;
  type: string;
  value?: string;
  disabled?: boolean;
};

export function InputWithLabel({ label, type, value, disabled }: InputWithLabelProps) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor={type}>{label}</Label>
      <Input type={type} id={type} placeholder={label} value={value} disabled={disabled} />
    </div>
  );
}

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col items-center gap-8 border-red-500 pt-14'>
      <Avatar className='h-24 w-24'>
        <AvatarImage src={user?.picture} alt='@shadcn' />
        <AvatarFallback>
          {user?.firstName.charAt(0)}
          {user?.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <InputWithLabel label='Email' type='email' value={user?.email} disabled />
      <InputWithLabel label='Username' type='username' value={user?.name} />
    </div>
  );
};
