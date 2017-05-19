import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'trackFilter'})
@Injectable()
export class TrackFilterPipe implements PipeTransform {
  transform(tracks: TrackModel[], ...args: any[]): any {
    if (!tracks || !args || !args[0]) {
      return tracks;
    }
    return tracks.filter((track: TrackModel) => {
      const filter = args[0] as FilterModel;
      let found = (track.type === filter.type)
        || filter.type === '';

      if(track.openRunnerId) {
        found = found || track.openRunnerId.toString().indexOf(filter.textSearch) >= 0;
      }

      if(track.name){
        found = found || track.name.indexOf(filter.textSearch) >= 0;
      }

      return found;
    })
  }

}
