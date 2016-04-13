import {Document} from "mongoose";
import mongoose = require('mongoose');
import {config} from './config';
import {Connection} from "mongoose";
import {Promise} from "mongoose";
import ITrack = mm.ITrack;

interface ITrackModel extends ITrack, Document {
}

var trackSchema = new mongoose.Schema({
    name: String,
    type: String,
    distance: Number,
    kml: String
});

var Track = mongoose.model<ITrackModel>('Track', trackSchema);

export class MongoService {
    constructor() {
        var connection:Connection = mongoose.connect(config.mongodb.url).connection;
        connection.on('error', console.error.bind(console, 'connection error :'));
        connection.once('open',()=>{
            console.log('Connection open');
        });
    }

    public getTracks():Promise<ITrackModel[]> {
        return Track.find({}).exec();
    }
}