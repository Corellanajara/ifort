import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
interface UsuarioImportado{
  Correo : string,
  Nombre : string,
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
    console.log(this.usuarios);
  }
  public mandarCorreo(correo,clave){
    console.log("correo mandado a "+correo+ " tu clave es "+clave,);
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
              let data : UsuarioImportado = datos[i];
              if( !data.Nombre || !data.Apellido || !data.Correo){
                alert("TIENE DATOS CORRUPTOS");
                return false;
              }
            }
            for(let i = 0 ; i < datos.length;i++){
              let data : UsuarioImportado = datos[i];;
              console.log(data);
              let password = (data.Clave || "claveTemporal");
              let usuario = {firstName:data.Nombre,lastName:data.Apellido,email:data.Correo,password:password};
              self.usuarios.push(usuario);
              self.mandarCorreo(data.Correo,password);
            }
            console.log(self.usuarios);
        }
        fileReader.readAsArrayBuffer(this.file);
  }

}




//inside export class
