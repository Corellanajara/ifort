import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
interface EvaluacionImportado{
  Sigla : string,
  Titulo : string,
  Categoria : string,
  Tipo : string,
  Indicador : string

}
@Component({
  selector: 'app-importar',
  templateUrl: './importar.page.html',
  styleUrls: ['./importar.page.scss'],
})
export class ImportarPageEvaluacion implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private location : Location) { }
  file : File = null;
  evaluacion : any;
  arrayBuffer:any;
  categorias = [];
  evaluaciones = [];
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
  public mandarCorreo(correo,clave){
    console.log("correo mandado a "+correo+ " tu clave es "+clave,);
  }
  importar(){
    var data = {nombre : this.evaluaciones[0].Titulo , sigla : this.evaluaciones[0].Sigla , categorias : this.categorias};
    this.modalCtrl.dismiss(data);
  }
  Upload() {
    let self = this;
    this.categorias = [];
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
            console.log(datos);
            for(let i = 0 ; i < datos.length ; i ++){

              let data =  datos[i] as EvaluacionImportado;
              if( !data.Sigla || !data.Titulo || !data.Categoria || !data.Indicador){
                alert("TIENE DATOS CORRUPTOS");
                return false;
              }

            }

            for(let i = 0 ; i < datos.length;i++){
              let data  = datos[i] as EvaluacionImportado;
              let indicador = { titulo : data.Indicador , tipo : (data.Tipo || 'Porcentaje')};
              if(self.categorias[data.Categoria]){
                self.categorias[data.Categoria].push(indicador);
              }else{
                self.categorias[data.Categoria] = [];
                self.categorias[data.Categoria].push(indicador);
              }
              //let usuario = {firstName:data.Nombre,lastName:data.Apellido,rut:data.Rut,phone:data.Telefono,email:data.Correo,cargo:data.Cargo,password:password};
              self.evaluaciones.push(data);
              //self.mandarCorreo(usuario);
            }
            console.log(self.evaluaciones);
            console.log(self.categorias);
        }
        fileReader.readAsArrayBuffer(this.file);
  }
  tamObjeto(objeto){
    var  i = 0;
    for(let obj in objeto){
      i += 1;
    }
    return i;
  }
}




//inside export class
