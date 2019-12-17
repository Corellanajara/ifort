import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController, AlertController } from '@ionic/angular';
import { UserService } from '../../_servicios/user.service';
import { PermisosPage } from './permisos/permisos.page';
import { AsignarPage } from './asignar/asignar.page';
import { ImportarPage } from './importar/importar.page';
import { Location } from '@angular/common';
import { Events,ToastController } from '@ionic/angular';
import { FormControl, FormGroup,Validators } from '@angular/forms';

// Definir modelo usuario


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios = [];
  public formularioUsuario: FormGroup;
  usuarioVacio = {id:'',firstName:'',lastName:'',email:'',password:''};
  usuario = {id:'',firstName:'',lastName:'',email:'',password:''};
  public tipo = "password";
  public verAgregar = false;

  constructor(
    public toastController: ToastController,
    private alertController : AlertController,
    private events:Events,
    private location:Location,
    private modalCtrl : ModalController,
    private userService : UserService) { }
  log(){
    console.log(this.formularioUsuario);
  }
  async presentToast(Mensaje) {
    const toast = await this.toastController.create({
      message: Mensaje,
      duration: 2000
    });
    toast.present();
  }

/*
<input type="file" style="display: inline-block;" (change)="incomingfile($event)" placeholder="Upload file" accept=".xlsx">
<button type="button" class="btn btn-info" (click)="Upload()" >Upload</button>
*/

  ngOnInit() {
    this.formularioUsuario =  new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password : new FormControl ('',Validators.required)
    });
    this.traerUsuarios(false);

  }
  async abrirImportar(){

    const modal = await this.modalCtrl.create({
      component : ImportarPage,
      cssClass : 'modals'      
    })
    modal.onDidDismiss().then(modal=>{
      console.log(usuario);
      console.log("datos de importar usuarios",modal);
      if(modal.data){
          console.log(modal)
      }


    });
    return await modal.present();
  }
  public redifinirUsuario(){
    this.usuario = this.usuarioVacio;
  }
  public traerUsuarios(evento){
    this.userService.listar().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
      if(evento){
        evento.target.complete();
      }
    })
  }
  async abrirPermisos(usuario,slide){
    slide.close();
    const modal = await this.modalCtrl.create({
      component: PermisosPage,
      cssClass: 'modals',
      componentProps: {
      'usuario': usuario,
    }
    });

    modal.onDidDismiss().then(modal=>{
      console.log(usuario);
      console.log("datos de permisos de usuario",modal);
      if(modal.data){
          usuario.menus = modal.data;
          this.events.publish('user:login', usuario.menus);
          sessionStorage.setItem('menus',JSON.stringify(usuario.menus));
          usuario.password = undefined;
          this.userService.actualizar(usuario._id,usuario).subscribe(res=>{
            console.log(res);
          })
      }


    });
    return await modal.present();
  }
  public guardarUsuario(){
    this.usuario.id = ""+(this.usuarios.length + 1 );
    this.userService.insertar(this.usuario).subscribe(usuario =>{
      console.log(usuario);
      this.presentToast("Usuario creado satisfactoriamente");
      this.usuario = this.usuarioVacio;
    })
  }
  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN USUARIO</strong>!!!',
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
            this.guardarUsuario();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async asignar(usuario,slide){
    slide.close();
    const modal = await this.modalCtrl.create({
      component : AsignarPage,
      cssClass : 'modals',
      componentProps : {
        'usuario': usuario
      }
    })
    modal.onDidDismiss().then(modal=>{
      console.log(usuario);
      console.log("datos de asignacion de usuario",modal);
      if(modal.data){
          console.log(modal)
      }


    });
    return await modal.present();
  }
  public visualizar(usuario,slide){
    this.usuario = usuario;
    slide.close();
  }
  dismiss() {
      this.location.back();
  }
}
