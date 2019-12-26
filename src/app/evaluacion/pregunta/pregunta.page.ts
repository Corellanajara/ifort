import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { ImportarPagePregunta } from './importar/importar.page';
import { CrudPage } from './crud/crud.page';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})

export class PreguntaPage implements OnInit {
  public evaluacion : any;
  public indicadores = [];
  public tipos = ["porcentaje","numerico","rango"];
  constructor(private navParams : NavParams,private modalCtrl : ModalController) {
    this.evaluacion = navParams.get('evaluacion');
    this.indicadores = (this.evaluacion.indicadores || []);
    console.log(this.evaluacion);
 }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  async crearIndicador() {
    const modal = await this.modalCtrl.create({
      component:  CrudPage,
      cssClass: 'modals',
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log(modal);
        this.indicadores.push(modal.data);
      }

    });
    return await modal.present();
  }
  async abrirImportar(){
    const modal = await this.modalCtrl.create({
      component: ImportarPagePregunta,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("datos",modal);
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
      console.log("en indicadores",modal);
    });
    return await modal.present();
  }
  guardarindicadores(){
    this.modalCtrl.dismiss(this.indicadores);
  }
}
