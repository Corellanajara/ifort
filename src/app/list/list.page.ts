import { Component, OnInit } from '@angular/core';
import { UserService } from '../_servicios/user.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  evaluaciones = [];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private userService : UserService) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    this.traerDatos();
  }
  traerDatos(){
    let userId = sessionStorage.getItem('userId');
    this.userService.gathering(userId).subscribe( datos => {
      this.evaluaciones = datos.evaluaciones;
      console.log(this.evaluaciones);

    })
  }
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
