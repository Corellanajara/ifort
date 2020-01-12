import { Component } from '@angular/core';
import { ITreeState, ITreeOptions } from 'angular-tree-component';
import { v4 } from 'uuid';
import { EmpresaService } from '../_servicios/empresas.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.page.html',
  styleUrls: ['./drag.page.scss'],
})

export class DragPage{
    mensaje = "";
    Empresa : any;
    currentEvent: string = 'Listos para comenzar';
    config = {
        showActionButtons: true,
        showAddButtons: true,
        showRenameButtons: true,
        showDeleteButtons: true,
        showRootActionButtons: true, // set false to hide root action buttons.
        enableExpandButtons: true,
        enableDragging: true,
        rootTitle: 'Arbol jerarquico',
        validationText: 'Ingresa un campo correcto',
        minCharacterLength: 2,
        setItemsAsLinks: false,
        setFontSize: 32,
        setIconSize: 16
    };
    myTree = [
      {
        name: 'Sucursal Talca',
        id: 1,
        options: {
            hidden: false,
            position: 1,
            href: 'https://github.com/Zicrael/ngx-tree-dnd'
          },
        childrens: [
          {
            name: 'Area Informatica',
            id: 2,
            childrens: []
          },
          {
            name: 'Area Comercial',
            id: 3,
            childrens: []
          }
        ]
      },
      {
        name: 'Sucursal Linares',
        id: 4,
        childrens: [
          {
            name: 'Area comercial',
            id: 5,
            childrens: []
          }
        ]
      }
    ];
    constructor(
      private loadingController:LoadingController,
      private empresaService: EmpresaService) {
      console.log("ON INIT");
      console.log(sessionStorage.getItem('empresa'));
/*
      this.Empresa = JSON.parse(sessionStorage.getItem('empresa'));
      this.config.rootTitle = this.Empresa.nombre;
      let arbol = JSON.parse(sessionStorage.getItem('jerarquia'));
      if(arbol){
          this.myTree = JSON.parse(sessionStorage.getItem('jerarquia'));
          console.log(JSON.parse(sessionStorage.getItem('config')));
          this.config = JSON.parse(sessionStorage.getItem('config'));
      }
*/
    }
    public disableAll(){
      this.config.showActionButtons = false;
      this.config.showAddButtons = false;
      this.config.showRenameButtons = false;
      this.config.showDeleteButtons = false;
      this.config.showRootActionButtons = false; // set false to hide root action buttons.
      this.config.enableExpandButtons = false;
      this.config.enableDragging = false;
    }
    public saveTree(){
      //this.Empresa.jerarquia = this.myTree;
      sessionStorage.setItem('jerarquia',JSON.stringify(this.myTree));
      sessionStorage.setItem('config',JSON.stringify(this.config));
      console.log(this.Empresa);
      //this.empresaService.actualizar(this.Empresa.id,this.Empresa).subscribe( act => {
        //console.log(act);
      //})
      sessionStorage.setItem('jerarquia',JSON.stringify(this.myTree));
      sessionStorage.setItem('config',JSON.stringify(this.config));
    }

    onDragStart(event) {
       this.currentEvent = 'Capturado el comienzo';
       console.log(event);
    }
    onDrop(event) {
      this.currentEvent = 'Soltando';
      console.log(event);
    }
    onAllowDrop(event) {
      this.currentEvent = 'Permitido soltar';
    }
    onDragEnter(event) {
      this.currentEvent = 'Entra a tomar';
    }
    onDragLeave(event) {
      this.currentEvent = 'Sale del tomar';
    }
    onAddItem(event) {
      this.currentEvent = 'Añadiendo un item';
      console.log(event);
    }
    onStartRenameItem(event) {
      this.currentEvent = 'Editando';
    }
    onFinishRenameItem(event) {
      this.currentEvent = 'Termina edicion';
    }
    onStartDeleteItem(event) {
      console.log('start delete');
      this.currentEvent = 'Comienza a borrar';
    }
    onFinishDeleteItem(event) {
      console.log('finish delete');
      this.currentEvent = 'Borrado ';
    }
    onCancelDeleteItem(event) {
      console.log('cancel delete');
      this.currentEvent = 'Cancelar borrado';
    }
    public seleccionaNodo(nodo,indice){
      console.log("hice click en selecciona");
      this.mensaje = "Seleccionado "+nodo.name;
    }
    navegaNodo(nodo,indice){
      console.log(event);
      console.log(indice);
      if(this.myTree[0].childrens.length > 0){
        this.myTree = this.myTree[0].childrens;
      }else{
        this.seleccionaNodo(nodo,indice);
      }
    }

    async cargando() {
      const loading = await this.loadingController.create({
        spinner: null,
        duration: 2000,
        message: 'Guardando jerarquia <ion-spinner></ion-spinner>',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
      return await loading.present();
    }
  }
