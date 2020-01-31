import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  notificaciones = [];
  notificacion = {id:'',tiitulo : ''};
  constructor() { }

  ngOnInit() {
  }
  confirmar(){
    this.notificaciones.push({});
  }
  redefinirnotificacion(){
    this.notificacion = {id:'',tiitulo : ''};
  }
}
