import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../_servicios/user.service';
import { ProductoService } from '../_servicios/encuestas.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-canjeables',
  templateUrl: './canjeables.page.html',
  styleUrls: ['./canjeables.page.scss'],
})
export class CanjeablesPage implements OnInit {
  productos = [{descripcion : '',titulo:"Silla bonita",puntos:1500},{descripcion : '',titulo:"Silla fea",puntos:1200},{descripcion : '',titulo:"Silla",puntos:3500}]
  clicked = []
  imagenes = []
  usuario = JSON.parse(sessionStorage.getItem('usuario'));
  constructor(public sanitization : DomSanitizer,public productoService:ProductoService,public userService : UserService,public alertController: AlertController) {
    let userId = sessionStorage.getItem('userId');
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    productoService.listar().subscribe(datos=>{
      for(let i = 0 ; i < datos.length;i ++){
        this.imagenes.push(sanitization.bypassSecurityTrustStyle(`url(${datos[i].url})`));
      }
      this.productos = datos;
    })
    userService.gathering(userId).subscribe( datos => {
      this.usuario = datos;
    })
    console.log(this.usuario);
   }

  async presentAlert(i,prod) {
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
              console.log(datos);
              sessionStorage.setItem('usuario',JSON.stringify(datos));
            })
          }
        }
      ]
    });

    await alert.present();
  }
  ngOnInit() {
    for(let i = 0 ; i < this.productos.length ; i++){
      this.clicked[i] = "";
    }
  }

  cambiarEstilo(i){
      if(this.clicked[i] == ""){
        this.clicked[i] = "clicked";
      }else{
        this.clicked[i] = "";
      }
  }

}
