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

import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passportConfig';
import { connect } from './db';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel';

const app = express();

app.use(
  cookieSession({
    name: 'session',
    keys: ['flicker-docs'],
    maxAge: 24 * 60 * 60 * 100,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
connect();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);

interface RequestWithUser extends Request {
  user: any;
}

app.get('/auth/login/success', async (req: RequestWithUser, res: Response) => {
  if (req.user) {
    const existingUser = await User.findOne({ id: req.user.id });

    if (!existingUser) {
      return res.status(403).json({ error: true, message: 'Not Authorized' });
    }

    jwt.sign({ user: existingUser }, 'secretKey', { expiresIn: '1h' }, (err, token) => {
      if (err) {
        return res.json({
          token: null,
        });
      }

      res.status(200).json({
        error: false,
        message: 'Successfully Loged In',
        user: existingUser,
        token,
      });
    });
  } else {
    res.status(403).json({ error: true, message: 'Not Authorized' });
  }
});

app.get('/auth/login/failed', (req, res) => {
  res.status(401).json({
    error: true,
    message: 'Log in failure',
  });
});

app.get('/auth/google', passport.authenticate('google', ['profile', 'email']));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/auth/login/failed',
  }),
);

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { session: false }),
//   (req, res) => {
//     jwt.sign(
//       { user: req.user },
//       "secretKey",
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) {
//           return res.json({
//             token: null,
//           });
//         }
//         res.json({
//           token,
//         });
//       }
//     );
//   }
// );

app.get('/auth/logout', (req, res) => {
  //   req.logout();
  res.redirect('http://localhost:3000');
});

const port = 5000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
