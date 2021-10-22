import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';
import * as mongoose from 'mongoose';

import {graphqlHTTP} from 'express-graphql';
import {NextFunction, Request, Response} from 'express';

import * as rateLimit from 'express-rate-limit';

import {graphql} from './graphql';
import {appConfig} from './configs';

const serverRequestLimit = rateLimit({
    windowMs: 10000,
    max: 100
});

class App {
    public readonly app: express.Application = express();

    constructor() {
        (global as any).appRoot = path.resolve(process.cwd(), '../');
        this.app.use(morgan('dev'));
        this.app.use(helmet({
            contentSecurityPolicy: false
        }));
        this.app.use(serverRequestLimit);
        this.app.use(cors());

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(graphqlHTTP({
            schema: graphql.schema,
            customExecuteFn: graphql.createExecution(),
            graphiql: true
        }));

        this.setupDB();

        this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

        this.app.use(this.ErrorHandler);
    }

    private setupDB(): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mongoose.connect(appConfig.DB_URL, {useNewUrlParser: true});

        const db = mongoose.connection;
        console.log('\x1b[31m%s\x1b[31m', 'db connected...');
        db.on('error', console.log.bind(console, 'Mongo error'));
    }

    private ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
        res.status(err.status || 500);
        res.json({
            message: err.message || 'Unknown error',
            code: err.code || 0
        });
    }
}

export const app = new App().app;
