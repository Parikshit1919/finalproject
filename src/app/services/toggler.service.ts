import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {
  hideMenu : boolean = false;
  hideSideMenu : boolean = false;
  
  toggleMenu():void {
  this.hideMenu = !this.hideMenu;  
  }
  toggleSideNav(): void {
    this.hideSideMenu = !this.hideSideMenu;
   
  }
  constructor() { }
}
