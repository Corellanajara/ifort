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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  public usuario = {nombre:'',apellido:''};
  empresa = {nombre:'Ifort'};
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
    this.menuController.toggle();
    sessionStorage.clear();
    this.usuario = {nombre:'',apellido:''};
    this.router.navigate(['login']);
  }
  initializeApp() {
    console.log("inicializo");
    let menus = JSON.parse(sessionStorage.getItem('menus'));
    let usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if(usuario){
      this.empresa = JSON.parse(sessionStorage.getItem('empresa'))
      console.log("empresa",this.empresa);
      console.log("traigo al user");
      this.userService.gathering(usuario.id).subscribe( datos => {
        sessionStorage.setItem('usuario',JSON.stringify(datos));
        console.log("user",datos);
        usuario = datos;
        this.usuario.nombre = usuario.firstName;
        this.usuario.apellido = usuario.lastName;
        let empresaId = usuario.empresaId;

        this.empresaService.listarById(empresaId).subscribe( empresa =>{
          console.log(empresa);
          var jerarquia = JSON.stringify(empresa.jerarquia);
          sessionStorage.setItem('jerarquia', JSON.stringify(jerarquia));
          sessionStorage.setItem('empresa', JSON.stringify(empresa) );
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
