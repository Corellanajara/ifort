import { Component, OnInit } from '@angular/core';
import { MenusService } from '../../_servicios/menu.service';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.page.html',
  styleUrls: ['./menus.page.scss'],
})
export class MenusPage implements OnInit {

  menus = [];

  constructor(private menusService :  MenusService) { }

  ngOnInit() {
    this.menusService.listar().subscribe( data => {
      console.log(data);
      this.menus = data;
    });
  }


}
