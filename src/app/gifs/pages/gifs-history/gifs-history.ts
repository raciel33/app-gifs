import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GifService } from '../../services/gifs';
import { Gif } from '../../interfaces/gif.interface';
import { ActivatedRoute } from '@angular/router';
import { GifsList } from '../../components/gifs-list/gifs-list';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'gifs-history',
  imports: [GifsList],
  templateUrl: './gifs-history.html',
})
export default class GifsHistory  {

  gifService = inject(GifService)

  //captamos el parametro de la url
  query = toSignal(
      inject(ActivatedRoute).params.pipe(map( params => params['gif'] ))
    );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));





}
