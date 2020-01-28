import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-canjeables',
  templateUrl: './canjeables.page.html',
  styleUrls: ['./canjeables.page.scss'],
})
export class CanjeablesPage implements OnInit {
  productos = [{titulo:"Silla bonita",puntos:1500},{titulo:"Silla fea",puntos:1200},{titulo:"Silla",puntos:3500}]
  clicked = []
  usuario = JSON.parse(sessionStorage.getItem('usuario'));
  constructor(public userService : UserService,public alertController: AlertController) {
    let userId = sessionStorage.getItem('userId');
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
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
