import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { UserService } from '../../../_servicios/user.service';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.page.html',
  styleUrls: ['./asignar.page.scss'],
})
export class AsignarPage implements OnInit {
  jerarquia = [];
  usuario : any;
  arbol = [];
  indice = 0;
  pasos = [];
  mensaje = "";
  sucursal = 0;
  nodo : any;
  count : number = 0;
  constructor(
    private userService : UserService,
    private navParams : NavParams,
    private alertController : AlertController,
    private modalCtrl:ModalController) {
    this.usuario = navParams.get('usuario');
    console.log(this.usuario);
    this.jerarquia = JSON.parse(sessionStorage.getItem('jerarquia'));
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    if(typeof(this.arbol) != 'object' ){
      this.arbol = JSON.parse(this.arbol);
    }
    //console.log(this.jerarquia);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
    this.nodo = undefined;
  }
  volver(){
    console.log(this.pasos);
    this.pasos.pop();
    console.log(this.pasos);
    this.arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
    if(typeof(this.arbol ) != 'object' ){
      this.arbol = JSON.parse(this.arbol);
    }
    for(let i = 0 ; i < this.pasos.length;i++){
      this.navegaNodo(this.arbol[this.pasos[i]],this.pasos[i] ,false);
    }
    this.nodo = undefined;
    this.mensaje = "Seleciona ";
  }
  public asignar(){
    this.modalCtrl.dismiss(this.nodo);
  }
  public seleccionaNodo(nodo,indice){
    this.count++;
    setTimeout(() => {
      if (this.count == 1) {
        this.count = 0;
        console.log("hice click en selecciona",nodo);
        this.mensaje = "Seleccionado "+nodo.name;
        this.nodo = nodo;
        this.sucursal = nodo.id;
      }if(this.count > 1){
        this.count = 0;
        this.navegaNodo(nodo,indice,true);
      }
    }, 250);

  }
  navegaNodo(nodo,indice,aumentaConteo){
    console.log(this.arbol);
    if(this.arbol[indice].childrens.length > 0){
      console.log("navegado")
      this.indice++;
      this.arbol = this.arbol[indice].childrens;
      if(aumentaConteo){
        this.pasos.push(indice);
      }
      console.log("indice",this.pasos);
    }else{
      this.seleccionaNodo(nodo,indice);
    }
  }
  async borrar(elemento) {
    const alert = await this.alertController.create({
      header: 'Confirmar Elminación!',
      message: 'Estas a punto de <br><strong>BORRAR UN ELEMENTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.borrarAsignar(elemento);
          }
        }
      ]
    });

    await alert.present();
  }
  borrarAsignar(elemento){
    console.log(elemento);
    var el = this.usuario.asignado.indexOf(elemento);
    if(el != -1){
        this.usuario.asignado.splice(el, 1);
        this.usuario.password = undefined;
        this.userService.actualizar(this.usuario.id,this.usuario).subscribe(res=>{
          console.log(res);
        })
    }



    //this.userService.borrar(usuario.id).subscribe(res=>{
      //this.traerUsuarios(false);
    //})
  }

}
