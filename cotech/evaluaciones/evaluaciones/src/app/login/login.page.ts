import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_servicios/auth.service';
import { UserService } from '../_servicios/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private events : Events,
    private userService : UserService ,
    private router : Router,
    private loadingController: LoadingController,
    private authService : AuthService) { }

  ngOnInit() {
  }
  login(form){
    let self = this;
    this.cargando();
    try{
      this.authService.login(form.value).subscribe((res)=>{
        console.log(res);
        let accessToken = res.accessToken;
        let refreshToken = res.refreshToken;
        let userId = res.userId;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userId', userId);
        self.userService.gathering(userId).subscribe( datos => {
          sessionStorage.setItem('menus',JSON.stringify(datos.menus));
          this.events.publish('user:login', datos.menus);
          self.router.navigate(['home']);
        })


      });
    }catch(err){
      console.log(err);
    }
  }
  async cargando() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Iniciando sesión<ion-spinner></ion-spinner>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
