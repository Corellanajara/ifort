import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { ImportarPagePregunta } from './importar/importar.page';
import { CrudPage } from './crud/crud.page';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})

export class PreguntaPage implements OnInit {
  public evaluacion : any;
  public verAgregar = false;
  public indicadores = [];
  public categorias = [];
  public tipos = ["porcentaje","numerico","rango"];
  constructor(private navParams : NavParams,private modalCtrl : ModalController) {
    this.evaluacion = navParams.get('evaluacion');
    console.log("evaluacion en modal pregunta",this.evaluacion);
    var categorias = this.evaluacion.indicadores;
    if(categorias.length > 0 ){
      this.indicadores = categorias;
      for(let i = 0 ; i < this.indicadores.length;i++){
        let data = this.indicadores[i];

        let indicador = {titulo:data.titulo,tipo:data.tipo }
        if(this.categorias[data.categoria]){
          this.categorias[data.categoria].push(indicador);
        }else{
          this.categorias[data.categoria] = [];
          this.categorias[data.categoria].push(indicador);
        }
      }
    }else{
      for(let key in categorias){
        let categoria = categorias[key];
        for(let i = 0 ; i < categoria.length ; i++){
          let indicador = categoria[i];
          indicador.categoria = key;
          this.indicadores.push(indicador);
        }
      }
    }
    console.log(this.indicadores);
    console.log(this.evaluacion.indicadores);
    this.agrupar();

 }
 async editarIndicador(indicador,key,indice){
   const modal = await this.modalCtrl.create({
     component: CrudPage,
     cssClass: 'modals',
     componentProps: {
       'pregunta': indicador,
       'key' : key
     }
   })
   modal.onDidDismiss().then(modal=>{
     if(modal.data){
       this.categorias[key][indice] = modal.data;
       console.log(this.categorias[key][indice]);
     }

   });
   return await modal.present();
 }
 eliminarIndicador(indicador,key,indice){
   console.log(indicador);
   this.categorias[key].splice(indice, 1);
   console.log(this.categorias);
 }
  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
  async crearIndicador() {
    const modal = await this.modalCtrl.create({
      component:  CrudPage,
      cssClass: 'modals'

    });
    modal.onDidDismiss().then(modal=>{
      if(modal.data){
        console.log(modal);
        this.indicadores.push(modal.data);
        this.agrupar();
      }

    });
    return await modal.present();
  }
  async abrirImportar(){
    const modal = await this.modalCtrl.create({
      component: ImportarPagePregunta,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': this.evaluacion,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("datos",modal);
    });
    return await modal.present();
  }
  async editarPregunta(ev) {
    const modal = await this.modalCtrl.create({
      component:  CrudPage,
      cssClass: 'modals',
      componentProps: {
      'evaluacion': ev,
    }
    });
    modal.onDidDismiss().then(modal=>{
      console.log("en indicadores",modal);
    });
    return await modal.present();
  }
  guardarindicadores(){
    //this.agrupar();
    console.log("categorias",this.categorias)
    this.modalCtrl.dismiss(this.categorias);
  }
  getKeys(obj){

    return Object.keys(obj);
  }
  verIndicadores(){
    console.log(this.categorias);
    console.log(this.indicadores);
  }
  agrupar(){
    this.categorias = [];
    for(let i = 0 ; i < this.indicadores.length;i++){
      let data = this.indicadores[i];

      let indicador = {titulo:data.titulo,tipo:data.tipo }
      if(this.categorias[data.categoria]){
        this.categorias[data.categoria].push(indicador);
      }else{
        this.categorias[data.categoria] = [];
        this.categorias[data.categoria].push(indicador);
      }
    }
  }
}
