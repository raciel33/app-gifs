import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { GifsList } from "../../components/gifs-list/gifs-list";
import { GiphyResponse } from '../../interfaces/giphy.interfaces';
import { GifService } from '../../services/gifs';




@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending.html',


})

export default class Trending  {


   gifService = inject( GifService );

   //Tomamos como referencia este div del html
   scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')


   //Funcion para un scroll infinito
   onScroll( event: Event){

      const scrollDiv = this.scrollDivRef()?.nativeElement;

      if( !scrollDiv )return;

      //parte del scroll que ya se ha hecho
      const scrollTop = scrollDiv.scrollTop;

      //tamaño del viewPoint(elemento al cual le estamos haciendo scroll)
      const clientHeight = scrollDiv.clientHeight;

      //scroll maximo posible que se le puede hacer al elemento
      const scrollHeight = scrollDiv.scrollHeight;

      //cuando llega al final del scroll que deseamos
      const isAtBotton = scrollTop + clientHeight + 300 >= scrollHeight

      //console.log(isAtBotton);
      if (isAtBotton) {
        this.gifService.loadTrendingGifs();
      }
       }






 }


