import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController,NavParams } from '@ionic/angular';
import { GraficoPage } from './grafico/grafico.page';
import { EncuestaService } from '../_servicios/encuestas.service';
import { EvaluacionesService } from '../_servicios/evaluaciones.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  tipo = "";
  datos = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private evaluacionesService : EvaluacionesService,
    private encuestaService : EncuestaService,
    private modalCtrl : ModalController,
    private userService : UserService,
    private navParams: NavParams) {
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.tipo = this.navParams.get("tipo");
    if(usuario.permissionLevel > 4){
        this.traerTodos();
    }else{
        this.traerDatos();
    }

  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  traerTodos(){
    if(this.tipo == "Encuestas"){
      this.encuestaService.listar().subscribe(datos=>{
        this.datos = datos;
      })
    }else{
      this.evaluacionesService.listar().subscribe(datos=>{
        console.log(datos);
        this.datos = datos;
      })
    }
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
      'tipo' : this.tipo,
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
