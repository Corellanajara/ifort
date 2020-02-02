import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EncuestaService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    let id = sessionStorage.getItem('empresaId');
    return this.http.get<any[]>(`${this.url}/encuestas/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(Encuesta : any){
    let id = sessionStorage.getItem('empresaId');
    Encuesta.empresaId = id;
    console.log("al enviar",Encuesta);
    return this.http.post<any[]>(`${this.url}/encuestas/`, Encuesta ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,Evaluacion : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/encuestas/${id}`, Evaluacion ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/encuestas/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}

export class ProductoService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    let id = sessionStorage.getItem('empresaId');
    return this.http.get<any[]>(`${this.url}/productos/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(Evaluacion : any){
    let id = sessionStorage.getItem('empresaId');
    Evaluacion.empresaId = id;
    console.log("al enviar",Evaluacion);
    return this.http.post<any[]>(`${this.url}/productos/`, Evaluacion ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,Evaluacion : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/productos/${id}`, Evaluacion ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/productos/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}

export class NotificacionesService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    let id = sessionStorage.getItem('empresaId');
    return this.http.get<any[]>(`${this.url}/notificaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(Evaluacion : any){
    let id = sessionStorage.getItem('empresaId');
    Evaluacion.empresaId = id;
    console.log("al enviar",Evaluacion);
    return this.http.post<any[]>(`${this.url}/notificaciones/`, Evaluacion ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,Evaluacion : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/notificaciones/${id}`, Evaluacion ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/notificaciones/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
