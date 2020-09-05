import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';

import { ActionSheetController } from '@ionic/angular';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var RazorpayCheckout: any;
declare var swal: any;
@Component({
  selector: 'app-request-agig',
  templateUrl: './request-agig.page.html',
  styleUrls: ['./request-agig.page.scss'],
})
export class RequestAGigPage implements OnInit {
  profileFound;
  InstagramProfileData;
  userName;
  profilePicture;
  profileName;
  gigs = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public dataService: DataService,
    public actionSheetController: ActionSheetController
  ) {
    // alert(this.activatedRoute.snapshot.paramMap.get('username'));
    // FIRST CHECK IF THE USER NAME EXISTS OR NOT

    this.checkProfile();
  }

  checkProfile() {
    // alert(this.activatedRoute.snapshot.paramMap.get('username'));
    // this.dataService.startLoader();
    this.http
      .get(this.dataService.serverURL + 'influencer/check', {
        params: {
          username: this.activatedRoute.snapshot.paramMap.get('username'),
        },
      })
      .toPromise()
      .then((result: any) => {
        console.log('GET INFLUENCER CHECK ', result);
        // this.dataService.stopLoader();
        if (!result.status) {
          this.profileFound = false;
          alert('No Profile Found !');

          // REDIRECT TO WOBB.IN
          return;
        }
        this.profileFound = true;
        this.getUserData(result.data.social_name);
        // this.getGigs(result.data.id);
      })
      .catch((err) => {
        console.log('ERR GET INFLUENCER CHECK ', err);
        // this.dataService.stopLoader();
      });
  }

  ngOnInit() {}

  getGigs(influencerId) {
    this.http
      .get(this.dataService.serverURL + 'gig', {
        params: {
          influencerId: influencerId + '',
        },
      })
      .subscribe(
        (data: any) => {
          console.log('GET GIGS : ', data);
          this.gigs = data.data;
        },
        (err) => {
          console.log('ERROR GIGS :', err);
        }
      );
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Time Slot',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'July 9th 2020, 3:00 pm',

          icon: 'alarm-outline',
          handler: () => {
            this.pay();
            console.log('Delete clicked');
          },
        },
        {
          text: 'July 10th 2020, 12:00 pm',
          icon: 'alarm-outline',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'July 11th 2020, 10:00 am',
          icon: 'alarm-outline',
          handler: () => {
            console.log('Play clicked');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await actionSheet.present();
  }

  pay() {
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_6ToQGjBYMlrib6',
      // order_id: 'order_7HtFNLS98dSj8x',
      amount: '5000',
      name: 'foo',
      theme: {
        color: '#F37254',
      },
    };

    var successCallback = function (success) {
      swal('Gig Requested !', '', 'success');
      // alert('payment_id: ' + success.razorpay_payment_id);
      var orderId = success.razorpay_order_id;
      var signature = success.razorpay_signature;
    };

    var cancelCallback = function (error) {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.on('payment.success', successCallback);
    RazorpayCheckout.on('payment.cancel', cancelCallback);
    RazorpayCheckout.open(options);
  }

  async getUserData(userName, showSwal = true) {
    // const loading = await this.loadingCtrl.create({
    //   cssClass: 'my-custom-class',
    //   message: 'Fetching Data...',
    //   // duration: 2000
    // });

    // await loading.present();
    const instaURL = 'https://www.instagram.com/' + userName + '?__a=1';
    this.http.get(instaURL).subscribe(
      (data) => {
        console.log('instagram profile data ', data);

        this.InstagramProfileData = data;
        this.profilePicture = this.InstagramProfileData.graphql.user.profile_pic_url_hd;
        this.profileName = this.InstagramProfileData.graphql.user.full_name;
        this.userName = this.InstagramProfileData.graphql.user.username;
        // alert(this.userName);
        // updating username in database also

        // this.instagramConnected = true;

        // if (showSwal) {
        //   swal('Instagram Connected', '', 'success');
        // }
      },
      (error) => {
        // loading.dismiss();
        alert('Connection Error');
      }
    );
  }
}
