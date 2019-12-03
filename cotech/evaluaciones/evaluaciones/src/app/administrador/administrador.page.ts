import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  constructor(private location:Location,private router:Router) { }

  ngOnInit() {
  }
  public navegar(link){
    this.router.navigate([link]);
  }
  dismiss() {
      this.location.back();
  }
}
