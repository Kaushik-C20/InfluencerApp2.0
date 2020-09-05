import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-store-campaign-details',
  templateUrl: './my-store-campaign-details.page.html',
  styleUrls: ['./my-store-campaign-details.page.scss'],
})
export class MyStoreCampaignDetailsPage implements OnInit {
  data = [];
  constructor(
    public dataService: DataService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {}

  ngOnInit() {
    // console.log(
    //   'SELECTED ENDORESED CAMPAIGN : ',
    //   this.dataService.myStore.selectedEndoresedCampaign
    // );

    // console.log(this.activatedRoute.snapshot.params);
    this.getDeliverables();
  }

  getDeliverables() {
    this.http
      .get(this.dataService.serverURL + 'post', {
        params: {
          userId: this.dataService.userID,
          campaignId: this.activatedRoute.snapshot.params.campaignId,
        },
      })
      .subscribe(
        (data: any) => {
          console.log('GET POSTS ', data);

          this.data = data.posts;
        },
        (err) => {
          alert('Connection Error');
        }
      );
  }
  // deliverableClicked(index) {
  //   this.dataService.myStore.selectedDeliverable = this.dataService.myStore.selectedEndoresedCampaign.detailed_demographic[
  //     index
  //   ];
  //   this.router.navigate(['/my-store-campaign-complete']);
  // }

  complete(postId) {
    this.router.navigate([`/my-store-campaign-complete/${postId}`]);
  }
}
