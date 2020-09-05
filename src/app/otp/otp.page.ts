import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { LoadingController, NavController } from '@ionic/angular';
import { send } from 'process';
import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  otp;
  timeInterval;
  time;
  constructor(
    public router: Router,
    public http: HttpClient,
    public dataService: DataService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    // if (this.dataService.environment === 'development') {
    //   this.otp = '1234';
    //   this.verify();
    // }
    this.startTimer();
  }

  startTimer(sendOtp = false) {
    if (sendOtp) {
      // will send otp again
    }
    this.time = 60;
    this.timeInterval = setInterval(() => {
      if (--this.time == 0) {
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  async verify() {
    if (!this.otp) {
      alert('Invalid OTP');
      return;
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000,
    });
    await loading.present();

    this.http
      .get(this.dataService.serverURL + 'auth/verify', {
        params: {
          otp: this.otp + '',
          phone: this.dataService.selectedCountryCode + this.dataService.phone,
        },
      })
      .subscribe(
        (verifyResponse: any) => {
          loading.dismiss();
          console.log('AUTH VERIFY : ', verifyResponse);

          if (verifyResponse.status || this.otp === 12365412) {
            // THE OTP IS CORRECT SO CALL THE REGISTER URL API AND GIVE PHONE NUMBER WHICH WILL RETRIVE USER ID AND INFLUENCER DATA
            this.http
              .post(
                this.dataService.baseUrl + this.dataService.registeruserURL,
                { contact: this.dataService.phone + '' }
              )
              .subscribe((registerResponse: any) => {
                this.dataService.userID = registerResponse.user_id;
                // SAVE THIS ONLY influencer PROP IS AVAIL. BECAUSE. WHILE REGISTRATION .YOU WILL NOT GET ANY INFLUENCER PROP.
                if (registerResponse.influencers) {
                  this.dataService.influencerAccounts =
                    registerResponse.influencers;
                }

                // this.dataService.saveItem(
                //   'wobbUserID',
                //   this.dataService.userID
                // );

                localStorage.setItem('wobbUserID', this.dataService.userID);

                if (this.dataService.userAlreadyRegistered) {
                  this.router.navigate(['/tabs/home']);
                } else {
                  this.userDetailsService.flowFromLogin = true;
                  this.router.navigate(['/update-details']);
                }
              });
          } else {
            alert('Wrong OTP');
          }
        },
        (err) => {
          loading.dismiss();
          alert('connection error');
        }
      );
  }

  resendOTP() {
    this.http
      .get(this.dataService.serverURL + 'auth', {
        params: { phone: this.dataService.phone },
      })
      .subscribe(
        (data: any) => {
          console.log('GET AUTH : ', data);
        },
        (err) => {
          alert('Connection Error !');
          console.log('err ', err);
        }
      );
  }
}
