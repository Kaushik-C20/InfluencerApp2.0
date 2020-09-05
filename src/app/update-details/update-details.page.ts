import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { UserDetailsService } from '../services/user-details.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.page.html',
  styleUrls: ['./update-details.page.scss'],
})
export class UpdateDetailsPage implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  options = {
    types: ['(cities)'],

    // componentRestrictions: { country: 'UA' },
  };

  public handleAddressChange(address: Address) {
    // Do some stuff
    console.log('HANDLED ADDRESS ', address);

    // ITERATE THROUGH ARRAY
    address.address_components.forEach((element) => {
      if (element.types.includes('locality')) {
        this.userDetailsService.data.location.city = element.long_name;
      }
      if (element.types.includes('administrative_area_level_1')) {
        this.userDetailsService.data.location.state = element.long_name;
      }
      if (element.types.includes('country')) {
        this.userDetailsService.data.location.country = element.long_name;
      }
    });
  }

  constructor(
    public userDetailsService: UserDetailsService,
    public http: HttpClient,
    public dataService: DataService,
    public router: Router,
    public navCtrl: NavController
  ) {
    this.userDetailsService.updateData();
  }

  ngOnInit() {}

  update(connectInstagram) {
    // will update
    this.http
      .put(this.dataService.serverURL + 'user/data', {
        data: this.userDetailsService.data,
        userId: this.dataService.userID,
      })
      .subscribe(
        (data: any) => {
          console.log('UPDATE USER DATA ', data);
          if (connectInstagram) {
            this.connectInstagram();
          } else {
            // this.router.navigate(['/tabs/settings']);
            this.navCtrl.pop();
            this.userDetailsService.updateData();
          }
        },
        (err) => {
          console.log(err);
          alert('Connection Err');
        }
      );
  }
  skip() {
    // will simply go to tabs/home
    this.router.navigate(['/tabs/home']);
  }
  connectInstagram() {
    // will go to settings and call connection with insta from a service
    this.router.navigate(['tabs/settings']);
    this.userDetailsService.connectInstagram();
  }
  addInterest() {
    this.router.navigate(['/select-interests']);
  }
}
