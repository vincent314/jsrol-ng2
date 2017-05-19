interface EventModel {
  $key?: string;
  name?: string;
  type?: string;
  dateTime?: Date|number;
  loop1?: TrackModel|string;
  loop2?: TrackModel|string;
  loop3?: TrackModel|string;
}

interface FilterModel{
  type?:string;
  textSearch?:string;
}

interface KmlModel{
  $key?:string;
  $value?:string;
}

interface TrackModel {
  $key?: string;
  id?: string;
  name?: string;
  type?: string;
  kml?: string;
  distance?: number;
  openRunnerId?: string;
}

interface TypeModel {
  $key: string;
  $value: string;
}


interface EventBrowserParams {
  eventId: string;
  trackId: string;
}
