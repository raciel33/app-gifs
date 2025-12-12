import {Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'gifs-side-header',
  imports: [],
  templateUrl: './gifs-side-header.html',
})
export class GifsSideHeader {

  env = environment
}
