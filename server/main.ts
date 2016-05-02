import {Express, Request, Response} from 'express';
import {MongoService} from './mongoService';
import ITrack = mm.ITrack;
import {NextFunction} from "express";
var express = require('express');
var app:Express = express();
var http = require('http');

const PORT = 3000;

const service:MongoService = new MongoService();

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Enable CORS filter
app.get('/',(req:Request, res:Response)=>{
    res.json({
        status:'running'
    });
});

app.get('/tracks', (req:Request, res:Response)=> {
    service.getTracks().then((data:ITrack[])=>{
        res.json(data);
    });
});

app.get('/track/:id/kml', (req:Request, res:Response)=>{
    service.getTrack(req.params.id).then((data:ITrack)=>{
        res.json(data.kml);
    });
});

var server = http.createServer(app).listen(PORT, ()=> {
    console.log(`Express server listening on port ${PORT}`);
});