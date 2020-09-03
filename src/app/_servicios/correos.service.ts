import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()

export class CorreosService {

  private url: string = "http://178.128.71.20:4120";

  constructor(private http: HttpClient) { }


  insertar(to,subject,message){
    var correo = {to:to,subject:subject,message:message};
    let id = sessionStorage.getItem('empresaId');
    return this.http.post<any[]>(`${this.url}/email/`, correo ,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
