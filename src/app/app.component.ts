import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './_servicios/user.service';
import { EmpresaService } from './_servicios/empresas.service';
import { Idle } from 'idlejs/dist';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  file = File = null;
  public usuario = {nombre:'',apellido:'',img:undefined};
  empresa  = {nombre:'Ifort'};
  constructor(
    private empresaService : EmpresaService,
    private userService : UserService,
    private menuController : MenuController,
    private router : Router,
    private events: Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    //this.pushNotifications();
    events.subscribe('user:login', (res) => {
      console.log("Esta dentro del evento login",res);
      this.initializeApp();
      this.appPages = res;
    });
    const idle = new Idle()
      .whenNotInteractive()
      .within(8)
      .do(() => {
        this.logout();
      })
      .start();
  }
  log(p){
    console.log(p);
  }
  navegar(ruta){
    this.router.navigate([ruta]);
  }
  logout(){
    this.menuController.toggle();
    sessionStorage.clear();
    this.usuario = {nombre:'',apellido:'',img:undefined};
    this.router.navigate(['login']);
  }
  public subirArchivo(evento) {
    //console.log('entrando');
    this.file= evento.target.files[0];
  }
  public leerArchivo(evento){
    if (evento.target.files && evento.target.files[0]) {
      var lector = new FileReader();

      lector.readAsDataURL(evento.target.files[0]);

      lector.onload = (evento) => { // called once readAsDataURL is completed
        //console.log(evento)
        try {
          var pre = evento.target["result"];
            this.usuario.img = pre;
            this.uploadFile()

        } catch (error) {
            //console.log(error);

        }}
    }
  }
  uploadFile(){
      var BaseClass = function (data) {
        Object.assign(this, data);
      };
      var info = {};
      var currentTime = new Date().getTime();
      //console.log(this.file);
      if(this.file){
        var formData = new FormData();
        var timestamp = new Date();
        var tipo = this.file.name.split('.').pop();
        var name = currentTime +"."+tipo;
        Object.defineProperty(this.file, 'name', {
          writable: true,
          value: name
        });
        //console.log(this.file);
        formData.append('name',name);
        formData.append('file',this.file);

        this.userService.guardarImagen(formData);
        this.actualizarUsuario(name);
      }
    }
  actualizarUsuario(file){
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(usuario){
      console.log("traigo al user");
      this.userService.gathering(usuario.id).subscribe( datos => {
        sessionStorage.setItem('usuario',JSON.stringify(datos));
        console.log("user",datos);
        usuario = datos;
        usuario.img = file;
        usuario.password = undefined;
        this.userService.actualizar(usuario.id,usuario).subscribe(res=>{
          console.log(res);
        })
      });
    }
  }
  initializeApp() {
    console.log("inicializo");
    let menus = JSON.parse(sessionStorage.getItem('menus'));
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(usuario){
      let empresa = JSON.parse(sessionStorage.getItem('empresa'))
      if(empresa){
        this.empresa = empresa;
      }
      console.log("empresa",this.empresa);
      console.log("traigo al user");
      this.userService.gathering(usuario.id).subscribe( datos => {
        sessionStorage.setItem('usuario',JSON.stringify(datos));
        console.log("user",datos);
        usuario = datos;
        if(usuario.img){
          this.usuario.img = "http://178.128.71.20:3850/"+usuario.img;
          console.log(this.usuario);
        }
        this.usuario.nombre = usuario.firstName;
        this.usuario.apellido = usuario.lastName;

        let empresaId = usuario.empresaId;

        this.empresaService.listarById(empresaId).subscribe( empresa =>{
          console.log(empresa);
          if(empresa){
            this.empresa['nombre']  = empresa['nombre'];
            var jerarquia = JSON.stringify(empresa['jerarquia']);
            sessionStorage.setItem('jerarquia', JSON.stringify(jerarquia));
            sessionStorage.setItem('empresa', JSON.stringify(empresa) );
          }

        })

      })
    }
    if(menus){
        console.log(menus);
        this.appPages = menus;
    }else{
      this.logout();
    }

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
