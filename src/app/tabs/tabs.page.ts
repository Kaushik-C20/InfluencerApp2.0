import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tabSelected = this.router.url.split('/')[2];
  constructor(public router: Router) {}

  ngOnInit() {}
  profileClicked() {
    this.tabSelected = 'profile';
  }
  homeClicked() {
    this.tabSelected = 'home';
  }
  notificationClicked() {
    this.tabSelected = 'notification';
  }
  exploreClicked() {
    this.tabSelected = 'explore';
  }
  storeClicked() {
    this.tabSelected = 'store';
  }
  settingClicked() {
    this.tabSelected = 'setting';
  }
}
