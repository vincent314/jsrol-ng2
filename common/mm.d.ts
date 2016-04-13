declare module mm {
    interface ITrack {
        name:string;
        type:string;
        distance:number;
        kml:string;
    }

    interface IConfig {
        mongodb:{
            url:string
        }
    }
}