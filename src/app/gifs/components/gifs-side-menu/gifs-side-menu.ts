import { Component } from '@angular/core';
import { GifsSideHeader } from './gifs-side-header/gifs-side-header';
import { GifsSideOption } from './gifs-side-option/gifs-side-option';


@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideHeader, GifsSideOption],
  templateUrl: './gifs-side-menu.html',
})
export class GifsSideMenu { }
