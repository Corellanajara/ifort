import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { UserService } from '../../../_servicios/user.service';
import { ModalController,ToastController } from '@ionic/angular';

interface UsuarioImportado{
  Correo : string,
  Nombre : string,
  Rut : string,
  Telefono : string,
  Cargo : string,
  Clave : string,
  Apellido : string
}
@Component({
  selector: 'app-importar',
  templateUrl: './importar.page.html',
  styleUrls: ['./importar.page.scss'],
})
export class ImportarPage implements OnInit {

  constructor(
    private toastController : ToastController,
    private userService : UserService,
    private modalCtrl:ModalController,
    private location : Location) { }
  file : File = null;
  arrayBuffer:any;
  usuarios = [];
  ngOnInit() {
  }
  public dismiss(){
    this.modalCtrl.dismiss();
  }
  public handleFileInput(files: FileList) {
    console.log(files);
    this.file = files.item(0);
  }
  public incomingfile(event) {
    this.file= event.target.files[0];
  }
  public importar(){
    this.usuarios.map(usuario=>{
      this.mandarCorreo(usuario);
    })
    this.dismiss();
    console.log(this.usuarios);
  }
  public mandarCorreo(usuario){
    this.userService.insertar(usuario).subscribe(usuario =>{
      this.presentToast("Usuario creado satisfactoriamente");
    })
  }
  async presentToast(Mensaje) {
    const toast = await this.toastController.create({
      message: Mensaje,
      duration: 2000
    });
    toast.present();
  }
  Upload() {
    let self = this;
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            var datos = XLSX.utils.sheet_to_json(worksheet,{raw:true});
            for(let i = 0 ; i < datos.length ; i ++){
              let dato = datos[i] as UsuarioImportado;
              let user = {Nombre:dato.Nombre,Apellido:dato.Apellido,Rut:dato.Rut,Telefono:dato.Telefono,Correo: dato.Correo,Cargo:dato.Cargo,Clave:(dato.Clave||"clavetemporal") }
              let data : UsuarioImportado = user;
              if( !data.Nombre || !data.Apellido || !data.Correo){
                alert("TIENE DATOS CORRUPTOS");
                return false;
              }
            }
            for(let i = 0 ; i < datos.length;i++){
              let data  = datos[i] as UsuarioImportado;

              let password = (data.Clave || "claveTemporal");
              let usuario = {firstName:data.Nombre,lastName:data.Apellido,rut:data.Rut,phone:data.Telefono,email:data.Correo,cargo:data.Cargo,password:password.toString()};
              console.log(usuario);

              self.usuarios.push(usuario);
            }
            console.log(self.usuarios);
        }
        fileReader.readAsArrayBuffer(this.file);
  }
}




//inside export class
