// import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
// import { TestRoute } from '@routes/test.route';
// import { ValidateEnv } from '@utils/validateEnv';

// ValidateEnv();

// const app = new App([new UserRoute(), new AuthRoute(), new TestRoute()]);

// app.listen();

import { Hocuspocus, Server } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import { Database } from '@hocuspocus/extension-database';
import { connect, set } from 'mongoose';
import { DocumentModel } from './models/document.model';
import { DocumentInterface } from './interfaces/document.interface';
import { SQLite } from '@hocuspocus/extension-sqlite';
import mysql from 'mysql';
import Y from 'yjs';

// const connection = mysql.createConnection({
//   user: 'admin',
//   password: 'pass',
//   database: 'flicker',
// });

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log('Connected to mysql server');
// connection.query('CREATE DATABASE flicker', function (err, result) {
//   if (err) throw err;
//   console.log('Database created');
// });
// });

// Configure the server …
// const server = new Hocuspocus({
//   port: 1234,
//   extensions: [
//     // new Logger(),

//     new Database({
//       // Return a Promise to retrieve data …
//       fetch: async ({ documentName }) => {
//         return new Promise((resolve, reject) => {
//           console.log('in fetch');

//           console.log(documentName);

//           // this.db?.get(
//           //   `
//           //   SELECT data FROM "documents" WHERE name = $name ORDER BY rowid DESC
//           // `,
//           //   {
//           //     $name: documentName,
//           //   },
//           //   (error, row) => {
//           //     if (error) {
//           //       reject(error);
//           //     }
//           //     resolve(row?.data);
//           //   }
//           // );
//           // console.log(documentName);
//           //   resolve('data');
//         });
//       },

//       // … and a Promise to store data:
//       store: async ({ documentName, state }) => {
//         console.log('in store');

//         console.log(documentName);
//         console.log(state);

//         // console.log(documentName, state);
//         // this.db?.run(
//         //   `
//         //   INSERT INTO "documents" ("name", "data") VALUES ($name, $data)
//         //     ON CONFLICT(name) DO UPDATE SET data = $data
//         // `,
//         //   {
//         //     $name: documentName,
//         //     $data: state,
//         //   }
//         // );
//       },
//     }),
//   ],
// });

const ToBase64 = function (u8) {
  return btoa(String.fromCharCode.apply(null, u8));
};

const FromBase64 = function (str) {
  return atob(str)
    .split('')
    .map(function (c) {
      return c.charCodeAt(0);
    });
};

// const encoder = new TextEncoder();
// const data = encoder.encode(uint8Array);
// const base64String = btoa(String.fromCharCode.apply(null, data));

// const binaryString = atob(base64String);
// const uint8Array = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));

const server = new Hocuspocus({
  port: 1234,
  async onStoreDocument(data) {
    console.log(typeof data.document);
    // // console.log(data.document);
    // // console.log(data.documentName);
    // console.log(data.document.store);
    // // return;
    // console.log(Object.keys(data.document));
    // // console.log(data.document.store);
    // // Object.entries(data.document).forEach(([key, data]) => {
    // //   console.log(key + ' ' + typeof data);
    // // });

    // // return;

    // // Save to database. Example:
    // // saveToDatabase(data.document, data.documentName);
    // console.log('in store');
    // console.log('============');

    // console.log(Y.encodeStateAsUpdate(data.document));
    // console.log(data.document);
    const bs = ToBase64(Y.encodeStateAsUpdate(data.document));
    // console.log('============');
    const response = await DocumentModel.find({ name: data.documentName });
    if (response[0]?.data) return;

    // const createUserData: DocumentInterface = await DocumentModel.create({ name: data.documentName, data: data.document });

    const createUserData = new DocumentModel();
    createUserData.name = data.documentName;
    createUserData.data = bs;

    await createUserData.save();
    // const createUserData: DocumentInterface = await DocumentModel.create({ name: 'joe', data: { name: 'joe' } });
    // console.log(createUserData);
  },

  async onLoadDocument(data) {
    // console.log(data.documentName);
    const response = await DocumentModel.find({ name: data.documentName });
    console.log(response);
    if (response[0]?.data) {
      // return ;
      console.log(response[0].data);
      console.log(FromBase64(response[0].data));

      const unit8Ar = FromBase64(response[0].data);
      const uint8arr = new Uint8Array(unit8Ar);
      const ydoc = new Y.Doc();

      Y.applyUpdate(ydoc, uint8arr);
      return ydoc;
    }
    console.log('in fetch');
  },

  // async connected() {
  //   console.log('connections:', server.getConnectionsCount());
  // },
  // async onConfigure(data) {
  //   // Output some information
  //   console.log(`Server was configured!`);
  // },
  // async onConnect(data) {
  //   // Output some information
  //   console.log(`New websocket connection`);
  // },
  // async onDestroy(data) {
  //   // Output some information
  //   console.log(`Server was shut down!`);
  // },
  // async onDisconnect(data) {
  //   // Output some information
  //   console.log(`"${data.context.user.name}" has disconnected.`);
  // },
});

// const server = new Hocuspocus({
//   port: 1234,
//   extensions: [
//     new Logger(),
//     // new SQLite(),
//     // new Database({
//     //   // Return a Promise to retrieve data …
//     //   fetch: async ({ documentName }) => {
//     //     return new Promise((resolve, reject) => {
//     //       console.log('in fetch');

//     //       console.log(documentName);

//     //       // this.db?.get(
//     //       //   `
//     //       //   SELECT data FROM "documents" WHERE name = $name ORDER BY rowid DESC
//     //       // `,
//     //       //   {
//     //       //     $name: documentName,
//     //       //   },
//     //       //   (error, row) => {
//     //       //     if (error) {
//     //       //       reject(error);
//     //       //     }
//     //       //     resolve(row?.data);
//     //       //   }
//     //       // );
//     //       // console.log(documentName);
//     //       //   resolve('data');
//     //     });
//     //   },

//     //   // … and a Promise to store data:
//     //   store: async ({ documentName, state }) => {
//     //     console.log('in store');

//     //     console.log(documentName);
//     //     console.log(state);

//     //     // console.log(documentName, state);
//     //     // this.db?.run(
//     //     //   `
//     //     //   INSERT INTO "documents" ("name", "data") VALUES ($name, $data)
//     //     //     ON CONFLICT(name) DO UPDATE SET data = $data
//     //     // `,
//     //     //   {
//     //     //     $name: documentName,
//     //     //     $data: state,
//     //     //   }
//     //     // );
//     //   },
//     // }),
//   ],
// });

// … and run it!
const connectToDB = async () => {
  await connect('mongodb+srv://flickerdocs:5fNEtYhvS6ErPzP2@cluster0.1wjykmn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log('connected to db');
    })
    .catch(err => {
      console.log(err);
    });
};

connectToDB();

server.listen();

// const response = connection.query(
//   "insert into docs (ID,docname, data) values ('" +
//     Math.floor(Math.random() * 100000000 + 1) +
//     "', '" +
//     data.documentName +
//     "', '" +
//     JSON.stringify(data.document) +
//     "')",
//   function (err, result) {
//     if (err) throw err;
//     console.log('Document saved');
//   },
// );
