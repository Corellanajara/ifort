import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';


import { CrudPage } from './crud/crud.page';
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})

export class PreguntaPage implements OnInit {
  public evaluacion : any;
  public preguntas = [];
  public tipos = ["porcentaje","numerico","rango"];
  constructor(private navParams : NavParams,private modalCtrl : ModalController) {
    this.evaluacion = navParams.get('evaluacion');
    this.preguntas = (this.evaluacion.preguntas || []);
    console.log(this.evaluacion);
 }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  async crearPregunta() {
    const modal = await this.modalCtrl.create({
      component:  CrudPage,
      cssClass: 'modals',
    });
    modal.onDidDismiss().then(modal=>{
      this.preguntas.push(modal.data);
    });
    return await modal.present();
  }
  async editarPregunta(ev) {
    const modal = await this.modalCtrl.create({
      component:  CrudPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': ev,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("en preguntas",modal);
    });
    return await modal.present();
  }
  guardarPreguntas(){
    this.modalCtrl.dismiss(this.preguntas);
  }
}
