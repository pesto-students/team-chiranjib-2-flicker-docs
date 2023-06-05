import { Hocuspocus } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';
import { DocumentModel } from './models/document.model';

import Y from 'yjs';
import { logger } from './utils/logger';

const ToBase64 = function (u8: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, u8));
};

const base64ToUnit8Array = (base64string: string): Uint8Array => {
  const binaryString = atob(base64string);
  return Uint8Array.from(binaryString, c => c.charCodeAt(0));
};

const storeDocumentInDB = async (data: any) => {
  const bs = ToBase64(Y.encodeStateAsUpdate(data.document));
  try {
    const document = await DocumentModel.findOne({ name: data.documentName });
    if (!document) {
      const createDocData = new DocumentModel();
      createDocData.name = data.documentName;
      createDocData.data = bs;
      createDocData.createdAt = new Date();

      await createDocData.save();
    } else {
      document.data = bs;
      document.updatedAt = new Date();
      await document.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const loadDocumentFromDB = async (data: any) => {
  try {
    const document = await DocumentModel.findOne({ name: data.documentName });

    if (document.data) {
      const uint8arr = base64ToUnit8Array(document.data);
      const ydoc = new Y.Doc();

      Y.applyUpdate(ydoc, uint8arr);

      return ydoc;
    }
  } catch (error) {
    console.log(error);
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
    logger.info('connections:', server.getConnectionsCount());
  },
  async onConfigure() {
    logger.info(`Server was configured!`);
  },
  async onConnect(data) {
    logger.info(`New websocket connection ${data.documentName}`);
  },
  async onDestroy() {
    logger.info(`Server was shut down!`);
  },
  async onDisconnect(data) {
    logger.info(`"user from ${data.documentName}" has disconnected.`);
  },
});

export default server;
