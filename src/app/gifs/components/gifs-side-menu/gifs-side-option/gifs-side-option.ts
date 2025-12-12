import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GifsSideOption {

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
