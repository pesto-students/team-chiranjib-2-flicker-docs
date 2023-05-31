import { sign } from 'jsonwebtoken';
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

@Service()
export class AuthService {
  public async signIn(credential: any): Promise<User> {
    if (credential) {
      const verificationResponse = await verifyGoogleToken(credential);

      if (verificationResponse.error) {
        throw new HttpException(409, verificationResponse.error);
      }

      const profile = verificationResponse?.payload;

      const user = {
        name: profile?.name,
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
      };

      const findUser: User = await UserModel.findOne({ email: user.email });

      if (!findUser) {
        await UserModel.create({
          ...user,
        });
      }

      return {
        ...user,
        token: sign({ email: profile?.email }, 'myScret', {
          expiresIn: '1d',
        }),
      };
    }
  }
}
