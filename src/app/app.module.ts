import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { TreeModule } from 'angular-tree-component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
//import { Push } from '@ionic-native/push/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PreguntaPage } from './evaluacion/pregunta/pregunta.page';
import {PreguntaEncuestaPage } from './encuestas/pregunta/pregunta.page';
import { CrudPage } from './evaluacion/pregunta/crud/crud.page';
import { CrudEncuestaPage } from './encuestas/pregunta/crud-encuesta/crud-encuesta.page';
import { EscojerEncuestasPage } from './encuestas/escojer/escojer.page';
import { AuthService } from './_servicios/auth.service';
import { MenusService } from './_servicios/menu.service';
import { UserService } from './_servicios/user.service';
import { EmpresaService } from './_servicios/empresas.service';
import { EvaluacionesService } from './_servicios/evaluaciones.service';
import { EncuestaService } from './_servicios/encuestas.service';
import { ProductoService } from './_servicios/encuestas.service';
import { NotificacionesService } from './_servicios/encuestas.service';
import { CorreosService } from './_servicios/correos.service';
import { HistorialPage } from './evaluaciones/historial/historial.page';
import { PermisosPage } from './administrador/usuarios/permisos/permisos.page';
import { AsignarPage } from './administrador/usuarios/asignar/asignar.page';
import { ProductosPage } from './administrador/usuarios/productos/productos.page';
import { ImportarPage } from './administrador/usuarios/importar/importar.page';
import { ImportarPageEvaluacion } from './evaluacion/importar/importar.page';
import { ImportarPagePregunta } from './evaluacion/pregunta/importar/importar.page';
import { InstrumentoPage } from './evaluaciones/instrumento/instrumento.page';
import { EscojerPage } from './evaluacion/escojer/escojer.page';
import { RespuestaPage } from './evaluaciones/instrumento/respuesta/respuesta.page';
import { ResponderPage } from './encuesta/responder/responder.page';
import { ListPage } from './list/list.page';
import { GraficoPage } from './list/grafico/grafico.page';

@NgModule({
  declarations: [AppComponent,EscojerEncuestasPage,ResponderPage,ProductosPage,EscojerPage,GraficoPage,HistorialPage,ListPage, CrudEncuestaPage, RespuestaPage, InstrumentoPage,ImportarPageEvaluacion,ImportarPagePregunta,ImportarPage,PreguntaEncuestaPage, PreguntaPage,AsignarPage,PermisosPage,CrudPage],
  entryComponents: [ CrudEncuestaPage,EscojerEncuestasPage,ListPage,GraficoPage,ProductosPage,EscojerPage,HistorialPage,PreguntaEncuestaPage,PreguntaPage,ResponderPage, RespuestaPage, InstrumentoPage,ImportarPageEvaluacion,ImportarPagePregunta,ImportarPage,AsignarPage,PermisosPage,CrudPage],
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
    LocalNotifications,
    AuthService,
    ScreenOrientation,
    //Push,
    MenusService,
    CorreosService,
    EncuestaService,
    NotificacionesService,
    ProductoService,
    EvaluacionesService,
    EmpresaService,
    UserService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
