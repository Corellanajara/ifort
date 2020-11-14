import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController,NavParams } from '@ionic/angular';
import { EncuestaService } from '../_servicios/encuestas.service';
import { Router } from '@angular/router';
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
  usuario = {permissionLevel : 2}
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private router : Router,
    private evaluacionesService : EvaluacionesService,
    private encuestaService : EncuestaService,
    private modalCtrl : ModalController,
    private userService : UserService,
    private navParams: NavParams) {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.tipo = this.navParams.get("tipo");
    if(this.usuario.permissionLevel > 4){
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
    this.evaluacionesService.setInstrumento(evaluacion);
    this.evaluacionesService.setTipo(this.tipo);
    this.evaluacionesService.setNoOcultar(false);
    this.modalCtrl.dismiss();
    this.router.navigate(['/grafico']);    
  } 
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
