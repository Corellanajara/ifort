import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../_servicios/encuestas.service';
import { ModalController ,ToastController,AlertController} from '@ionic/angular';

interface Producto {
  titulo:string,
  descripcion : string,
  url : string,
  puntos : number,
  fecha: Date,
  empresaId : string,
  id: string
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  constructor(
    private toastController : ToastController,
    private alertController :AlertController,
    private productoService : ProductoService ) { }

  public producto : Producto = {titulo:'',descripcion:'',url:'',puntos:0,id:'',fecha:new Date()};
  public verAgregar = false;
  public activos = [];
  private usuarios = [];
  mensaje = "";
  sucursal = "";
  indice = 0;
  puntos = 0;
  pasos = [];
  inputs = [];
  porcentaje = 0;
  productos = [];
  jerarquia = [];
  arbol = [];
  nodo : any;
  count : number = 0;

  ngOnInit() {
    this.traerDatos();
  }
  traerDatos(){
    this.productoService.listar().subscribe(datos=>{
      console.log(datos);
      this.productos = datos;
    })
  }
  visualizar(producto,slide){
    console.log(producto);
    this.producto = producto;
    slide.close()
  }
  redefinirProducto(){
    this.producto = {titulo:'',descripcion:'',url:'',puntos:0,id:'',fecha:new Date()};
  }
  async confirmar() {
    console.log(this.evaluacion);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>CREAR UN PRODUCTO</strong>!!!',
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
            this.guardarProducto();
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  guardarProducto(){
    this.productoService.insertar(this.producto).subscribe(data=>{
      console.log(data);
    })
    this.producto = {titulo:'',descripcion:'',url:'',puntos:0,id:'',fecha:new Date()};
    this.traerDatos();
  }
  actualizarProducto(){
    this.productoService.actualizar(this.producto.id,this.producto).subscribe(data=>{
      console.log(data);
    })
    this.producto = {titulo:'',descripcion:'',url:'',puntos:0,id:'',fecha:new Date()};
    this.traerDatos();
  }
  async alertBorrar(ev) {
    console.log(this.evaluacion);
    const alert = await this.alertController.create({
      header: 'Favor confirmar!',
      message: 'Estas a punto de <br><strong>BORRAR UN PRODUCTO</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.borrarProducto(ev);
            this.verAgregar = false;
          }
        }
      ]
    });

    await alert.present();
  }
  eliminar(ev,slide){
    this.alertBorrar(ev);
    slide.close()
  }
  borrarProducto(ev){
    this.productoService.borrar(ev.id).subscribe(dato=>{
      console.log(dato);
      this.ngOnInit();
    })
  }

}
