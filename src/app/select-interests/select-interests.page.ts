import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-select-interests',
  templateUrl: './select-interests.page.html',
  styleUrls: ['./select-interests.page.scss'],
})
export class SelectInterestsPage implements OnInit {
  constructor(
    public userDetails: UserDetailsService,
    public navCtrl: NavController
  ) {
    // add is check property to all
    this.userDetails.data.allInterests.forEach((parent) => {
      parent.children.forEach((child) => {
        // THIS IS BEING ADDED FROM HERE . YOU WONT BE GETTING THIS FROM API

        // check if this id is present in interest array

        child.isChecked = this.userDetails.data.interests.includes(
          child.id + ''
        );

        // child.isChecked = false;
      });
    });
  }

  ngOnInit() {}

  select() {
    // console.log(this.userDetails);
    // reset the interest array
    this.userDetails.data.interests = [];
    // add all the ischeck true id's
    this.userDetails.data.allInterests.forEach((parent) => {
      parent.children.forEach((child) => {
        if (child.isChecked) {
          this.userDetails.data.interests.push(child.id + '');
        }
      });
    });

    this.navCtrl.pop();
  }
}
