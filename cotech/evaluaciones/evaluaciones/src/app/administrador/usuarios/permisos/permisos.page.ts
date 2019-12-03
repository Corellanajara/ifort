import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../../_servicios/menu.service';
import { NavParams, ModalController } from '@ionic/angular';


interface Usuario {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissionLevel: string;
  menus : Array<Menu>;
  _id : string;
}
interface Menu {
    title: string;
    path: string;
    icon: string;
    _id: string;
}


@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage implements OnInit {

  menus = [];
  usuario : Usuario;
  constructor(private modalCtrl:ModalController, private navParams : NavParams, private menusService :  MenusService) {
    this.usuario = navParams.get('usuario');
  }

  ngOnInit() {
    this.menusService.listar().subscribe( data => {
      console.log(data);
      for(let i = 0 ; i < data.length ; i++){

        for(let j = 0 ; j < this.usuario.menus.length; j++){
          console.log(this.usuario.menus[j]._id );
          console.log(data[i]._id);
          if(data[i]._id == this.usuario.menus[j]._id ){
            console.log("ES TRUE");
              data[i].isChecked = true;
          }
        }
        this.menus.push(data[i]);
      }
    });
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  guardarPermisos(){
    let menu = [];
    for(let i = 0 ; i < this.menus.length;i++){
      if(this.menus[i].isChecked){
        menu.push(this.menus[i]);
      }
    }
    this.modalCtrl.dismiss(menu);
  }

}
