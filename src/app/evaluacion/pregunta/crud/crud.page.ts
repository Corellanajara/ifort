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
  editando = false;
  constructor(private navParams : NavParams, private modalCtrl:ModalController) {
    var indicador = navParams.get('pregunta');
    var key = navParams.get('key');

    if(indicador){
      this.editando = true;      
      this.tipo = indicador.tipo;
      this.indicador = indicador.titulo;
      this.categoria = key;
    }
  }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  actualizar(){
    var indicador = {tipo:this.tipo,indicador : this.indicador};
    this.modalCtrl.dismiss(indicador);
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
