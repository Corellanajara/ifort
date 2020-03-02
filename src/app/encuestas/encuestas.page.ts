import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { PreguntaEncuestaPage } from './pregunta/pregunta.page';
import { EncuestaService } from '../_servicios/encuestas.service';
import { UserService } from '../_servicios/user.service';
import { EscojerEncuestasPage } from './escojer/escojer.page';

interface Encuesta {
  titulo:string,
  preguntas : Array<any>,
  fecha: Date,
  id: string
}

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  constructor(
    private toastController : ToastController,
    private alertController :AlertController,
    private eService : EncuestaService,
    private userService : UserService,
    private modalCtrl : ModalController
  ) { }
  public encuesta : Encuesta = {titulo:'',preguntas : [],id:'',fecha:new Date()};
  public verAgregar = false;
  public activos = [];
  private usuarios = [];
  mensaje = "";
  sucursal = "";
  indice = 0;
  puntos = 0;
  pasos = [];
  encuestas : Array<Encuesta> = [];
  inputs = [];
  porcentaje = 0;
  jerarquia = [];
  arbol = [];
  nodo : any;
  count : number = 0;
  usuariosAsignados = [];

  ngOnInit() {
    this.traerDatos(false);
    this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
    var arbol = JSON.parse(sessionStorage.getItem('jerarquia')).toString();
    try {
        this.arbol = JSON.parse(arbol);
    } catch (error) {
        this.arbol = arbol;
    }

    console.log(this.arbol);
    this.userService.listar().subscribe(usuarios=>{
      console.log(usuarios);
      this.usuarios = usuarios;
    })
  }
  async elegirPersonas(){
    const modal = await this.modalCtrl.create({
      component: EscojerEncuestasPage,
      cssClass: 'modals',
      componentProps: {
        'usuarios': this.usuarios,
      }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log(modal.data);
        this.usuariosAsignados = modal.data;
      }
    });
    return await modal.present();
  }
  abrirAyuda(){
    alert("Para listar encuestas selecciona ");
  }
  visualizar(encuesta,slide){
    console.log(encuesta);
    this.encuesta = encuesta;
    slide.close()
  }
  redefinirEncuesta(){
    this.encuesta = {titulo:'',preguntas : [],id:"",fecha:new Date()};
  }
  async abrirPreguntas() {

    const modal = await this.modalCtrl.create({
      component: PreguntaEncuestaPage,
      cssClass: 'modals',
      componentProps: {
      'encuesta': this.encuesta,
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("preguntas conseguidas",modal.data);
        let encuesta = modal.data;
        this.encuesta = encuesta;
      }

    });
    return await modal.present();
  }

  getPreguntas(obj){
    if(!obj){
      return 0;
    }
    if(obj.length > 0){
      return obj.length;
    }
  }
  traerDatos(evento){

    this.eService.listar().subscribe(datos=>{
      this.encuestas = datos;
      console.log(this.encuestas);
      if(evento){
        evento.target.complete();
      }
    })

  }
  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA ENCUESTA</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.guardarEncuesta();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  public guardarEncuesta(){
    //this.evaluacion.id = ""+(this.evaluaciones.length + 1);
    this.eService.insertar(this.encuesta).subscribe(data=>{
      console.log(data);
    })
    this.encuesta = {titulo:'',preguntas : [],id:"",fecha:new Date()};
    this.traerDatos(false);
  }
  public actualizarEncuesta(){
    this.eService.actualizar(this.encuesta.id,this.encuesta).subscribe(data=>{
      console.log(data);
    })
    this.redefinirEncuesta();
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
  enviarEncuesta(){

      for(let i = 0 ; i < this.usuarios.length; i++){
        let usuario = this.usuarios[i];
        var asignado = undefined;
        if(usuario.asignado && usuario.asignado.length > 0){
          asignado = usuario.asignado[0];
          if(this.encontrarEnNodo(asignado,this.nodo)){
            console.log("este usuario existe en el nodo o subsecuentes",usuario);
            usuario.password = undefined;
            if(!usuario.encuestas){
              usuario.encuestas = [];
            }
            usuario.encuestas.push(this.encuesta);

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
            usuario.password = undefined;
            this.userService.actualizar(usuario.id,usuario).subscribe(data=>{
              console.log(usuario);
              this.mostrarToast();
              this.encuesta = {titulo:'',preguntas : [],id:'',fecha:new Date()};
            })
          }
        }
      }
      console.log(usuariosCambiados);

    }
    enviarEncuestaAsignados(){
      for(var usuario of this.usuariosAsignados){
        if(!usuario.encuestas){
          usuario.encuestas = [];
        }
        usuario.encuestas.push(this.encuesta);
        usuario.password = undefined;
        this.userService.actualizar(usuario.id,usuario).subscribe(data=>{
          console.log(usuario);
          this.mostrarToast();
          this.encuesta = {titulo:'',preguntas : [],id:'',fecha:new Date()};
        })
      }
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
        message: 'Las encuestas han sido asignadas',
        duration: 2000
      });
      toast.present();
    }
}
