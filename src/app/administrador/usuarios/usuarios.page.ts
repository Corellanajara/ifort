import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController, AlertController } from '@ionic/angular';

import { UserService } from '../../_servicios/user.service';
import { ExportExcelService } from '../../_servicios/export-excel.service';

import { PermisosPage } from './permisos/permisos.page';
import { AsignarPage } from './asignar/asignar.page';
import { ImportarPage } from './importar/importar.page';
import { Location } from '@angular/common';
import { Events,ToastController } from '@ionic/angular';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ProductosPage } from './productos/productos.page';

// Definir modelo usuario


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios = [];
  usuariosFiltrados = []
  public formularioUsuario: FormGroup;
  usuarioVacio = {id:'',firstName:'',lastName:'',email:'',password:'',rut:'',phone:'',empresaId : ''};
  usuario = {id:'',firstName:'',lastName:'',email:'',password:'',rut:'',phone:'',empresaId : ''};
  public tipo = "password";
  public verAgregar = false;
  buscar : string ;
  constructor(
    public ete: ExportExcelService,
    public toastController: ToastController,
    private alertController : AlertController,
    private events:Events,
    private location:Location,
    private modalCtrl : ModalController,
    private userService : UserService) { }
  log(){
    console.log(this.formularioUsuario);
  }
  filtrarUsuarios(){
    this.usuariosFiltrados = [];
    this.usuarios.map(usuario=>{
      for(var indice in usuario){
        var encontrado = false;
        if(typeof(usuario[indice]) == "string" && !encontrado){
          if(usuario[indice].toLowerCase().includes(this.buscar.toLowerCase())){
            this.usuariosFiltrados.push(usuario);
            encontrado = true;
            break;
          }
        }
        if(indice=="asignado" && !encontrado){
          var asignados = usuario[indice];
          for(var asignado of asignados){
            if(asignado.name.toLowerCase().includes(this.buscar.toLowerCase())){
              this.usuariosFiltrados.push(usuario);
              encontrado = true;
              break;
            }
          }
        }

      }
    })
  }
  async presentToast(Mensaje) {
    const toast = await this.toastController.create({
      message: Mensaje,
      duration: 2000
    });
    toast.present();
  }
  async abrirExportar() {
    const alert = await this.alertController.create({      
      header: 'Quieres exportar!',
      message: 'Va a generar un <strong>excel</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Exportar',
          handler: () => {
            this.generarExcel();
          }
        }
      ]
    });

    await alert.present();
  }
  generarExcel(){
    console.log(this.usuarios);
    var data = [];
    
    this.usuarios.map(usuario=>{
      var asignados = "Sin asignaciones";
      if(usuario.asignado && usuario.asignado.length > 0){
        asignados = "";
        for(var asignado of usuario.asignado){
          asignados += " ";
          asignados += asignado.name
        }
      }      
      let obj = {Nombres : usuario.firstName , Apellidos : usuario.lastName,Correo:usuario.email,Asignados:asignados};
      data.push(obj);
    })

    var dataForExcel = [];   
    data.map(row=>{
      dataForExcel.push(Object.values(row))
    })    

    let reportData = {
      title: 'Usuarios registrados',
      data: dataForExcel,
      headers: Object.keys(data[0])
    }

    this.ete.exportExcel(reportData);
  }
  validar(rut) {
      // Despejar Puntos
      var valor = rut.replace('.','');
      while(valor.indexOf('.') != -1){
        valor = valor.replace('.','');
      }
      // Despejar Guión
      valor = valor.replace('-','');

      // Aislar Cuerpo y Dígito Verificador
      var cuerpo = valor.slice(0,-1);
      var dv = valor.slice(-1).toUpperCase();

      // Formatear RUN
      rut = cuerpo + '-'+ dv

      // Si no cumple con el mínimo ej. (n.nnn.nnn)
      if(cuerpo.length < 7) { alert("Rut incompleto");}

      // Calcular Dígito Verificador
      var suma = 0;
      var multiplo = 2;

      // Para cada dígito del Cuerpo
      for(let i=1;i<=cuerpo.length;i++) {

          // Obtener su Producto con el Múltiplo Correspondiente
          var index = multiplo * valor.charAt(cuerpo.length - i);

          // Sumar al Contador General
          suma = suma + index;

          // Consolidar Múltiplo dentro del rango [2,7]
          if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }

      }

      // Calcular Dígito Verificador en base al Módulo 11
      var dvEsperado = 11 - (suma % 11);

      // Casos Especiales (0 y K)
      dv = (dv == 'K')?10:dv;
      dv = (dv == 0)?11:dv;

      // Validar que el Cuerpo coincide con su Dígito Verificador
      if(dvEsperado != dv) {
        alert("RUT Inválido");
      }

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
      password : new FormControl ('',Validators.required),
      rut : new FormControl('',Validators.required),
      phone : new FormControl('',Validators.required)
    });
    this.traerUsuarios(false);

  }

  async abrirImportar(){

    const modal = await this.modalCtrl.create({
      component : ImportarPage,
      cssClass : 'modals'
    })
    modal.onDidDismiss().then(modal=>{
      console.log("datos de importar usuarios",modal);
      if(modal.data){
          console.log(modal)
      }
    });
    return await modal.present();
  }
  async abrirProductos(usuario,slide){
    slide.close();
    console.log(usuario);
    const modal = await this.modalCtrl.create({
      component : ProductosPage,
      cssClass : 'modals',
      componentProps: {
        'productos': usuario.canjeables,
        'usuario' : usuario.firstName +" "+usuario.lastName
      }
    })
    modal.onDidDismiss().then(modal=>{
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
      this.usuariosFiltrados = usuarios;
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
      console.log("datos de permisos de usuario",modal);
      if(modal.data){
        let id = sessionStorage.getItem('userId');
        usuario.menus = modal.data;
        usuario.password = undefined;
        if(usuario.id == id){
          this.events.publish('user:login', usuario.menus);
          sessionStorage.setItem('menus',JSON.stringify(usuario.menus));
        }
          usuario.password = undefined;
          console.log("usuario a actualizar",usuario);
          this.userService.actualizar(usuario.id,usuario).subscribe(res=>{
            console.log(res);
          })
      }


    });
    return await modal.present();
  }
  public actualizarUsuario(){
    this.userService.actualizar(this.usuario.id,this.usuario).subscribe(res=>{
      this.presentToast("Usuario actualizado satisfactoriamente");
      this.usuario = this.usuarioVacio;
    })
  }
  public guardarUsuario(){
    this.usuario.id = ""+(this.usuarios.length + 1 );
    this.userService.insertar(this.usuario).subscribe(usuario =>{
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
          text: 'Aceptar',
          handler: () => {
            this.guardarUsuario();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async borrar(usuario) {
    const alert = await this.alertController.create({
      header: 'Confirmar Elminación!',
      message: 'Estas a punto de <br><strong>BORRAR UN USUARIO</strong>!!!',
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
            this.borrarUsuario(usuario);
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  borrarUsuario(usuario){
    this.userService.borrar(usuario.id).subscribe(res=>{
      this.traerUsuarios(false);
    })
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
        let id = sessionStorage.getItem('userId');
        //usuario.asignado = modal.data;
        var d = modal.data;
        var encontrado = false;
        usuario.asignado.map(asignado=>{
          if(asignado.id == d.id && asignado.name == d.name ){
            encontrado = true;
          }
        });
        if(!encontrado){
          usuario.asignado.push(modal.data);
          usuario.password = undefined;
          console.log("usuario a actualizar",usuario);
          this.userService.actualizar(usuario.id,usuario).subscribe(res=>{
            console.log(res);
          })
        }
      }
    });
    return await modal.present();
  }
  public visualizar(usuario,slide){
    usuario.password = undefined;
    this.usuario = usuario;
    slide.close();
  }
  dismiss() {
      this.location.back();
  }
}
