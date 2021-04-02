import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TogglerService {
  hideMenu : boolean = false;
  hideSideMenu : boolean = false;
  // METHOD TO HIDE TOP MENU
  toggleMenu():void 
  {
  this.hideMenu = !this.hideMenu;  
  }
// METHOD TO HIDE SIDE MENU IN DASHBOARD
  toggleSideNav(): void
   {
    this.hideSideMenu = !this.hideSideMenu;
  }

  resetMenu():void{
    if(this.hideMenu === true)
    {
      this.hideMenu=false;
    }
  }
  constructor() { }
}
