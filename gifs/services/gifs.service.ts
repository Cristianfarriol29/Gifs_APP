import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearchResponse } from '../Interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey: string = "way2zs5T41VU0opD8h0D0ukNHf4TTX5G";
  private urlService: string = "https://api.giphy.com/v1/gifs"
  private _historial: string[] = [];



  public resultados:Gif[] = [];


  constructor(private http: HttpClient){
    if (localStorage.getItem("historial")){
      this._historial = JSON.parse(localStorage.getItem("historial")!)
    }
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || []
  }

get historial () {

  return [...this._historial];
}

buscarGifs (query:string) {

  const params = new HttpParams()
  .set('api_key', this.apikey)
  .set('limit', '10')
  .set('q', query);


  query = query.trim().toLowerCase();
  if (!this._historial.includes(query)){
    this._historial.unshift(query)
  }
this._historial = this._historial.splice(0,10)
localStorage.setItem("historial", JSON.stringify(this._historial))

this.http.get<GifsSearchResponse>(`${this.urlService}/search`, {params})
.subscribe(
  (resp) => {
    localStorage.setItem("resultados", JSON.stringify(resp.data))
    this.resultados = JSON.parse(localStorage.getItem("resultados")!)
  }
)
}



}
