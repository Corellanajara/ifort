import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  encuesta = {titulo:'',descripcion:'',preguntas:[],resultados:[],revisado:false};
  estrellas = [];
  revisados = [];
  constructor(private modalCtrl:ModalController,private navParams : NavParams) {
    this.encuesta = navParams.get('encuesta');
    this.estrellas = this.loqueobtengodebd();

    if(this.encuesta.resultados){
      for(let i = 0 ; i < this.estrellas.length ; i++){
        var estrellas = this.estrellas[i];
        var cantidad = this.encuesta.resultados[i];
        for(let j = 0 ; j < estrellas.length;j++){
          if(j < cantidad){
            estrellas[j].class="md hydrated cambiador";
          }
        }
      }
    }

   }

  ngOnInit() {
  }



  loqueobtengodebd(){
    var arr = [];
    for( let i = 0 ; i < this.encuesta.preguntas.length; i++){
      var estrellas = [{"id":"1","class":""},{"id":"2","class":""},{"id":"3","class":""},{"id":"4","class":""},{"id":"5","class":""}];
      arr.push(estrellas);
    }
    return arr;
  }
  complete(){
    if(this.revisados.length == this.encuesta.preguntas.length){
      return true;
    }
    return false;
  }
  cambiarColor(indice,i){
    if(this.revisados.indexOf(indice) == -1){
      this.revisados.push(indice);
    }
    this.porDefecto(indice);
    let estrellasActuales = this.estrellas[indice];
    for(let e = 0; e < (i+1); e++){
      estrellasActuales[e].class="md hydrated cambiador";
    }
    this.estrellas[indice] = estrellasActuales;
  }

  porDefecto(indice){
    for(let i = 0; i < this.estrellas[indice].length; i++){
      let estrella = this.estrellas[indice][i];
      estrella.class = "md hydrated";
      this.estrellas[indice][i] = estrella;
    }
  }
  enviarEncuesta(){
    console.log(this.estrellas);
    var cantidades = []
    let i = 0;
    let indice = 0;
    for(let estrellas of this.estrellas){
      for(let e of estrellas){
        if(e.class.includes("cambiador")){
            i++;
        }
      }
      cantidades.push(i);
      i = 0;
    }
    console.log(cantidades);
    this.encuesta.revisado = true;
    this.encuesta.resultados = cantidades;
    this.modalCtrl.dismiss(this.encuesta);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  easteregg(){
    console.log('Ricardo Mendez: lower camel case es muy importante para las funciones, no sabes hacer un ni un for, porfavor sigueme en linkedin, principios solid, principio de unica responsabilidad y sustitucion de liskov');
  }
}
