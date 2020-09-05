import { Component, OnInit } from '@angular/core';
import { CampserviceService } from '../services/campservice.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {
  endorsedCampaigns = [];
  constructor(
    private campserv: CampserviceService,
    public router: Router,
    public dataService: DataService,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute
  ) {
    console.log(this.activatedRoute.snapshot);

    // this.dataService.updateEndoresedCampaigns();
  }
  earn: number[] = this.campserv.sum;
  Money: number;

  // view(index) {
  //   this.dataService.myStore.selectedEndoresedCampaign = this.dataService.myStore.endorsedCampaigns[
  //     index
  //   ];

  //   this.router.navigate(['/my-store-campaign-details']);
  // }
  ionViewDidEnter() {
    this.getEndorsements();
  }
  view2(campaignId) {
    this.router.navigate([`/my-store-campaign-details/${campaignId}`]);
  }
  ngOnInit() {}

  getEndorsements() {
    this.http
      .get(this.dataService.serverURL + 'campaign/endorse', {
        params: { userId: this.dataService.userID },
      })
      .subscribe(
        (data: any) => {
          console.log('GET ENDORESE CAMPAIGNS ', data);
          this.endorsedCampaigns = data.endorsedCampaigns;

          this.endorsedCampaigns.forEach((element) => {
            const currentDate = moment(new Date());

            const endDate = moment(element.end_date.slice(0, 10));

            element.timeRemaining = currentDate.to(endDate);
          });
        },
        (err) => {
          alert('Connection Error');
          console.log(err);
        }
      );
  }
}
