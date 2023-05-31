// import dotenv from 'dotenv';
// dotenv.config();

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const connect = async () => {
  mongoose.connect('mongodb+srv://flickerdocs:5fNEtYhvS6ErPzP2@cluster0.1wjykmn.mongodb.net/?retryWrites=true&w=majority', {});
  const db = mongoose.connection;
  db.on('error', () => {
    console.log('could not connect');
  });
  db.once('open', () => {
    console.log('> Successfully connected to database');
  });
};
