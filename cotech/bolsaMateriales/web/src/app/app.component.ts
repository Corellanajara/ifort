import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  estado = true;
  title = 'plataforma';
  menus = [{titulo:'Home'},{titulo:'Ofertas'},{titulo:'Demandante'},{titulo:'Transportistas'}];
}
