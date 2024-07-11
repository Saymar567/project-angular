import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //url = 'http://localhost:4000/api/productos/'
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(`${this.url}/api/productos`);
  }
  eliminarProducto(id: String): Observable<any> {
    return this.http.delete(`${this.url}/api/productos/${id}`);
  }
  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post(`${this.url}/api/productos`, producto)
  }
  obtenerProducto(id: String): Observable<any> {
    return this.http.get(`${this.url}/api/productos/${id}`);
  }
  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(`${this.url}/api/productos/${id}`, producto);
  }
}