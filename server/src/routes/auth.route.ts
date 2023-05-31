import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
// import { AuthMiddleware } from '@middlewares/auth.middleware';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = '244593955079-cauv4gaj7co1cfa2len0ted4micpkjd4.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: 'Invalid user detected. Please try again' };
  }
}

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}signup`, ValidationMiddleware(CreateUserDto, false), this.auth.signUp);
    // this.router.post(`${this.path}login`, ValidationMiddleware(CreateUserDto, false), this.auth.logIn);
    // this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
    this.router.post(`${this.path}/signin`, async (req, res) => {
      console.log('in signup');
      try {
        // console.log({ verified: verifyGoogleToken(req.body.credential) });
        if (req.body.credential) {
          const verificationResponse = await verifyGoogleToken(req.body.credential);

          if (verificationResponse.error) {
            return res.status(400).json({
              message: verificationResponse.error,
            });
          }

          const profile = verificationResponse?.payload;
          // const existsInDB = DB.find(person => person?.email === profile?.email);
          // console.log(existsInDB);
          // if (!existsInDB) {
          //   console.log(profile);

          // }

          return res.status(201).json({
            message: 'Signup was successful',
            user: {
              firstName: profile?.given_name,
              lastName: profile?.family_name,
              picture: profile?.picture,
              email: profile?.email,
              token: jwt.sign({ email: profile?.email }, 'myScret', {
                expiresIn: '1d',
              }),
            },
          });
        }
      } catch (error) {
        res.status(500).json({
          message: 'An error occured. Registration failed.',
        });
      }
    });
  }
}
