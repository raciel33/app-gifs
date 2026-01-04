import {  Component, inject, signal } from '@angular/core';
import { GifService } from '../../services/gifs';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mapper/gif.mapper';
import { GifsList } from '../../components/gifs-list/gifs-list';

@Component({
  selector: 'app-search',
  imports: [GifsList],
  templateUrl: './search.html',
})
export default class Search {

  gifs = signal<Gif[]>([]);

  gifService = inject( GifService );

  onSearch(search: string){
    this.gifService.searchGifs( search ).subscribe(
      resp =>{
       // console.log(resp);
          this.gifs.set(resp)

      }
    )
  }

}
