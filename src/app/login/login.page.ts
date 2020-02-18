import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_servicios/auth.service';
import { UserService } from '../_servicios/user.service';
import { EmpresaService } from '../_servicios/empresas.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  tipo=1;

  constructor(
    private app : AppComponent,
    private events : Events,
    private userService : UserService ,
    private empresaService : EmpresaService,
    private router : Router,
    private loadingController: LoadingController,
    private authService : AuthService) {
      var menu = document.querySelector('ion-menu');
      menu.hidden = true;
    }

  ngOnInit() {
    if( sessionStorage.getItem('empresaId')){
      this.router.navigate(['home']);
    }
  }
  login(form){
    let self = this;
    this.cargando();
    try{
      this.authService.login(form.value).subscribe((res)=>{
  //      console.log(res);
        let accessToken = res.accessToken;
        let refreshToken = res.refreshToken;
        let userId = res.userId;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        sessionStorage.setItem('userId', userId);
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
            this.app.usuario.nombre = datos.firstName;
            this.app.usuario.apellido = datos.lastName;
            sessionStorage.setItem('menus',JSON.stringify(datos.menus));
            sessionStorage.setItem('asignado',JSON.stringify(asignado));
            sessionStorage.setItem('evaluaciones',JSON.stringify(datos.evaluaciones));
            this.events.publish('user:login', menus);
            sessionStorage.setItem('empresa', JSON.stringify(empresa));
            var jerarquia = JSON.stringify(empresa['jerarquia']);
            sessionStorage.setItem('jerarquia', JSON.stringify(jerarquia));

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
      duration: 5000,
      message: 'Iniciando sesión<ion-spinner></ion-spinner>',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

}
