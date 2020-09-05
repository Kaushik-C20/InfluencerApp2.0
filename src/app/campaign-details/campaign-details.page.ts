import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { CampserviceService } from '../services/campservice.service';
import { CampaignDescriptionPage } from '../campaign-description/campaign-description.page';
import { CampaignDeliverablesPage } from '../campaign-deliverables/campaign-deliverables.page';
import { CampaignEligibilityPage } from '../campaign-eligibility/campaign-eligibility.page';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchAll } from 'rxjs/operators';
import { DataService } from '../services/data.service';
declare var swal;
@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.page.html',
  styleUrls: ['./campaign-details.page.scss'],
})
export class CampaignDetailsPage implements OnInit {
  campaignDetailsData: any = undefined;
  deliverables = [];
  selectedProductId = 1;
  constructor(
    private campserv: CampserviceService,
    public modalController: ModalController,
    public popoverController: PopoverController,
    public route: ActivatedRoute,
    public router: Router,
    public dataService: DataService,
    public http: HttpClient,
    public cd: ChangeDetectorRef
  ) {}

  products: any;

  ngOnInit() {
    // this.id = this.campserv.id;
    // this.curr_camp = this.campserv.curr_camp;
    // this.products = this.curr_camp['products'];

    console.log(
      'SELECTED CAMPAIGN ',
      this.dataService.homePage.selectedCampaign
    );

    this.fetch();
  }

  fetch() {
    const campaignId = this.route.snapshot.params.id;

    this.http
      .get(
        'https://dev.shopcom.in/hashtag/shopcom-dev/public/campaign-by-id-app/' +
          campaignId
      )
      .subscribe(
        (data) => {
          console.log('GET CAMPAIGN DETAILS: ', data);

          this.campaignDetailsData = data;
          this.products = this.campaignDetailsData.products;
          // CALCULATE THE FIRST PRODUCT ID AND ASSIGN IT
          if (this.products.length) {
            this.selectedProductId = this.products[0].id;
          }
          // alert(this.selectedProductId);
          // CALCULATE DELIVERABLES ARRAY

          for (const key in this.campaignDetailsData.detailed_demographic) {
            if (this.campaignDetailsData.detailed_demographic[key] === '1') {
              this.deliverables.push({
                type: key,
                value: this.campaignDetailsData.detailed_demographic[key],
              });
            }
          }

          // this.curr_camp = data;
        },
        (err) => {
          console.log('ERROR-Status:', err);
        }
      );
  }

  async presentDescription() {
    this.campserv.currentModal = await this.modalController.create({
      component: CampaignDescriptionPage,
      // swipeToClose: true,
      mode: 'md',
    });
    return await this.campserv.currentModal.present();
  }

  async presentEligibility() {
    this.campserv.currentModal = await this.modalController.create({
      component: CampaignEligibilityPage,
      // swipeToClose: true,
      mode: 'md',
    });
    return await this.campserv.currentModal.present();
  }

  async presentDeliverables(ev: any) {
    this.campserv.currentPopover = await this.popoverController.create({
      component: CampaignDeliverablesPage,
      event: ev,
      translucent: false,
      mode: 'md',
      animated: true,
    });
    return await this.campserv.currentPopover.present();
  }

  endorse() {
    this.http
      .post(this.dataService.serverURL + 'campaign/endorse', {
        userId: this.dataService.userID,
        campaignId: this.campaignDetailsData.id,
      })
      .subscribe(
        (data: any) => {
          console.log('ENDORSE RESPONSE ', data);
          swal(data.message, '', data.status ? 'success' : 'error');
        },
        (err) => {
          console.log('ENDORSE ERR', err);
          // alert('Connection Error !');
        }
      );
  }
  endorseOld() {
    this.dataService.setInstagramInfluencerId();
    if (!this.dataService.platformInfluencerAccount.instagram) {
      swal(`Connect Your Instagram`, '', 'warning');
      this.router.navigate(['/tabs/profile']);
      return;
    }

    if (this.products.length) {
      if (this.selectedProductId === 1) {
        swal('Select Product First', '', 'warning');
        return;
      }
    }

    // let earn: number = this.campaignData['influencer_earning']
    //   ? this.campaignData['influencer_earning']
    //   : 1000;
    // this.campserv.saveToearn(earn);
    // switchAll

    let influencerId = 1;
    if (this.campaignDetailsData.platform == 'instagram') {
      influencerId = this.dataService.platformInfluencerAccount.instagram;
    }
    this.http
      .post(this.dataService.baseUrl + this.dataService.endorseProductURL, {
        influencer_id: influencerId,
        campaign_id: this.campaignDetailsData.id,
        // sub_campaign_id: 1,
        // tg_id: 1449,
        product_id: this.selectedProductId,
      })
      .subscribe((data: any) => {
        console.log('ENDORSE CAMPAIGN RESPONSE : ', data);
        swal(data.message, '', data.success ? 'success' : 'error');
      });
    // this.router.navigate(['/tabs/store']);
  }
  openLink(link, productId) {
    this.selectedProductId = productId;
    // alert(this.selectedProductId);
    // this.cd.detectChanges();
    window.open(link, '_blank');
  }
}
