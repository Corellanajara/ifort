import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.page.html',
  styleUrls: ['./respuesta.page.scss'],
})
export class RespuestaPage implements OnInit {
  titulo : any;
  descripcion : any;
  valor : any;
  tipo : any;
  min : any;
  max : any;
  noOcultar  = false;
  constructor(
    private popoverController:PopoverController,
    private navParams:NavParams) {
    this.titulo = navParams.get('titulo');
    this.tipo = navParams.get('tipo');
    if(navParams.get('descripcion')){
        this.descripcion = navParams.get('descripcion');
    }
    if(navParams.get('descripcion')){
      this.valor = navParams.get('descripcion');
    }
    if(navParams.get('min')){
      this.min = navParams.get('min');
    }
    if(navParams.get('max')){
      this.max = navParams.get('max');
    }
    if(navParams.get('noOcultar')){
      this.noOcultar = navParams.get('noOcultar');
    }

  }
  guardar(){
    this.popoverController.dismiss({valor:this.valor})
  }
  ngOnInit() {
  }
}
