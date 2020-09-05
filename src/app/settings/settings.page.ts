import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserDetailsService } from '../services/user-details.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  bankCanEdit = false;
  constructor(
    public dataService: DataService,
    public activatedRoute: ActivatedRoute,
    public iab: InAppBrowser,
    public userDetailsService: UserDetailsService,
    public router: Router,
    public http: HttpClient
  ) {
    this.userDetailsService.updateData();
    // console.log(this.activatedRoute.snapshot.params);
    // check if you get instagram token
  }
  // ionViewDidEnter() {
  //   // alert('asdf');
  // }

  updateBankDetails() {
    this.bankCanEdit = true;
  }
  saveBankDetails() {
    this.bankCanEdit = false;
    this.http
      .put(this.dataService.serverURL + 'bank', {
        userId: this.dataService.userID,
        bankName: this.userDetailsService.data.bankDetails.bank_name,
        ifsc: this.userDetailsService.data.bankDetails.ifsc,
        accountNumber: this.userDetailsService.data.bankDetails.account_number,
      })
      .subscribe(
        (data: any) => {
          console.log('PUT BANK ', data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  updateProfileDetails() {
    this.userDetailsService.flowFromLogin = false;
    this.router.navigate(['/update-details']);
  }
  ngOnInit() {
    // console.log(window.location);
    // setTimeout(() => {
    //   // window.location.href = 'https://www';
    // }, 5000);
    // alert(JSON.stringify(window.location));
    // setTimeout(() => {
    //   let redirectUrl =
    //     this.dataService.serverURL + 'influencer/instagram/app/connect';
    //   const browser = this.iab.create(
    //     `https://api.instagram.com/oauth/authorize?client_id=572433830162013&redirect_uri=${redirectUrl}&scope=user_profile,user_media&response_type=code`,
    //     '_self',
    //     'location=no'
    //   );
    // }, 2000);
  }

  terms() {
    window.open('https://wobb.in/terms_and_conditions');
  }

  privacyPolicy() {
    window.open('https://wobb.in/privacy_policy');
  }
  contactUs() {
    window.open('https://wa.me/919643643634');
  }
}
