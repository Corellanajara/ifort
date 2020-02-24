import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { CrudEncuestaPage } from './crud-encuesta/crud-encuesta.page';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaEncuestaPage implements OnInit {

  constructor(private navParams : NavParams,private modalCtrl : ModalController) {
    this.encuesta = navParams.get('encuesta');
  }
  encuesta : any;
  preguntas  = [];
  ngOnInit() {
  }
  async crearPreguntas(){
    const modal = await this.modalCtrl.create({
      component: CrudEncuestaPage,
      cssClass: 'modals',
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log(modal.data);
        this.encuesta.preguntas.push(modal.data);
      }

    });
    return await modal.present();
  }
  async editarPregunta(pregunta,indice){
    const modal = await this.modalCtrl.create({
      component: CrudEncuestaPage,
      cssClass: 'modals',
      componentProps: {
        'pregunta': pregunta,
      }
    })
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        this.encuesta.preguntas[indice] = modal.data;

      }

    });
    return await modal.present();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  eliminarPregunta(indicador,indice){
    this.encuesta.preguntas.splice(indice, 1);
    console.log(this.encuesta.preguntas);
  }
  guardarPreguntas(){
    console.log(this.encuesta);
    this.modalCtrl.dismiss(this.encuesta);
  }


}
