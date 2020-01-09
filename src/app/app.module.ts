import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PreguntaPage } from './evaluacion/pregunta/pregunta.page';
import { CrudPage } from './evaluacion/pregunta/crud/crud.page';

import { AuthService } from './_servicios/auth.service';
import { MenusService } from './_servicios/menu.service';
import { UserService } from './_servicios/user.service';
import { EmpresaService } from './_servicios/empresas.service';
import { EvaluacionesService } from './_servicios/evaluaciones.service';

import { PermisosPage } from './administrador/usuarios/permisos/permisos.page';
import { AsignarPage } from './administrador/usuarios/asignar/asignar.page';
import { ImportarPage } from './administrador/usuarios/importar/importar.page';
import { ImportarPageEvaluacion } from './evaluacion/importar/importar.page';
import { ImportarPagePregunta } from './evaluacion/pregunta/importar/importar.page';
import { InstrumentoPage } from './evaluaciones/instrumento/instrumento.page';
import { RespuestaPage } from './evaluaciones/instrumento/respuesta/respuesta.page';

@NgModule({
  declarations: [AppComponent, RespuestaPage, InstrumentoPage,ImportarPageEvaluacion,ImportarPagePregunta,ImportarPage, PreguntaPage,AsignarPage,PermisosPage,CrudPage],
  entryComponents: [ PreguntaPage, RespuestaPage, InstrumentoPage,ImportarPageEvaluacion,ImportarPagePregunta,ImportarPage,AsignarPage,PermisosPage,CrudPage],
  imports: [
    BrowserModule,
    FormsModule,
    NgCircleProgressModule.forRoot(),
    TreeModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    AuthService,
    MenusService,
    EvaluacionesService,
    EmpresaService,
    UserService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
