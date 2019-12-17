import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  pregunta = "";
  tipo = "";
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  validarValores(min,max){
    if(min < 0){
      return false;
    }
    if(min < max){
      return true;
    }
    return false;
  }
  agregarPregunta(){
    let tipoPregunta = {titulo:this.pregunta,tipo:this.tipo};
    this.modalCtrl.dismiss(tipoPregunta);
  }
}
