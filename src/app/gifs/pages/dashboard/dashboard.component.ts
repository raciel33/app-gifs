import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GifsSideMenu } from "../../components/gifs-side-menu/gifs-side-menu";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterOutlet, GifsSideMenu],
})
export default class DashboardComponent {

  constructor() { }



}
