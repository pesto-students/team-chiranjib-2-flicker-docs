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
const server = new Hocuspocus({
  port: 1234,
  async onStoreDocument(data) {
    console.log(data.document);
    console.log(data.documentName);

    // Save to database. Example:
    // saveToDatabase(data.document, data.documentName);
    console.log('in store');
  },

  async onLoadDocument(data) {
    console.log(data.documentName);

    console.log('in fetch');
  },
});

// const server = Server.configure({
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

// … and run it!
server.listen();
