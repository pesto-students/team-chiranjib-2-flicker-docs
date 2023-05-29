import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

import { Hocuspocus } from '@hocuspocus/server';
import { Logger } from '@hocuspocus/extension-logger';

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

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.startWebsocketserver();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url);
  }

  private async startWebsocketserver() {
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

    server.listen();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
