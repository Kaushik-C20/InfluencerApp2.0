import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-infoslider',
  templateUrl: './infoslider.page.html',
  styleUrls: ['./infoslider.page.scss'],
})
export class InfosliderPage implements OnInit {
  constructor(public router: Router, public dataService: DataService) {
    if (this.dataService.getItem('tutorialShowed')) {
      this.continue();
    }
  }

  ngOnInit() {
    if (this.dataService.environment === 'development') {
      this.continue();
    }
    this.dataService.saveItem('tutorialShowed', { status: true });
  }

  continue() {
    this.router.navigate(['/login']);
    // alert("will go to tab page");
  }
}
