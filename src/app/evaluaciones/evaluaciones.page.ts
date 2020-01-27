import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';
import { ModalController } from '@ionic/angular';
import { InstrumentoPage } from './instrumento/instrumento.page';
interface Usuario {
  firstName: string;
  lastName: string;
  rut : string;
  email: string;
  phone : string;
  cargo : string;
  password: string;
  permissionLevel: string;
  menus : Array<Menu>;
  evaluaciones : Array<any>;
  asignado : Array<any>;
  empresaId : string;
  _id : string;
}
interface Menu {
    title: string;
    path: string;
    icon: string;
    _id: string;
}
@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.page.html',
  styleUrls: ['./evaluaciones.page.scss'],
})
export class EvaluacionesPage implements OnInit {
  private usuarios  : Usuario[] = [];
  constructor(private modalCtrl:ModalController,private userService:UserService) {
    userService.listar().subscribe(usuarios=>{
      this.usuarios = usuarios;
      console.log(usuarios);
    })
  }

  ngOnInit() {
  }
  public dismiss(){
    this.modalCtrl.dismiss();
  }
  public traerUsuarios(evento){
    this.userService.listar().subscribe(usuarios => {
      console.log(usuarios);
      this.usuarios = usuarios;
      if(evento){
        evento.target.complete();
      }
    })
  }
  pendientes(evaluaciones){
    var evs = [];
    for(let i = 0 ; i < evaluaciones.length; i++){
      if(evaluaciones[i].estado == 0){
        evs.push(evaluaciones[i]);
      }
    }
    return evs;
  }

  async evaluar(i,evaluacion,usuario) {
    console.log(i);
    console.log(evaluacion);
    console.log(usuario);
    const modal = await this.modalCtrl.create({
      component:  InstrumentoPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': evaluacion.instrumento,
      //'indicadores':evaluacion.instrumento.indicadores,
      'usuario':usuario
    }
    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        evaluacion.instrumento.indicadores = modal.data.indicadores;
        var valorTotal = 0;
        var cantidad = evaluacion.instrumento.indicadores.length
        for(let i = 0 ; i < cantidad ; i++){
          var indicador = evaluacion.instrumento.indicadores[i];
            valorTotal += indicador.valor;
        }
        var porcentaje = valorTotal / cantidad;
        var puntos = evaluacion.puntos * (porcentaje/100);
        puntos = Math.round(puntos);
        evaluacion.estado = 1;
        usuario.password = undefined;
        if(usuario.puntos){
          usuario.puntos += puntos;
        }else{
          usuario.puntos = puntos;
        }
        console.log(usuario);
        var usuarioSistema = JSON.parse(sessionStorage.getItem('usuario'));
        if(usuario.id == usuarioSistema.id){
          sessionStorage.setItem("usuario",JSON.stringify(usuario));
        }
        this.userService.actualizar(usuario._id,usuario).subscribe(res=>{
          console.log(res);
        })
        console.log(modal.data);
      }
    });
    return await modal.present();
  }
}
