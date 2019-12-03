import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  /*
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'evaluacion',
      url: '/evaluacion',
      icon: 'document'
    },
    {
      title:'Administrador',
      url:'/administrador',
      icon:'folder-open'
    }
  ];*/

  constructor(
    private menuController : MenuController,
    private router : Router,
    private events: Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
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
    this.router.navigate(['login']);
  }
  initializeApp() {
    let menus = JSON.parse(sessionStorage.getItem('menus'));
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
