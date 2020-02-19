import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { PreguntaPage } from './pregunta/pregunta.page';
import { ImportarPageEvaluacion } from './importar/importar.page';
import {  EvaluacionesService } from '../_servicios/evaluaciones.service';
import { UserService } from '../_servicios/user.service';

interface Evaluacion {
  nombre:string,
  sigla:string,
  tipo:string,
  indicadores : Array<any>,
  fecha: Date,
  id: string
}

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {


  public tiposDeEvaluacion = ["Cuestionario","Evaluación"];

  public evaluacion : Evaluacion = {sigla:'',nombre:"",tipo:"",indicadores : [],id:'',fecha:new Date()};
  public verAgregar = false;
  public activos = [];
  private usuarios = [];
  mensaje = "";
  sucursal = "";
  indice = 0;
  puntos = 0;
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
      console.log(sessionStorage);
      this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
      var arbol = JSON.parse(sessionStorage.getItem('jerarquia')).toString();
      this.arbol = JSON.parse(arbol);

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
    console.table(this.evaluacion);
    this.evaluacionesService.insertar(this.evaluacion).subscribe(data=>{
      console.log(data);
    })
    this.evaluaciones.push(this.evaluacion);
    this.evaluacion = {sigla:'',nombre:"",indicadores : [],tipo:"",id:"",fecha:new Date()};
  }
  public actualizarEvaluacion(){
    this.evaluacionesService.actualizar(this.evaluacion.id,this.evaluacion).subscribe(data=>{
      console.log(data);
    })
    this.redefinirEvaluacion();
  }
  async abrirPreguntas() {
    console.log(this.evaluacion);
    const modal = await this.modalCtrl.create({
      component: PreguntaPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("indicadores conseguidas",modal.data);
          var indicadores = [];
          for(let key in modal.data){
            var datos = modal.data[key];
            for(let i = 0 ; i  < datos.length ; i++){
              datos[i].categoria = key;
              indicadores.push(datos[i]);
            }
          }
          this.evaluacion.indicadores = indicadores;
      }
      console.log("indicadores conseguidas",modal.data);
    });
    return await modal.present();
  }
  async confirmar() {
    console.log(this.evaluacion);
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
  async alertBorrar(ev) {
    console.log(this.evaluacion);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>BORRAR UNA EVALUACIÓN</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.borrarEvaluacion(ev);
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  eliminar(ev,slide){
    this.alertBorrar(ev);
    slide.close()
  }
  borrarEvaluacion(ev){
    this.evaluacionesService.borrar(ev.id).subscribe(dato=>{
      console.log(dato);
      this.ngOnInit();
    })
  }
  visualizar(evaluacion,slide){
    console.log(evaluacion);
    this.evaluacion = evaluacion;
    slide.close()
  }
  traerDatos(evento){
    let userId = sessionStorage.getItem('userId');
    this.evaluacionesService.listar().subscribe(evaluaciones => {
      this.evaluaciones = evaluaciones;
      if(evento){
        evento.target.complete();
      }
    });
  }
  async abrirImportar(){
    const modal = await this.modalCtrl.create({
      component: ImportarPageEvaluacion,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    var self = this;
    modal.onDidDismiss().then(modal=>{
      console.log(modal.data);
      var timestamp = new Date();
      var evaluacion = undefined;
      if(modal.data){
        evaluacion = {sigla:modal.data.sigla,nombre:modal.data.nombre,categorias:modal.data.categorias,tipo:"",id:"",fecha:timestamp};
        console.log(evaluacion);
        var indicadores = [];
        for(let key in modal.data.categorias){
          var datos = modal.data.categorias[key];
          for(let i = 0 ; i  < datos.length ; i++){
            datos[i].categoria = key;
            indicadores.push(datos[i]);
          }
        }
        let ev = {sigla : modal.data.sigla, nombre : modal.data.nombre , indicadores : indicadores,fecha:timestamp};


        this.evaluacionesService.insertar(ev).subscribe(data=>{
          console.log(data);
          self.ngOnInit();
        })
      }
      /*
      let evaluacion = modal.data.evaluacion;
      this.evaluacionesService.insertar(evaluacion).subscribe(data=>{
        console.log(data);
      })
      */

    });
    return await modal.present();
  }
  redefinirEvaluacion(){
    this.evaluacion = {sigla:'',nombre:"",indicadores : [],tipo:"",id:"",fecha:new Date()};
  }

  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    var arbol = JSON.parse(sessionStorage.getItem('jerarquia')).toString();
    this.arbol = JSON.parse(arbol);
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
    console.log(evaluaciones);
    for(let indice = 0 ; indice < evaluaciones.length; indice++){
      for(let i = 0 ; i < this.usuarios.length; i++){
        let usuario = this.usuarios[i];
        var asignado = undefined;
        if(usuario.asignado && usuario.asignado.length > 0){
          asignado = usuario.asignado[0];
          if(this.encontrarEnNodo(asignado,this.nodo)){
            console.log("este usuario existe en el nodo o subsecuentes",usuario);
            usuario.password = undefined;
            usuario.evaluaciones.push(evaluaciones[indice]);

          }
        }
      }
    }
    var usuariosCambiados = [];
    for(let  i = 0 ; i < this.usuarios.length; i++){
      let usuario = this.usuarios[i];

      var asignado = undefined;
      if(usuario.asignado && usuario.asignado.length > 0){
        asignado = usuario.asignado[0];
        if(this.encontrarEnNodo(asignado,this.nodo)){
          usuariosCambiados.push(usuario);
          this.userService.actualizar(usuario.id,usuario).subscribe(data=>{
            console.log(usuario);
            this.mostrarToast();
          })
        }
      }
    }
    console.log(usuariosCambiados);



  }
  encontrarEnNodo(asignado,nodo){
    var quedanHijos = true;
    if(!nodo.childrens){
      quedanHijos = false;
    }
    if(JSON.stringify(asignado)==JSON.stringify(nodo)){
      return true;
    }else{
      console.log(nodo);
      if(!quedanHijos){
        return false;
      }else{
          for(let i = 0 ; i < nodo.childrens.length;i++){
            let nuevoNodo = nodo.childrens[i];
            if(JSON.stringify(asignado)==JSON.stringify(nuevoNodo)){
              return true;
            }
          }
      }
      return false;

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
        let puntos = (this.puntos * this.inputs[activo] )/ 100;
        let ifortEv = {instrumento:this.evaluaciones[activo],porcentaje:this.inputs[activo],puntos:puntos,estado:0,fecha:timestamp}

        evaluaciones.push(ifortEv);
      }
    }
    this.asignarEvaluacion(evaluaciones);

  }
  getIndicadores(obj){
    if(obj.length > 0){
      return obj.length;
    }
    var cantidad = 0 ;
    for(let key in obj){
      let categoria = obj[key];
      for(let i = 0 ; i < categoria.length ; i++){
        cantidad += 1;
      }
    }
    return cantidad;
  }

}
