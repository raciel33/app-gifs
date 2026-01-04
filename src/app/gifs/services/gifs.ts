import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';





const GIF_KEY = 'gifs';

//cargamos del localStorage
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
 // console.log(gifs);
  return gifs;
}



@Injectable({providedIn: 'root'})


export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  private trendingPage = signal(0);




  trendingGifGroup = computed<Gif[][]>(()=>{

      /*esto se utiliza para mostrar los gif en el trending.html
       con un diseño Masonry grid
       nota: Para ello se crea un array que va ir almacendo un array de 3 en 3
      */

    const groups= [];

    for (let i = 0; i < this.trendingGifs().length; i+=3) {

      groups.push( this.trendingGifs().slice(i, i + 3 ) );

    }

    return groups
  })


  searchHistory = signal<Record<string, Gif[]>>( loadFromLocalStorage() );
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor(){
    this.loadTrendingGifs();
  }

  //Guardando en el localStorage
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  })


  loadTrendingGifs(){

    if( this.trendingGifsLoading()) return

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${environment.giphyUrl }/gifs/trending`, {
      params:{
        api_key: environment.apiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe( (resp) => {
      // console.log({ resp });
      const gifs = GifMapper.mapGiphyItemToGifArray(resp.data);

      this.trendingGifs.update( currentGifs => [
        ...currentGifs,
        ...gifs
      ]);
      this.trendingPage.update( page => page + 1 );

      this.trendingGifsLoading.set(false);

      console.log({ gifs });
    } );
  }

  searchGifs(query: string): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${environment.giphyUrl }/gifs/search`, {
      params:{
        api_key: environment.apiKey,
        limit: 20,
        q: query
      }
    })
    .pipe(
      map( ({ data }) => data ),
      map( ( items ) => GifMapper.mapGiphyItemToGifArray(items) ),

      // TODO Historial
      tap( items => {
        this.searchHistory.update( history=> ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      } )
    )

    // .subscribe( (resp) => {
    //   // console.log({ resp });
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);

    //   console.log({ search: gifs });
    // } );
  }

  getHistoryGifs( query: string ): Gif[]{
     return this.searchHistory()[query] ?? [];
  }

}
