import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos = []
  usuario = "";
  constructor(public navParams : NavParams,public modalCtrl : ModalController) {
    this.usuario = navParams.get('usuario');
    this.productos = navParams.get('productos');
    console.log(this.productos);
  }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  verDesc(prod){
    alert(prod.descripcion);
  }
}
