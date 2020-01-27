import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  encuestas = {titulo:'',descripcion:'',preguntas:[]};
  estrellas = [];
  revisados = [];
  constructor() {
    this.encuestas = this.encuestasbd();
    this.estrellas = this.loqueobtengodebd();
   }

  ngOnInit() {
  }

  encuestasbd(){
    return {"titulo":"Puestos de trabajo","descripcion":"Este cuestionario tiene el unico fin de analizar la forma en el que el personal percibe el ambiente laboral","preguntas":["¿La iluminación es adecuada?","¿La temperatura es adecuada?","¿El nivel de ruido es adecuado?","¿Están las instalaciones limpias?","¿Están los asesos limpios?"]}
  }

  loqueobtengodebd(){
    var arr = [];
    for( let i = 0 ; i < this.encuestas.preguntas.length; i++){
      var estrellas = [{"id":"1","class":""},{"id":"2","class":""},{"id":"3","class":""},{"id":"4","class":""},{"id":"5","class":""}];
      arr.push(estrellas);
    }
    return arr;
  }
  complete(){
    if(this.revisados.length == this.encuestas.preguntas.length){
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

  easteregg(){
    console.log('Ricardo Mendez: lower camel case es muy importante para las funciones, no sabes hacer un ni un for, porfavor sigueme en linkedin, principios solid, principio de unica responsabilidad y sustitucion de liskov');
  }
}
