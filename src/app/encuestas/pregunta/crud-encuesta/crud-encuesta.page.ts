import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud-encuesta',
  templateUrl: './crud-encuesta.page.html',
  styleUrls: ['./crud-encuesta.page.scss'],
})
export class CrudEncuestaPage implements OnInit {
  titulo = "";
  actualizando = false;
  constructor(private navParams : NavParams,private modalCtrl : ModalController) {
    var pregunta = navParams.get('pregunta');

    if(pregunta){
        this.actualizando = true;
        console.log(pregunta);
        this.titulo = pregunta.titulo;
    }

  }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  actualizarEncuesta(){
    this.modalCtrl.dismiss({titulo:this.titulo});
  }
  agregarPregunta(){
    this.modalCtrl.dismiss({titulo:this.titulo});
  }
}
