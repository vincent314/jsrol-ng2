export interface TrackModel {
  $key?: string;
  id?: string;
  name: string;
  type: string;
  kml?: string;
  kmlContent?: string;
  distance: number;
}
