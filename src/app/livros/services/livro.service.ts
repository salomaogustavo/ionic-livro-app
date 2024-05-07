import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Livro } from '../types/livro.class';
import { Observable, map, tap } from "rxjs";
import { LivroInterface } from "@livro";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  API_URL = "http://localhost:3000/livros/";

  constructor(
    private httpClient: HttpClient
  ) { }

  save(livro: any): Observable<LivroInterface> {
    return this.httpClient.post<LivroInterface>(this.API_URL, livro);
  }

  update(livro: any): Observable<LivroInterface> {
    return this.httpClient.put<LivroInterface>(this.API_URL + livro.id, livro);
  }

  getLivro(id: number): Observable<LivroInterface> {
    return this.httpClient.get<LivroInterface>(this.API_URL + id);
  }

  getLivros(): Observable<Livro[]> {
    return this.httpClient
    .get<Livro[]>(this.API_URL)
    .pipe(
      tap((data) => console.log('Data: ', data)),
      map((data) => {
        return data.map(item => new Livro(item))
      }),
      tap((data) => console.log('Data: ', data)),
    )
  }

  remove(livro: Livro) {
    return this.httpClient.delete(this.API_URL + livro.id);
  }

  up(livro: LivroInterface): Observable<LivroInterface> {
    console.log(livro);

    if ( livro.id ) {
      return this.update(livro);
    }

    return this.save(livro);
  }
}
