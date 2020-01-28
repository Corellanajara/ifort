import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './_servicios/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  public usuario = {nombre:'',apellido:''};

  constructor(
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
      console.log("traigo al user");
      this.userService.gathering(usuario.id).subscribe( datos => {
        sessionStorage.setItem('usuario',JSON.stringify(datos));
        console.log("user",datos);
        usuario = datos;
        this.usuario.nombre = usuario.firstName;
        this.usuario.apellido = usuario.lastName;
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
