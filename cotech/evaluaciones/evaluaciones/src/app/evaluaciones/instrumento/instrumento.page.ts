import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController,AlertController,PopoverController } from '@ionic/angular';
import { RespuestaPage } from './respuesta/respuesta.page';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.page.html',
  styleUrls: ['./instrumento.page.scss'],
})
export class InstrumentoPage implements OnInit {
  public instrumento : any;
  public indicadores = [];
  public noOcultar = true;
  constructor(private popoverController:PopoverController,private alertController : AlertController,private navParams : NavParams,private modalCtrl : ModalController) {
    console.log(navParams.get('evaluacion') );
    this.instrumento = navParams.get('evaluacion');
    this.indicadores = this.instrumento.indicadores;
    this.noOcultar = (navParams.get('noOcultar') || true);
    console.log(this.noOcultar);
  }

  ngOnInit() {
  }
  async responderConAlerta(indicador) {
    const alert = await this.alertController.create({
      header: 'Evaluar indicador!',
      subHeader: indicador.titulo,
      message: indicador.descripcion,
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }
  public guardarEvaluacion(){
    this.modalCtrl.dismiss({indicadores:this.indicadores,usuario:this.navParams.get('usuario') });
  }
  sinResponder(indicadores){
    for(let i = 0 ; i < indicadores.length; i++){
      if(!indicadores[i].valor){
        return true;
      }
    }
    return false;
  }
  async responder(indicador) {
    console.log(indicador);
    const popover = await this.popoverController.create({
      component: RespuestaPage,
      componentProps:{titulo:indicador.titulo, descripcion: indicador.descripcion,tipo:indicador.tipo, valor : indicador.valor,min:indicador.min,max:indicador.max,noOcultar : this.noOcultar},
      translucent: true
    });
    popover.onDidDismiss().then(datos=>{
      if(datos.data){
          indicador.valor = datos.data.valor;
          console.log(indicador);
          console.log(datos);
      }
    });
    return await popover.present();
  }

}
