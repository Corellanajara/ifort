import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.page.html',
  styleUrls: ['./asignar.page.scss'],
})
export class AsignarPage implements OnInit {
  jerarquia = [];
  arbol = [];
  indice = 0;
  pasos = [];
  sucursal = 0;
  constructor(private modalCtrl:ModalController) {
    this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    console.log(this.jerarquia);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }
  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    for(let i = 0 ; i < this.pasos.length;i++){
      this.navegaNodo(this.arbol[this.pasos[i]],this.pasos[i] ,false);
    }
    this.mensaje = "Seleciona ";    
  }
  public seleccionaNodo(nodo,indice){
    console.log("hice click en selecciona",nodo);
    this.mensaje = "Seleccionado "+nodo.name;
    this.sucursal = nodo.id;
  }
  navegaNodo(nodo,indice,aumentaConteo){
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
