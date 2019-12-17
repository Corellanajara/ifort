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
  public evaluacion = {nombre:"",descripcion:'',tipo:"",preguntas : [],id:''};
  public verAgregar = false;
  evaluaciones = [];
  constructor(private alertController :AlertController,private modalCtrl : ModalController) { }

  ngOnInit() {
  }
  public guardarEvaluacion(){
    this.evaluacion.id = ""+(this.evaluaciones.length + 1);
    this.evaluaciones.push(this.evaluacion);
    this.evaluacion = {nombre:"",descripcion:'',preguntas : [],tipo:"",id:""};
  }
  public actualizarEvaluacion(){
    this.redefinirEvaluacion();
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
      this.evaluacion.preguntas = modal.data;
      console.log("preguntas conseguidas",modal);
    });
    return await modal.present();
  }
  async confirmar() {
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UNA EVALUACIÓN</strong>!!!',
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
            this.guardarEvaluacion();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  visualizar(evaluacion,slide){

    this.evaluacion = evaluacion;
    slide.close()
  }
  redefinirEvaluacion(){
    this.evaluacion = {nombre:"",descripcion:'',preguntas : [],tipo:"",id:""};
  }


}
