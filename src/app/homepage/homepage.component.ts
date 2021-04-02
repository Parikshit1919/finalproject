import { Component, OnInit } from '@angular/core';
import {TogglerService} from '../services/toggler.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public sideNavService: TogglerService) {
    //unhide menu
    sideNavService.resetMenu();
   }

  ngOnInit(): void {
  }

}
