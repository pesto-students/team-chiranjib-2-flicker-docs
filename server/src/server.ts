// import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
// import { TestRoute } from '@routes/test.route';
// import { ValidateEnv } from '@utils/validateEnv';

// ValidateEnv();

// const app = new App([new UserRoute(), new AuthRoute(), new TestRoute()]);

// app.listen();

// import dotenv from 'dotenv';
// dotenv.config();

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
  }),
);
app.use(express.json());

// Our database
const DB = [];

/**
 *  This function is used verify a google account
 */
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

app.post('/auth/signin', async (req, res) => {
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
      const existsInDB = DB.find(person => person?.email === profile?.email);
      console.log(existsInDB);
      if (!existsInDB) {
        DB.push(profile);
      }

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

app.listen('5000', () => console.log('Server running on port 5000'));
