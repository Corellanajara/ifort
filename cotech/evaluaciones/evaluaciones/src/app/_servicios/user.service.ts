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

export class UserService {

  private url = "http://localhost:3600";

  constructor(private http: HttpClient) { }

  listar() {
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.get<any[]>(`${this.url}/users/`, {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization',`Bearer ${accessToken}`)
    });
  }
  insertar(User : any){
    return this.http.post<any[]>(`${this.url}/users/`, User ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:string,User : any){
    let accessToken = sessionStorage.getItem('accessToken');
    return this.http.patch<any[]>(`${this.url}/users/${id}`, User ,{
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
}
