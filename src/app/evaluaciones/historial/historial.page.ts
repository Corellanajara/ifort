import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';
//import { GraficoPage } from './grafico/grafico.page';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  private selectedItem: any;
  tipo = "";
  datos = [];

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private modalCtrl : ModalController,
    private navParams: NavParams) {
    this.datos = navParams.get('evaluaciones');    
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }
  /*
  async verGrafico(evaluacion,estado) {
    if(estado == 0){
      return;
    }
    const modal = await this.modalCtrl.create({
      component: GraficoPage,
      cssClass: 'graficos',
      componentProps: {
      'instrumento': evaluacion,
      'tipo' : this.tipo,
      'noOcultar': false
    }
    });

    return await modal.present();
  }
  */
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
