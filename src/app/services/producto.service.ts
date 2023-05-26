import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = 'http://localhost:4000/api/'

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}productos`);
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}productos/${id}`);
  }

  updateProducto(id: string, modelo: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}productos/${id}`, modelo);
  }

  deleteProducto(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.url}productos/${id}`);
  }

  postProducto(modelo: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.url}productos`, modelo);
  }



}
