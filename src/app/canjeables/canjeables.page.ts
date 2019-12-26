import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-canjeables',
  templateUrl: './canjeables.page.html',
  styleUrls: ['./canjeables.page.scss'],
})
export class CanjeablesPage implements OnInit {
  productos = new Array(4);
  clicked = []
  constructor() { }

  ngOnInit() {
    for(let i = 0 ; i < this.productos.length ; i++){
      this.clicked[i] = "";
    }
  }

  cambiarEstilo(i){
      if(this.clicked[i] == ""){
        this.clicked[i] = "clicked";
      }else{
        this.clicked[i] = "";
      }
  }

}
