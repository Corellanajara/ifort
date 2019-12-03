import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface auth {
  accessToken : string;
  refreshToken : string;
  userId : string;
}

@Injectable()

export class AuthService {

  private url: string = "http://localhost:3600";

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(`${this.url}/menus/`, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  insertar(Menu : any){
    return this.http.post<any[]>(`${this.url}/menus/`, Menu ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  actualizar(id:number,Menu : any){
    return this.http.put<any[]>(`${this.url}/menus/${id}`, Menu ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  borrar(id:string){
    return this.http.delete<any[]>(`${this.url}/menus/${id}` ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
  login(usuario){
    return this.http.post<auth>(`${this.url}/auth/` , usuario , {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
