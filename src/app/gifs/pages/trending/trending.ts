import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GiphyResponse } from '../../interfaces/giphy.interfaces';
import { GifService } from '../../services/gifs';




@Component({
  selector: 'app-trending',
  imports: [GifsList],
  templateUrl: './trending.html',


})

export default class Trending  {



     gifService = inject( GifService );






 }


