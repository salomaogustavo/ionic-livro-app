import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorInterface } from '../types/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  API_URL = 'http://localhost:3000/autores/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAutores(): Observable<AutorInterface[]> {
    return this.httpClient.get<AutorInterface[]>(this.API_URL);
  }

  excluir(id: number): Observable<Object> {
    return this.httpClient.delete(this.API_URL + id);
  }

  getAutor(id: number): Observable<AutorInterface> {
    return this.httpClient.get<AutorInterface>(this.API_URL + id);
  }

  private adicionar(autor: AutorInterface)  {
    return this.httpClient.post(this.API_URL, autor);
  }

  private atualizar(autor: AutorInterface) {
    return this.httpClient.put(this.API_URL + autor.id, autor);
  }

  salvar(autor: AutorInterface) {
    if( autor.id ) {
      return this.atualizar(autor);
    }

    return this.adicionar(autor);
  }
}

