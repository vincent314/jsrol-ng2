declare module jsrol{
    export interface EventModel{
        $key:string;
        name:string;
        type:string;
        dateTime:Date|string;
        loop1:TrackModel|string;
        loop2:TrackModel|string;
        loop3:TrackModel|string;
    }
}