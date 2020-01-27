import { Component, OnInit } from '@angular/core';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';
import { ResponderPage } from './responder/responder.page';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {
  encuestas = this.getEncuestas();
  constructor(private userService : UserService,private modalCtrl : ModalController) { }

  ngOnInit() {
    ;
    this.userService.gathering(sessionStorage.getItem('userId')).subscribe(data=>{
      console.log(data);
    })
  }
  async abrirResponder(){

    const modal = await this.modalCtrl.create({
      component: ResponderPage,
      cssClass: 'modals',
      componentProps: {
      'encuesta': {id:1,nombre:"soy una encuesta"},
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("respuestas",modal.data);
      }
    });
    return await modal.present();
  }
  getEncuestas(){
    return [{id:1,titulo:'Hola soy una encuesta'}];
  }
  abrirAyuda(){
    alert("este sirve pa hacer y listar encuestas");
  }

}
