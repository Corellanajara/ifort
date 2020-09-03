import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';

@Component({
  selector: 'app-escojer',
  templateUrl: './escojer.page.html',
  styleUrls: ['./escojer.page.scss'],
})
export class EscojerEncuestasPage implements OnInit {
  usuarios = []
  constructor(public navParams:NavParams,public modalCtrl: ModalController) {
    this.usuarios = navParams.get('usuarios');
  }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  guardarPermisos(){
    let users = [];
    for(let i = 0 ; i < this.usuarios.length;i++){
      if(this.usuarios[i].isChecked){
        users.push(this.usuarios[i]);
      }
    }
    this.modalCtrl.dismiss(users);
  }
}
