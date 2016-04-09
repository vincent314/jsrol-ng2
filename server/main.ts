import {Express, Request, Response} from 'express';
import {MongoService} from './mongoService';
var express = require('express');
var app:Express = express();
var http = require('http');

const PORT = 3000;

app.get('/tracks', (req:Request, res:Response)=> {
    var service:MongoService = new MongoService();
    res.json(service.getTracks());
});

var server = http.createServer(app).listen(PORT, ()=> {
    console.log(`Express server listening on port ${PORT}`);
});