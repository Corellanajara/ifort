import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../_servicios/user.service';
import { ProductoService } from '../_servicios/encuestas.service';
import { CorreosService } from '../_servicios/correos.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-canjeables',
  templateUrl: './canjeables.page.html',
  styleUrls: ['./canjeables.page.scss'],
})
export class CanjeablesPage implements OnInit {
  productos = [{descripcion : '',titulo:"Silla bonita",puntos:1500},{descripcion : '',titulo:"Silla fea",puntos:1200},{descripcion : '',titulo:"Silla",puntos:3500}]
  clicked = [];
  imagenes = [];
  estados = [];
  usuario = JSON.parse(sessionStorage.getItem('usuario'));
  constructor(private localNotifications: LocalNotifications,public correosService : CorreosService ,public sanitization : DomSanitizer,public productoService:ProductoService,public userService : UserService,public alertController: AlertController) {
    let userId = sessionStorage.getItem('userId');
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    productoService.listar().subscribe(datos=>{
      for(let i = 0 ; i < datos.length;i ++){
        this.imagenes.push(sanitization.bypassSecurityTrustStyle(`url(${datos[i].url})`));
        this.estados.push(false);
      }
      this.productos = datos;
    })
    userService.gathering(userId).subscribe( datos => {
      this.usuario = datos;
    })
    console.log(this.usuario);
   }

  async presentalert(i,prod) {
    const alert = await this.alertController.create({
      header: '¿Deseas canjear?',
      subHeader: 'Estas a punto de canjear este producto',
      message: 'Al ser canjeado el producto se te van a descontar los puntos necesarios para conseguirlo.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.enviarCorreo(prod);
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Canjear',
          handler: () => {
            this.cambiarEstilo(i);
            this.usuario.puntos = this.usuario.puntos - prod.puntos;
            this.usuario.password = undefined;
            if(!this.usuario.canjeables){
              this.usuario.canjeables = [];
            }
            this.usuario.canjeables.push(prod);
            this.userService.actualizar(this.usuario.id,this.usuario).subscribe(datos=>{
              this.enviarCorreo(prod);
            })
          }
        }
      ]
    });

    await alert.present();
  }
  enviarCorreo(prod){
    var self = this;;

    this.userService.listar().subscribe(datos=>{
      var admin = datos[0];
      var email = admin.email;
      var usuario = this.usuario;
      var emailUsuario = usuario.email;
      var mAdmin = "El usuario "+ usuario.firstName +" "+usuario.lastName+ " ha canjeado "+prod.titulo;
      self.correosService.insertar(email,"Se ha canjeado un item",mAdmin).subscribe(datos=>{
      });
      var mUsuario = "Has canjeado "+prod.titulo;
      self.correosService.insertar(emailUsuario,"Has canjeado un item",mUsuario).subscribe(datos=>{
      });
      self.notificacion(prod);
    })
  }
  notificacion(prod){
    this.localNotifications.schedule({
      text: '¡Has canjeado '+prod.titulo+'!',
     //trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });

  }
  ngOnInit() {
    for(let i = 0 ; i < this.productos.length ; i++){
      this.clicked[i] = "";
    }
  }

  cambiarEstilo(i){
      this.estados[i] = !this.estados[i];
  }

}
