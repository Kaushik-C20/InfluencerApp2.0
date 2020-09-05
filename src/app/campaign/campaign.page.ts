import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CampserviceService } from '../services/campservice.service';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss'],
})
export class CampaignPage implements OnInit, OnDestroy {
  showNoDataImage = false;
  filteredCampaigns = [];
  campList: any[] = [];
  subs: Subscription;
  constructor(
    private campserv: CampserviceService,
    private router: Router,
    public http: HttpClient,
    public dataService: DataService
  ) {}
  platform = 'all';

  ngOnInit() {
    this.campList = [];
    this.getCampaigns();
    this.dataService.canOpen.loginPage = false;
  }

  getCampaigns() {
    // alert(moment(new Date(2020, 7, 30)).toNow());
    // this.subs = this.campserv.getDetails().subscribe(
    this.http
      .post('https://dev.shopcom.in/hashtag/shopcom-dev/public/home-campaign', {
        influencer_id: this.dataService.platformInfluencerAccount.instagram,
        // influencer_id: this.dataService.userID + '',
      })
      .subscribe(
        (data) => {
          // RESET IT BEFORE
          this.campList = [];
          // USE THIS BECAUSE OF API WEIRD API RESPONSE. WILL CHANGE IT LATER ON

          // tslint:disable-next-line: forin
          for (const i in data) {
            this.campList.push(data[i]);

            const currentDate = moment(new Date());

            const endDate = moment(data[i].end_date.slice(0, 10));

            this.campList[i].timeRemaining = currentDate.to(endDate);
          }

          // console.log('GET CAMPAIGNS: ', data);

          console.log('CAMPAIGNS LIST', this.campList);
          this.setFilteredCampaigns();
        },
        (err) => {
          console.log('ERROR home-campaign', err);
        }
      );
  }
  setFilteredCampaigns() {
    // alert(this.platform);
    // RESET THE FILTERED CAMPAIGNS FIRST
    this.filteredCampaigns = [];
    this.campList.forEach((element) => {
      if (this.platform === 'all') {
        this.filteredCampaigns.push(element);
      } else if (this.platform === 'instagram') {
        if (element.platform === 'instagram') {
          this.filteredCampaigns.push(element);
        }
      } else if (this.platform === 'youtube') {
        if (element.platform === 'youtube') {
          this.filteredCampaigns.push(element);
        }
      } else if (this.platform === 'eligible') {
        // alert();
        const instaInfluencerId = this.dataService.platformInfluencerAccount
          .instagram;
        if (element.influencer === instaInfluencerId) {
          this.filteredCampaigns.push(element);
        }
      }
    });
    console.log('FILTERED CAMPS', this.filteredCampaigns);
    if (this.filteredCampaigns.length) {
      this.showNoDataImage = false;
    } else {
      this.showNoDataImage = true;
    }
  }
  selectCampaign(index: number) {
    // SAVE THE SELECTED CAMPAIGN IN DS
    this.dataService.homePage.selectedCampaign = this.filteredCampaigns[index];
    // this.campserv.store(this.campList[index]['id']);
    // this.campserv.store(this.filteredCampaigns[index].id);
    this.router.navigate([
      '/campaign-details',
      this.filteredCampaigns[index].id,
    ]);
  }
  ngOnDestroy() {
    // this.subs.unsubscribe();
  }

  // store(i: number) {
  //   if (i) {
  //     this.id = i;
  //   } else {
  //     this.id = this.route.snapshot.params['id'];
  //   }
  //   this.fetch();
  // }

  // fetch() {
  //   const urlcamp =
  //     'https://dev.shopcom.in/hashtag/shopcom-dev/public/campaign-by-id-app/' +
  //     this.id;
  //   this.http.get(urlcamp).subscribe(
  //     (data) => {
  //       this.curr_camp = data;
  //     },
  //     (err) => {
  //       console.log('ERROR-Status:', err);
  //     },
  //     () => {
  //       console.log(this.curr_camp);
  //       this.router.navigate(['/campaign-details', this.id]);
  //     }
  //   );
  // }
}
