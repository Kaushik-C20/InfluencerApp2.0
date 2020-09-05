import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Sim } from '@ionic-native/sim/ngx';
import { ActionSheetController } from '@ionic/angular';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone;
  type = 'influencer';

  countryCode = '91';
  countryCodes = ['91', '44', '1'];
  codeSelected(code) {
    this.countryCode = code;
  }
  constructor(
    public router: Router,
    public dataService: DataService,
    public http: HttpClient,
    private sim: Sim,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController
  ) {
    // this.dataService.saveItem('test', { profile: 1 });
    // alert(this.dataService.getItem('asdf'));
  }

  getSimInfo() {
    this.sim.getSimInfo().then(
      (info) => console.log('Sim info: ', info),
      (err) => console.log('Unable to get sim info: ', err)
    );
  }

  ngOnInit() {
    // CHECK IF THE USER IS ALREADY LOGGED IN
    // if (this.dataService.getItem('wobbUserID')) {
    //   this.dataService.userID = this.dataService.getItem('wobbUserID');
    if (localStorage.getItem('wobbUserID')) {
      this.dataService.userID = localStorage.getItem('wobbUserID');
      // CALL THIS BECAUSE THIS IS THE AUTO LOGIN FUNCTIONALITY .
      // YOU NEED TO GET INFLUECER ACCOUNTS MANUALLY.ON NORMAL LOGIN IT IS RETRIEVED AND SET
      // this.dataService.getInfluencerAccounts();
      // this.router.navigate(['/tabs']);
      this.router.navigate(['/tabs/home']);
    } else {
      // NOT AUTO LOGIN
    }
  }

  async login() {
    if (!this.phone || (this.phone + '').length < 10) {
      alert('Enter Correct Phone Number !');
      return;
    }

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading',
      // duration: 2000,
    });
    await loading.present();

    // ADD THE COUNTRY CODE
    this.http
      .get(this.dataService.serverURL + 'auth', {
        params: { phone: this.countryCode + this.phone },
      })
      .subscribe(
        (data: any) => {
          loading.dismiss();
          console.log('AUTH RESPONSE : ', data);

          this.dataService.selectedCountryCode = this.countryCode;
          this.dataService.phone = this.phone;
          this.dataService.userAlreadyRegistered = data.registered;

          this.router.navigate(['/otp']);
        },
        (err) => {
          loading.dismiss();
          alert('Connection Error !');
          console.log('err ', err);
        }
      );
  }
}
