import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  indicador = "";
  categoria = "";
  tipo = "";
  min : any;
  max : any;
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
  agregarIndicador(){
    var tipoPregunta = {};
    if(this.tipo == 'Rango'){
      tipoPregunta = {min : this.min,max:this.max ,titulo:this.indicador,tipo:this.tipo , categoria : this.categoria };
    }else{
      tipoPregunta = {titulo:this.indicador,tipo:this.tipo , categoria : this.categoria};
    }
    this.modalCtrl.dismiss(tipoPregunta);
  }
}
