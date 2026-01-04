import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifService } from '../../../services/gifs';

interface MenuOption {
  icon: string,
  label:string,
  route:string,
  sublabel: string,

}
@Component({
  selector: 'gifs-side-option',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-option.html',

})

export class GifsSideOption {

  history = inject(GifService)

  menuOption: MenuOption[]= [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      sublabel:'Gifs populares'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      route: '/dashboard/search',
      sublabel:'Buscar gifs'
    },
  ]



 }
