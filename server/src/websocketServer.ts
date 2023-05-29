import { Hocuspocus } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import { DocumentModel } from './models/document.model';

import Y from 'yjs';

const ToBase64 = function (u8: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, u8));
};

const base64ToUnit8Array = (base64string: string): Uint8Array => {
  const binaryString = atob(base64string);
  return Uint8Array.from(binaryString, c => c.charCodeAt(0));
};

const storeDocumentInDB = async (data: any) => {
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
};

const loadDocumentFromDB = async (data: any) => {
  const response = await DocumentModel.find({ name: data.documentName });

  if (response[0]?.data) {
    const uint8arr = base64ToUnit8Array(response[0]?.data);
    const ydoc = new Y.Doc();

    Y.applyUpdate(ydoc, uint8arr);
    console.log(`document loaded ${data.documentName}`);

    return ydoc;
  }
};

const server = new Hocuspocus({
  port: 1234,
  extensions: [new Logger()],
  async onStoreDocument(data) {
    storeDocumentInDB(data);
  },

  async onLoadDocument(data) {
    return loadDocumentFromDB(data);
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

export default server;
