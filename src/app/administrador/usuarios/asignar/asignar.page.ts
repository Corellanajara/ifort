import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.page.html',
  styleUrls: ['./asignar.page.scss'],
})
export class AsignarPage implements OnInit {
  jerarquia = [];
  usuario : any;
  arbol = [];
  indice = 0;
  pasos = [];
  mensaje = "";
  sucursal = 0;
  nodo : any;
  count : number = 0;
  constructor(
    private navParams : NavParams,
    private modalCtrl:ModalController) {
    this.usuario = navParams.get('usuario');
    this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    if(typeof(this.arbol) != 'object' ){
      this.arbol = JSON.parse(this.arbol);
    }
    console.log(this.jerarquia);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.nodo = undefined;
  }
  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    if(typeof(this.arbol ) != 'object' ){
      this.arbol = JSON.parse(this.arbol);
    }
    for(let i = 0 ; i < this.pasos.length;i++){
      this.navegaNodo(this.arbol[this.pasos[i]],this.pasos[i] ,false);
    }
    this.nodo = undefined;
    this.mensaje = "Seleciona ";
  }
  public asignar(){
    this.modalCtrl.dismiss(this.nodo);
  }
  public seleccionaNodo(nodo,indice){
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        console.log("hice click en selecciona",nodo);
        this.mensaje = "Seleccionado "+nodo.name;
        this.nodo = nodo;
        this.sucursal = nodo.id;
      }if(this.count > 1){
        this.count = 0;
        this.navegaNodo(nodo,indice,true);
      }
    }, 250);

  }
  navegaNodo(nodo,indice,aumentaConteo){
    console.log(this.arbol);
    if(this.arbol[indice].childrens.length > 0){
      console.log("navegado")
      this.indice++;
      this.arbol = this.arbol[indice].childrens;
      if(aumentaConteo){
        this.pasos.push(indice);
      }
      console.log("indice",this.pasos);
    }else{
      this.seleccionaNodo(nodo,indice);
    }
  }

}
