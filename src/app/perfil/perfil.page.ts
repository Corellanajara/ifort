import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListPage } from '../list/list.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  usuario = {encuestas : [],evaluaciones : [],canjeables : []};
  constructor(
    private router:Router,
    private modalCtrl: ModalController ,
    private userService : UserService
  ) {
    let userId = sessionStorage.getItem('userId');
    userService.gathering(userId).subscribe( usuario => {
      this.usuario = usuario;
    })
  }
  navegar(ruta){
    console.log("navega a "+ruta);
    this.router.navigate([ruta]);
  }
  ngOnInit() {
  }
  async verEvaluaciones(){
    const modal = await this.modalCtrl.create({
      component: ListPage,
      cssClass: 'modals'
    });

    return await modal.present();
  }
  verEncuestas(){

  }
}

