'use strict';

import http from 'http';
import https from 'https';
import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import { test } from './example.js';

const app = new Koa({
    proxy: true,
    env: process.env,
    proxyIpHeader: 'X-Real-IP',
});

const httpServer = http.createServer(app.callback());
const httpsServer = https.createServer(app.callback());

app.use(async (ctx, next) => {

});

const bodyParser = koaBodyparser({
    jsonLimit: '10mb',
    enableTypes: ['json', 'form', 'text'],
});
app.use(bodyParser);

app.on('error', (err, ctx) => {
    console.log(err);
});

process.on('uncaughtException', (err) => {
    console.log(err);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('exit', (code) => {
    console.log('process exit:', code);
});

process.on('SIGINT', () => {
    process.exit('process SIGINT: ', 1001);
});

process.on('SIGTERM', function () {
    httpServer.close((error) => {
        console.error(error);
        process.exit(1002);
    });
    httpsServer.close((error) => {
        console.error(error);
    });
});

process.once('SIGTERM', function () { }).once('SIGINT', function () { });

process.setMaxListeners(0);

test();