import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from 'src/app/common/data/routes';
import { RouteInfo } from 'src/app/common/models/route-info';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() menuItems!: RouteInfo[];
  
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((_) => {
      this.isCollapsed = true;
   });
  }
}
