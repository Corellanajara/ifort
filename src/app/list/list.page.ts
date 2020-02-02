import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController,NavParams } from '@ionic/angular';
import { GraficoPage } from './grafico/grafico.page';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  tipo = "";
  datos = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private modalCtrl : ModalController,
    private userService : UserService,
    private navParams: NavParams) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.tipo = this.navParams.get("tipo");
    this.traerDatos();
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  traerDatos(){
    let userId = sessionStorage.getItem('userId');
    this.userService.gathering(userId).subscribe( datos => {
      console.log(this.tipo.toLowerCase());
      this.datos = datos[this.tipo.toLowerCase()];
      console.log(this.datos);
    })
  }
  ngOnInit() {
  }
  async verGrafico(evaluacion,estado) {
    if(estado == 0){
      return;
    }
    const modal = await this.modalCtrl.create({
      component: GraficoPage,
      cssClass: 'graficos',
      componentProps: {
      'instrumento': evaluacion,
      'noOcultar': false
    }
    });

    return await modal.present();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
