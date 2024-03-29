import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

import { HttpException } from '@exceptions/httpException';

import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_OAUTH_CLIENT_ID } from '@/config';

const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);

async function verifyGoogleToken(token: any) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_OAUTH_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: 'Invalid user detected. Please try again' };
  }
}

function isValidEmail(email) {
  // Regular expression pattern for a basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

@Service()
export class AuthService {
  public async signIn(credential: any): Promise<User> {
    if (credential) {
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        throw new HttpException(409, verificationResponse.error);
      }

      const profile = verificationResponse?.payload;

      const userData = {
        name: profile?.name,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
      };

      const findUser: User = await UserModel.findOne({ email: userData.email });

      if (findUser) {
        return {
          ...findUser,
          token: sign({ email: profile?.email }, 'myScret', {
            expiresIn: '3d',
          }),
        };
      }

      const user = new UserModel({
        ...userData,
      });

      const newUser = await user.save();

      return {
        ...newUser,
        token: sign({ email: profile?.email }, 'myScret', {
          expiresIn: '3d',
        }),
      };
    }
  }
  public async signInWithEmail(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new HttpException(409, 'empty email or password');
    }
    if (!isValidEmail(email)) {
      throw new HttpException(409, 'email not valid');
    }

    const userData = {
      name: email.split('@')[0],
      firstName: email.split('@')[0],
      email,
      password,
    };

    const findUser: User = await UserModel.findOne({ email });

    if (findUser) {
      if (findUser.password === password) {
        return {
          ...findUser,
          token: sign({ email }, 'myScret', {
            expiresIn: '3d',
          }),
        };
      } else {
        throw new HttpException(409, 'password incorrect');
      }
    }

    const user = new UserModel({
      ...userData,
    });

    const newUser = await user.save();

    return {
      ...newUser,
      token: sign({ email }, 'myScret', {
        expiresIn: '3d',
      }),
    };
  }

  public async getUser(token: any) {
    const { email } = verify(token, 'myScret') as any;

    const findUser: User = await UserModel.findOne({ email: email });

    if (!findUser) {
      throw new HttpException(409, 'User not found');
    }

    return findUser;
  }
}
