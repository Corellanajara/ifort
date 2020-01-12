import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.page.html',
  styleUrls: ['./responder.page.scss'],
})
export class ResponderPage implements OnInit {

  encuestas = [];
  estrellas = [];

  constructor() {
    this.encuestas = this.encuestasbd();
    this.estrellas = this.loqueobtengodebd();
    console.log(this.encuestas);
   }

  ngOnInit() {
  }

  encuestasbd(){
    return {"titulo":"Puestos de trabajo","descripcion":"Este cuestionario tiene el unico fin de analizar la forma en el que el personal percibe el ambiente laboral","preguntas":["¿La iluminación es adecuada?","¿La temperatura es adecuada?","¿El nivel de ruido es adecuado?","¿Están las instalaciones limpias?","¿Están los asesos limpios?"]}
  }

  loqueobtengodebd(){
      return [{"id":"1","class":""},{"id":"2","class":""},{"id":"3","class":""},{"id":"4","class":""},{"id":"5","class":""}]
  }

  cambiarColor(indice){
    console.log(this.estrellas[indice]);
    this.porDefecto();

    if(this.estrellas[indice].class == "md hydrated cambiador"){
       this.estrellas[indice].class = "md hydrated";
    }
    else{
        this.estrellas[indice].class = "md hydrated cambiador";
    }
    //this.badge.style.transform = "background: red";
    console.log(this.estrellas[indice]);
    for(let e = 0; e < indice; e++){
      console.log(e);
      this.estrellas[e].class="md hydrated cambiador";
    }

  }

  porDefecto(){
    for(let i = 0; i < this.estrellas.length; i++){
      let estrella = this.estrellas[i];
      estrella.class = "md hydrated";
      this.estrellas[i] = estrella;
    }
  }

  easteregg(){
    console.log('Ricardo Mendez: lower camel case es muy importante para las funciones, no sabes hacer un ni un for, porfavor sigueme en linkedin, principios solid, principio de unica responsabilidad y sustitucion de liskov');
  }
}
