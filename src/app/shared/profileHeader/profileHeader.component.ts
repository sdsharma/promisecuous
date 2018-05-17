import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, ViewState } from '../../store/state';
import { AppActions } from '../../store/actions/appActions';
import { Router } from '@angular/router';

@Component({
  selector: 'profileHeader',
  templateUrl: './profileHeader.component.html',
  styleUrls: ['./profileHeader.component.scss']
})
export class ProfileHeaderComponent {

    constructor(private store: Store<AppState>, private router: Router) { }

  @Input() imageUrl: string;
  @Input() name: string;
 
  value= "";

  changePic = function(imgUrl) {
    console.log("Changing picture!");
    this.i;
  }

  onKey = function(event: any) { // without type info
    this.value += event.target.value + ' | ';
    console.log(this.value);
  }
  
  

}
