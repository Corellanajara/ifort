import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { UserService } from '../../_servicios/user.service';
import { PermisosPage } from './permisos/permisos.page';
import { AsignarPage } from './asignar/asignar.page';
import { Location } from '@angular/common';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios = []
  constructor(private events:Events,private location:Location,private modalCtrl : ModalController,private userService : UserService) { }

  ngOnInit() {
    this.userService.listar().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
    })
  }
  async abrirPermisos(usuario){
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
  async asignar(usuario){
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
  dismiss() {
      this.location.back();
  }
}
