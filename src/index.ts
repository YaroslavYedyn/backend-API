import * as http from 'http';
import {app} from './app';
import {constant} from './constants';

const server = http.createServer(app);

server.listen(constant.PORT, () => {
    console.log('\x1b[33m%s\x1b[0m', `App listen ${constant.PORT}`);
});

process.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});

process.on('uncaughtException', (e) => {
    console.log(e);
});

process.on('unhandledRejection', (e) => {
    console.log(e);
});
