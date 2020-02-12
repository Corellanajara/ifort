import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { ImportarPageEvaluacion } from './importar/importar.page';
import { NotificacionesService } from '../_servicios/encuestas.service';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {
  notificaciones = [];
  public verAgregar = false;
  private usuarios = [];
  notificacion = {id:'',titulo : '',descripcion:''};
  mensaje = "";
  sucursal = "";
  indice = 0;
  puntos = 0;
  pasos = [];
  inputs = [];
  porcentaje = 0;
  jerarquia = [];
  arbol = [];
  nodo : any;
  count : number = 0;
  constructor(private toastController : ToastController,
  private alertController :AlertController,
  private nService : NotificacionesService,
  private userService : UserService,
  private modalCtrl : ModalController) { }

  ngOnInit() {
    this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    try {
      this.arbol = JSON.parse(this.arbol);
    } catch (error) {
        console.log(error)
    }

    console.log(this.arbol);

    this.userService.listar().subscribe(usuarios=>{
      console.log(usuarios);
      this.usuarios = usuarios;
    })
    this.traerDatos(false);
  }
  traerDatos(evento){
    this.nService.listar().subscribe(datos=>{
      console.log(datos);
      this.notificaciones = datos;
      if(evento){
        evento.target.complete();
      }
    })
  }
  async confirmar(){
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA NOTIFICACIÓN</strong>!!!',
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
            this.guardarNotificacion();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();

  }
  redefinirnotificacion(){
    this.notificacion = {id:'',tiitulo : ''};
  }
  guardarNotificacion(){
    this.nService.insertar(this.notificacion).subscribe(data=>{
      console.log(data);
      this.traerDatos(false);
      this.notificacion = {id:'',titulo : '',descripcion:''};
    })
  }
  visualizar(notificacion,slide){
    this.notificacion = notificacion;
    slide.close()
  }
  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    if(typeof(this.arbol != 'object') ){
      this.arbol = JSON.parse(this.arbol);
    }
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
  enviarnotificacion(){
    for(let i = 0 ; i < this.usuarios.length; i++){
      let usuario = this.usuarios[i];
      var asignado = undefined;
      if(usuario.asignado && usuario.asignado.length > 0){
        asignado = usuario.asignado[0];
        if(this.encontrarEnNodo(asignado,this.nodo)){
          console.log("este usuario existe en el nodo o subsecuentes",usuario);
          usuario.password = undefined;
          if(!usuario.notificaciones){
            usuario.notificaciones = [];
          }
          usuario.notificaciones.push(this.notificacion);

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
          })
        }
      }
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
      message: 'Las Notificaciones han sido asignadas',
      duration: 2000
    });
    toast.present();
  }

}
