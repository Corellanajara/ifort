import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  constructor(public navCtrl: NavController,private http:HTTP) {
  }
  getChain(){
    this.http.get('http://localhost:3000/chain',
    {
    },
    {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(data => {
      alert(data.data);
    }).catch(error => {
      alert(error.status);
    });

  }

}
