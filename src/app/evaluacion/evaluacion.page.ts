import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { PreguntaPage } from './pregunta/pregunta.page';
import { ImportarPageEvaluacion } from './importar/importar.page';
import {  EvaluacionesService } from '../_servicios/evaluaciones.service';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {


  public tiposDeEvaluacion = ["Cuestionario","Evaluación"];

  public evaluacion = {nombre:"",descripcion:'',tipo:"",indicadores : [],id:'',fecha:new Date()};
  public verAgregar = false;
  public activos = [];
  private usuarios = [];
  pasos = [];
  evaluaciones = [];
  inputs = [];
  porcentaje = 0;
  jerarquia = [];
  arbol = [];
  nodo : any;
  count : number = 0;
  constructor(
    private toastController : ToastController,
    private userService : UserService,
    private evaluacionesService :  EvaluacionesService,
    private alertController :AlertController,
    private modalCtrl : ModalController
    ){
      this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
      this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
      console.log(this.arbol);
      userService.listar().subscribe(usuarios=>{
        console.log(usuarios);
        this.usuarios = usuarios;
      })
    }

  ngOnInit() {
    this.evaluacionesService.listar().subscribe(evaluaciones => {
      this.evaluaciones = evaluaciones;
    });
  }
  public recalcular(){
    var total = 0;
    for(let i = 0 ; i <this.activos.length;i++){
      if(this.activos[i]){
        let cantidad = parseInt((this.inputs[i]||0));
        total += cantidad;

      }
    }
    this.porcentaje = total;
  }
  public cantidadInputs(cantidad){
    let dif = cantidad.length - this.inputs.length;
    for(let i = 0 ; i < dif ; i++){
      this.inputs.push("");
      this.activos.push(false);
    }
    return cantidad;
  }
  public guardarEvaluacion(){
    //this.evaluacion.id = ""+(this.evaluaciones.length + 1);
    this.evaluacionesService.insertar(this.evaluacion).subscribe(data=>{
      console.log(data);
    })
    this.evaluaciones.push(this.evaluacion);
    this.evaluacion = {nombre:"",descripcion:'',indicadores : [],tipo:"",id:""};
  }
  public actualizarEvaluacion(){
    this.evaluacionesService.actualizar(this.evaluacion.id,this.evaluacion).subscribe(data=>{
      console.log(data);
    })
    this.redefinirEvaluacion();
  }
  async abrirPreguntas() {
    const modal = await this.modalCtrl.create({
      component: PreguntaPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
          this.evaluacion.indicadores = modal.data;
      }
      console.log("indicadores conseguidas",modal);
    });
    return await modal.present();
  }
  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA EVALUACIÓN</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.guardarEvaluacion();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  visualizar(evaluacion,slide){
    console.log(evaluacion);
    this.evaluacion = evaluacion;
    slide.close()
  }
  async abrirImportar(){
    const modal = await this.modalCtrl.create({
      component: ImportarPageEvaluacion,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("datos",modal);
    });
    return await modal.present();
  }
  redefinirEvaluacion(){
    this.evaluacion = {nombre:"",descripcion:'',indicadores : [],tipo:"",id:""};
  }

  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    for(let i = 0 ; i < this.pasos.length;i++){
      this.navegaNodo(this.arbol[this.pasos[i]],this.pasos[i] ,false);
    }
    this.nodo = undefined;
    this.mensaje = "Seleciona ";
  }

  public seleccionaNodo(nodo,indice){
    console.log("selecciona nodo");
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        console.log("hice click en selecciona",nodo);
        this.mensaje = "Seleccionado "+nodo.name;
        this.nodo = nodo;
        this.sucursal = nodo.id;
      }if(this.count > 1){
        console.log("hice click en navega",nodo);
        this.count = 0;
        this.navegaNodo(nodo,indice,true);
      }
    }, 250);

  }
  navegaNodo(nodo,indice,aumentaConteo){
    console.log(this.arbol);
    console.log(indice);

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
  revisarActivoVacio(){
    for(let i = 0 ; i <this.activos.length;i++){
      if(this.activos[i]){
        let cantidad = parseInt((this.inputs[i]||0));
        if(cantidad == 0){
          return true;
        }
      }
    }
    return false;
  }
  asignarEvaluacion(evaluaciones){
    for(let indice = 0 ; indice < evaluaciones.length; indice++){
          for(let i = 0 ; i < this.usuarios.length; i++){
            let usuario = this.usuarios[i];
            usuario.evaluaciones.push(evaluaciones[indice]);
            usuario.password = undefined;
          }
    }
    for(let i = 0 ; i < this.usuarios.length; i++){
      let usuario = this.usuarios[i];
      this.userService.actualizar(usuario.id,usuario).subscribe(data=>{
        console.log(data);
        this.mostrarToast();
      })
    }
  }
  async mostrarToast() {
    const toast = await this.toastController.create({
      message: 'Los instrumentos han sido asignados',
      duration: 2000
    });
    toast.present();
  }
  enviarEvaluacion(){
    var evaluaciones = []
    let timestamp  = new Date().getTime();
    for(let activo = 0 ; activo < this.activos.length;activo++){
      if(this.activos[activo]){
        let ifortEv = {instrumento:this.evaluaciones[activo],porcentaje:this.inputs[activo],estado:0,fecha:timestamp}
        console.log(ifortEv);
        evaluaciones.push(ifortEv);
      }
    }
    this.asignarEvaluacion(evaluaciones);

  }

}
