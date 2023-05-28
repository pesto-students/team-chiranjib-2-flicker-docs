// import { App } from '@/app';
// import { AuthRoute } from '@routes/auth.route';
// import { UserRoute } from '@routes/users.route';
// import { TestRoute } from '@routes/test.route';
// import { ValidateEnv } from '@utils/validateEnv';

// ValidateEnv();

// const app = new App([new UserRoute(), new AuthRoute(), new TestRoute()]);

// app.listen();

import { Hocuspocus } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import { connect } from 'mongoose';
import { DocumentModel } from './models/document.model';

import Y from 'yjs';

const ToBase64 = function (u8) {
  return btoa(String.fromCharCode.apply(null, u8));
};

// const FromBase64 = function (str) {
//   return atob(str)
//     .split('')
//     .map(function (c) {
//       return c.charCodeAt(0);
//     });
// };

const base64ToUnit8Array = base64string => {
  const binaryString = atob(base64string);
  return Uint8Array.from(binaryString, c => c.charCodeAt(0));
};

const server = new Hocuspocus({
  port: 1234,
  extensions: [new Logger()],
  async onStoreDocument(data) {
    const bs = ToBase64(Y.encodeStateAsUpdate(data.document));

    const response = await DocumentModel.find({ name: data.documentName });
    if (!response[0]?.data) {
      const createUserData = new DocumentModel();
      createUserData.name = data.documentName;
      createUserData.data = bs;

      await createUserData.save();
    } else {
      await DocumentModel.updateOne({ name: data.documentName }, { data: bs });
    }
  },

  async onLoadDocument(data) {
    const response = await DocumentModel.find({ name: data.documentName });

    if (response[0]?.data) {
      // const unit8Ar = FromBase64(response[0].data);
      const uint8arr = base64ToUnit8Array(response[0]?.data);
      const ydoc = new Y.Doc();

      Y.applyUpdate(ydoc, uint8arr);
      console.log(`document loaded ${data.documentName}`);

      return ydoc;
    }
  },

  async connected() {
    console.log('connections:', server.getConnectionsCount());
  },
  async onConfigure() {
    console.log(`Server was configured!`);
  },
  async onConnect(data) {
    console.log(`New websocket connection ${data.documentName}`);
  },
  async onDestroy() {
    console.log(`Server was shut down!`);
  },
  async onDisconnect(data) {
    // console.log(`"${data.context.user.name}" has disconnected.`);
    console.log(`disconnected.`);
  },
});

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
