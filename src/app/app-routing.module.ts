import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'evaluacion',
    loadChildren: () => import('./evaluacion/evaluacion.module').then( m => m.EvaluacionPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./administrador/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./administrador/menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'drag',
    loadChildren: () => import('./drag/drag.module').then( m => m.DragPageModule)
  },
  {
    path: 'canjeables',
    loadChildren: () => import('./canjeables/canjeables.module').then( m => m.CanjeablesPageModule)
  },
  {
    path: 'evaluaciones',
    loadChildren: () => import('./evaluaciones/evaluaciones.module').then( m => m.EvaluacionesPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
  {
    path: 'encuestas',
    loadChildren: () => import('./encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
