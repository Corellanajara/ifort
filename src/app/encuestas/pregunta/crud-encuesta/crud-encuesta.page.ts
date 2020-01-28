import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud-encuesta',
  templateUrl: './crud-encuesta.page.html',
  styleUrls: ['./crud-encuesta.page.scss'],
})
export class CrudEncuestaPage implements OnInit {
  pregunta = "";
  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
  }
  agregarPregunta(){
    this.modalCtrl.dismiss({titulo:this.pregunta});
  }
}
