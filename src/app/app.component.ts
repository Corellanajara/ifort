import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
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


  constructor(
    //private push : Push,
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
  /*
  public pushNotifications(){
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push.createChannel({
     id: "testchannel1",
     description: "My first test channel",
     // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
     importance: 3
    }).then(() => console.log('Channel created'));

    // Delete a channel (Android O and above)
    this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

    // Return a list of currently configured channels
    this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // to initialize push notifications

    const options: PushOptions = {
       android: {},
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {},
       browser: {
           pushServiceURL: 'http://push.api.phonegap.com/v1/push'
       }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
  */
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
