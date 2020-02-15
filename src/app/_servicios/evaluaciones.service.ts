import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class EvaluacionesService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    let id = sessionStorage.getItem('empresaId');
    return this.http.get<any[]>(`${this.url}/evaluaciones/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(Evaluacion : any){
    let id = sessionStorage.getItem('empresaId');
    Evaluacion.empresaId = id;
    console.log("al enviar",Evaluacion);
    return this.http.post<any[]>(`${this.url}/evaluaciones/`, Evaluacion ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,Evaluacion : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/evaluaciones/${id}`, Evaluacion ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  borrar(id:string){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.delete<any[]>(`${this.url}/evaluaciones/${id}` ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }


}
