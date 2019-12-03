import { Component, OnInit } from '@angular/core';
import { ModalController ,AlertController} from '@ionic/angular';
import { PreguntaPage } from './pregunta/pregunta.page';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.page.html',
  styleUrls: ['./evaluacion.page.scss'],
})
export class EvaluacionPage implements OnInit {


  public tiposDeEvaluacion = ["Cuestionario","Evaluación"];
  public evaluacion = {nombre:"",descripcion:'',tipo:"",id:""};
  constructor(private alertController :AlertController,private modalCtrl : ModalController) { }

  ngOnInit() {
  }
  public guardarEvaluacion(){
    console.log(this.evaluacion);
  }
  public actualizarEvaluacion(){

  }
  async abrirPreguntas() {
    const modal = await this.modalCtrl.create({
      component: PreguntaPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("en preguntas",modal);
    });
    return await modal.present();
  }
  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <strong>crear una evaluación</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log("CREADO");
          }
        }
      ]
    });

    await alert.present();
  }



}
