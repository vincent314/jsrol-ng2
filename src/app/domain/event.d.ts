declare module jsrol{
    export interface Event{
        name:string;
        type:string;
        dateTime:Date|string;
        loop1:Track|string;
        loop2:Track|string;
        loop3:Track|string;
    }
}