import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './_servicios/auth.service';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
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
    private storage : Storage,
    private events: Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router : Router,
    private loadingController: LoadingController,
    private authService : AuthService,
    private statusBar: StatusBar

  ) {
    this.initializeApp();
    //this.pushNotifications();
    events.subscribe('user:login', (res) => {
      console.log("Esta dentro del evento login",res);
      var menu = document.querySelector('ion-menu')
      menu.hidden = false;
      console.log("acabo de mostrar el menu");
      this.initializeApp();
      this.appPages = res;
    });
  }
  log(p){
    console.log(p);
  }
  navegar(ruta){
    this.router.navigate([ruta]);
  }
  logout(){
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
  login(form){
    let self = this;
    this.cargando();
    try{
      this.authService.login(form).subscribe((res)=>{
  //      console.log(res);
        let accessToken = res.accessToken;
        let refreshToken = res.refreshToken;
        let userId = res.userId;
        sessionStorage.setItem('accessToken', accessToken);
        this.storage.set('accessToken',accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userId', userId);
        this.storage.set('userId',userId);
        self.userService.gathering(userId).subscribe( datos => {
          let empresaId = datos.empresaId;
          let asignado = datos.asignado;
          let menus = datos.menus;
          //menus.push({title: "Perfil",path: "perfil",icon: "person",_id:"askjdals"})

          self.empresaService.listarById(empresaId).subscribe( empresa =>{
            if(!empresa['estado']){
              self.router.navigate(['login']);
              return;
            }
            sessionStorage.setItem('empresaId', empresaId);
            sessionStorage.setItem('usuario',JSON.stringify(datos));
            this.storage.set('empresaId',empresaId)
            this.storage.set('usuario',datos);
            this.usuario.nombre = datos.firstName;
            this.usuario.apellido = datos.lastName;
            sessionStorage.setItem('menus',JSON.stringify(datos.menus));
            this.storage.set('menus',datos.menus);
            sessionStorage.setItem('asignado',JSON.stringify(asignado));
            this.storage.set('asignado',asignado);
            sessionStorage.setItem('evaluaciones',JSON.stringify(datos.evaluaciones));
            this.storage.set('evaluaciones',datos.evaluaciones)
            this.events.publish('user:login', menus);
            sessionStorage.setItem('empresa', JSON.stringify(empresa));
            this.storage.set('empresa',empresa);
            var jerarquia = JSON.stringify(empresa['jerarquia']);
            sessionStorage.setItem('jerarquia', JSON.stringify(jerarquia));
            this.storage.set('jerarquia',jerarquia);

            self.router.navigate(['home']);
          });

        })

      });
    }catch(err){
      console.log(err);
    }
  }
  async cargando() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: 'Iniciando sesión<ion-spinner></ion-spinner>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  initializeApp() {
    console.log("inicializo");
    var self = this;
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
    }else{
      this.storage.get('form')
        .then(
          form => {
            //alert("entre al form")
          //  console.log(form);

            if(form){
                self.login(form);
            }
          }
        );
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
