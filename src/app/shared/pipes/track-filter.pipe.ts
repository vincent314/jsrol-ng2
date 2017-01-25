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
      return (track.type === filter.type) || filter.type === '';
    })
  }

}