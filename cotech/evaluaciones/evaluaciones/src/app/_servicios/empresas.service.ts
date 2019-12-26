import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface Usuario {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissionLevel: string;
  menus : Array<Menu>;
  _id : string;
}
interface Menu {
    title: string;
    path: string;
    icon: string;
    _id: string;
}
@Injectable()

export class EmpresaService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    let id = sessionStorage.getItem('empresaId');
    return this.http.get<Usuario>(`${this.url}/users/empresa/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(User : any){
    console.log(User);
    User.permissionLevel = 1;
    User.menus = [];
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.post<Usuario>(`${this.url}/users/`,User, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  actualizar(id:string,Empresa : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/empresas/${id}`, Empresa ,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/users/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  gathering(id:string){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.get<Usuario>(`${this.url}/users/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  listarById(id:string){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.get<Usuario>(`${this.url}/empresas/${id}` , {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
}
