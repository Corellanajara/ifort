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
  encuestas = [];
  usuario  = undefined;
  constructor(private userService : UserService,private modalCtrl : ModalController) { }

  ngOnInit() {

    this.userService.gathering(sessionStorage.getItem('userId')).subscribe(data=>{
      console.log(data);
      this.usuario = data;
      this.encuestas = data.encuestas;
    })
  }
  async abrirResponder(encuesta){

    const modal = await this.modalCtrl.create({
      component: ResponderPage,
      cssClass: 'modals',
      componentProps: {
      'encuesta': encuesta,
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log("respuestas",modal.data);
        encuesta = modal.data;
        console.log(this.usuario);
        this.usuario.password = undefined;
        this.userService.actualizar(this.usuario.id,this.usuario).subscribe(datos=>{
          console.log(datos);
          this.ngOnInit();
        })

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
