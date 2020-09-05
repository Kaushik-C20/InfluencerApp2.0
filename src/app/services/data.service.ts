import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
declare var swal;

@Injectable()
export class DataService {
  canOpen = {
    loginPage: true,
  };
  selectedCountryCode;
  userAlreadyRegistered;
  baseUrl = 'https://dev.shopcom.in/hashtag/shopcom-dev/';
  private loginUserURL = 'public/find-user-id-by-contact';
  registeruserURL = 'public/register-user';
  registerInfluencerURL = 'public/register-influencer';
  getInfluencerIdForUserIDURL = 'public/find-all-influencer-by-user-id';
  getEndorsedCampaigns = 'public/my-store/';
  private allHomeCampaignURL = 'public/home-campaign';
  getCampaignDetailsBasedonIdURL = 'public/campaign-by-id-app/'; // id in the url to be added
  endorseProductURL = 'public/endorse-product-by-influencer';
  private declineEndorseProductURL = 'public/decline-endorse-product';
  private updateUserProfileURL = 'public/update-user';
  private getuserProfileURL = 'public/user-profile';
  private addBankAccountURL = 'public/create-razor-fund-bank-account';
  private withdrawPaymentURL = 'public/payout-by-user';
  private getBankAccountDetailURL = 'public/find-account-details-by-user-id';

  serverURL = 'https://wobb.ai/api/';
  environment = 'production';
  phone;

  userID;
  platformInfluencerAccount = {
    instagram: 0,
  };
  influencerAccounts: Array<influencerProfile> = [];
  loader;
  // environment = 'development';

  // id;

  homePage = {
    selectedCampaign: undefined,
  };

  myStore = {
    endorsedCampaigns: [],
    selectedEndoresedCampaign: undefined,
    selectedDeliverable: undefined,
  };

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public router: Router
  ) {
    // this.environment = 'development';
    this.serverURL = 'https://localhost:8080/api/';
    // this.serverURL = 'https://192.168.0.158:8080/api/';
    if (localStorage.getItem('wobbUserID')) {
      this.userID = localStorage.getItem('wobbUserID');
    }
  }

  request(method, endpoint, data, headers = {}) {
    if (method === 'get') {
      return new Promise((resolve, reject) => {
        this.http.get(this.serverURL + endpoint, { params: data }).subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else if (method === 'post') {
      return new Promise((resolve, reject) => {
        this.http.get(this.serverURL + endpoint, { ...data }).subscribe(
          (success) => {
            resolve(success);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  }

  saveItem(itemName, itemObject) {
    console.log(localStorage.setItem(itemName, JSON.stringify(itemObject)));
  }
  getItem(itemName): any {
    return JSON.parse(localStorage.getItem(itemName));
  }
  showSwal(title, type, body = '') {
    swal(title, body, type);
  }

  getInfluencerAccounts() {
    // GET INFLUENCERS . CALLED FROM AUTO LOGIN AND AFTER REGISTERING A NEW INFLUENCER ACCOUNT.
    this.http
      .post(this.baseUrl + this.getInfluencerIdForUserIDURL, {
        user_id: this.userID,
      })
      .subscribe(
        (data: any) => {
          console.log('GET INFLUENCERS BY USER ID  ', data);
          this.influencerAccounts = data.influencers;

          // SET INSTAGRAM INFLUENCER ID ALSO
          this.setInstagramInfluencerId();

          // this.router.navigate(['/tabs']);
        },
        (err) => {
          alert('Connection Error');
          console.log(err);
        }
      );
  }

  updateEndoresedCampaigns() {
    this.http
      .get(this.baseUrl + this.getEndorsedCampaigns + this.userID)
      .subscribe((data: any) => {
        this.myStore.endorsedCampaigns = [];
        // console.log('ENDORESED CAMPAIGNS', data);
        this.myStore.endorsedCampaigns = data.endorsed_campaigns;

        // CALCULATE AND ADD EACH DELIVERABLE STATUS . RIGHT NOW ITS WRONG , detailed_demographic IS OBJECT BUT NOT ARRAY

        this.myStore.endorsedCampaigns.forEach((campaign) => {
          campaign.detailed_demographic.forEach((deliverable) => {
            deliverable.deliverable_status = 'not submited';
            campaign.posts.forEach((post) => {
              if (deliverable.deliverable_name === post.post_type) {
                deliverable.deliverable_status = post.review_status;

                if (post.review_status == 'rejected') {
                  deliverable.deliverable_reject_reason = post.reject_reason;
                }
              }
            });
          });
        });

        console.log(
          'ADDED STATUS IN DELIVERABLE',
          this.myStore.endorsedCampaigns
        );
      });
  }

  setInstagramInfluencerId() {
    // let instagramInfluecerId = 0;
    this.platformInfluencerAccount.instagram = 0;
    this.influencerAccounts.forEach((element) => {
      if (element.platform === 'instagram') {
        // alert('Found insta user');
        // this.getUserData(element.instaUserName, false);
        // save this influencer id in dataservice to use it create gig page

        this.platformInfluencerAccount.instagram = element.id;
        return false;
      }
    });
    return this.platformInfluencerAccount.instagram;
  }

  logout() {
    // clear the wobbUserID from localstore
    this.canOpen.loginPage = true;

    localStorage.clear();
    this.userID = undefined;
    this.router.navigate(['/login']);
  }

  async startLoader() {
    this.loader = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Fetching Data...',
      // duration: 2000
    });

    this.loader.present();
  }
  stopLoader() {
    this.loader.dismiss();
  }
}

interface influencerProfile {
  id: number;
  user_id: number;
  social_id: string;
  social_name: string;
  platform: string;
  influencer_store_link: string;
  platform_access_token: string;
  app_access_token: string;
  followers: number;
  engagement: number;
  avg_likes?: any;
  avg_comments?: any;
  avg_video_view_count?: any;
  number_of_post: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  influencer_id: number;
}
