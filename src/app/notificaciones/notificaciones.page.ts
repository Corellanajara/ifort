import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController } from '@ionic/angular';
import { GraficoPage } from './grafico/grafico.page';
import { VerPAge } from './ver/ver.page';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notificaciones = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private modalCtrl : ModalController,
    private userService : UserService) {
    this.traerDatos();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  traerDatos(){
    let userId = sessionStorage.getItem('userId');
    this.userService.gathering(userId).subscribe( datos => {
      this.notificaciones = datos.notificaciones;
      console.log(datos);
      console.log(this.notificaciones);

    })
  }
  ngOnInit() {
  }
  async verNotificacion(notificacion,estado) {
    if(estado == 0){
      return;
    }
    const modal = await this.modalCtrl.create({
      component: VerPage,
      cssClass: 'graficos',
      componentProps: {
      'notificacion': notificacion,
      'noOcultar': false
    }
    });

    return await modal.present();
  }

}
