import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DataService } from '../services/data.service';

declare var swal;
@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.page.html',
  styleUrls: ['./new-profile.page.scss'],
})
export class NewProfilePage implements OnInit {
  instagramData = {
    userName: '',
    accessToken: '',
    id: '',
  };
  InstagramProfileData: RootObject = undefined;
  profilePicture: any = 'assets/profile.png';
  profileName: any = 'Profile Name';
  userName: any = 'username';
  description = 'Some Description about yourself !';
  // instagramConnected = true;
  instagramConnected = false;
  instagramUserName;
  platformSegment = 'instagram';
  body;
  requestOptions;
  fullURL;
  gigs = [];
  url =
    'https://api.instagram.com/oauth/authorize?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&scope=user_profile,user_media&response_type=code';

  // tslint:disable-next-line: max-line-length
  // 'https://api.instagram.com/oauth/authorize?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&scope=user_profile,user_media&response_type=code';
  // https: //api.instagram.com/oauth/authorize?client_id=572433830162013&redirect
  // _uri = https://shopcom.in/instagramLogin/callback.php&scope=user_profile,user_media&response_type=code
  disappearInsta = false;
  InstaTokenData;

  ngOnInit() {
    // CHECK IF THE INFLUENCER ACCOUNT EXIST
    console.log(
      'GOT INFLUENCER ACC. FROM SERVICE : ',
      this.dataService.influencerAccounts
    );

    this.dataService.influencerAccounts.forEach((element) => {
      if (element.platform === 'instagram') {
        // alert('insta is already connected');
        this.getUserData(element.social_name, false);

        this.instagramConnected = true;
        return;
      }
    });
  }

  ionViewDidEnter() {
    // call this again because after creation of gig you will get on this page again
    this.dataService.influencerAccounts.forEach((element) => {
      if (element.platform === 'instagram') {
        // save this influencer id in dataservice to use it create gig page

        this.getGigs(element.id);
        return;
      }
    });
  }

  viewProfileImage() {
    if (!this.instagramConnected) {
      return;
    }
    this.photoViewer.show(this.profilePicture);
  }

  constructor(
    public dataService: DataService,
    private photoViewer: PhotoViewer,
    public iab: InAppBrowser,
    public http: HttpClient,
    public cd: ChangeDetectorRef,
    public loadingCtrl: LoadingController
  ) {
    console.log();

    // this.registerInstaAccount('vaibhav_fuke_');
    // this.cd.markForCheck();
  }

  connectInstagram() {
    // const redirectURI =
    // 'https%3A%2F%2Fshopcom.in%2FinstagramLogin%2Fcallback.php'; // "https://localhost:3000/
    const redirectURI = 'https://shopcom.in/instagramLogin/callback.php'; // "https://localhost:3000/
    this.url = this.url.replace('CLIENT-ID', '572433830162013');
    this.url = this.url.replace('REDIRECT-URI', redirectURI);

    // const browser = this.iab.create(this.url, '_blank');
    const browser = this.iab.create(this.url, '_blank', 'location=no');
    // alert(this.url);

    browser.on('loadstart').subscribe((data) => {
      console.log('LOADED URL', data.url);
      // if (data.url.includes('%3Fcode%3D')) {
      if (data.url.includes('%3Fcode%3D')) {
        // browser.close();
        let code: string = data.url.split('code=')[1];

        // LET LOOK AT IT LATER
        // tslint:disable-next-line: max-line-length
        // https://l.instagram.com/?u=https%3A%2F%2Fshopcom.in%2FinstagramLogin%2Fcallback.php%3Fcode%3DAQAaH_ZMUXsYAx3x8mIzCY7gFR7oCoWkcPrLTMtd5dEJ01I9Mtqpw4Q6yRjtbVg0_VwPpy_0rIwoNc2S-Y0whg1EZQMcuxo3_l73IDkfnG9bESdkUGliytSZqNmbBuXxVW7nbJdfRsCYsjeMF8HrQnIvXLMvyCH3897sse5xWIB7pHaPaqvCA2_Am7V5XYSSr-pBnmV-_7A3-TGkOxuhlUZRkFsz2PUpIR1CsY1jxYAKxg%23_&e=ATPlyBILpeKrWfz7ri-F5WbqWtbpDUKAhHoD8y3RNu-9dyoumr66EhOES8c-uFeYbKuh1zOcuYCmEL4UYh_o-j8&s=1

        // const mid = data.url.split('%3Fcode%3D');
        code = data.url.split('%3Fcode%3D')[1];
        // const mid2 = code.split('%23_&e')[0];
        code = code.split('%23_&e')[0];
        // code = code + '#_'; // will rmeove it later
        console.log(code);

        // code = code.substring(0, code.length - 2); // atripping #_
        console.log('FINAL CODE ', code);
        const formData = {
          client_id: '572433830162013',
          client_secret: 'b65f33146a68b4c38230a4cb2fab9204',
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectURI,
        };
        console.log('NEW FORM DATA ', formData);

        this.fullURL = 'https://api.instagram.com/oauth/access_token';
        this.body = new HttpParams();

        for (const key of Object.keys(formData)) {
          this.body = this.body.set(key, formData[key]);
        }
        this.requestOptions = {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
            // 'multipart/form-data; boundary=<calculated when request is sent>'
          ),
        };

        this.http
          .post(this.fullURL, this.body.toString(), this.requestOptions)
          .subscribe(
            (data2: any) => {
              console.log('ACCESS TOKEN RESPONSE ', data2);
              this.instagramData.accessToken = data2.access_token;

              this.instagramConnected = true;
              this.InstaTokenData = data;

              // data.user_id;
              // data.access_token;

              // "https://graph.instagram.com/17841428720793437"
              // const graphURL = 'https://graph.instagram.com/';
              // data2.user_id++;

              // if (
              //   data2.user_id === '17841428720793436' ||
              //   data2.user_id === 17841428720793436
              // ) {
              //   data2.user_id = '17841428720793437';
              // } else if (
              //   data2.user_id === '17841424010571912' ||
              //   data2.user_id === 17841424010571912
              // ) {
              //   data2.user_id = '17841424010571911';
              // }

              // tslint:disable-next-line: radix
              // data2.user_id =
              // data2.user_id++;
              // let newUserID = parseInt(data2.user_id);
              // newUserID++;

              // alert(data2.user_id);
              // data2.user_id = Number(data2.user_id) + 1;
              // alert(data2.user_id);
              // data2.user_id;

              const graphURL =
                'https://graph.instagram.com/' +
                'me' +
                // data2.user_id +
                '?fields=username&access_token=' +
                data2.access_token;
              // console.log('GRAPH API URL ', graphURL);

              this.http.get(graphURL).subscribe(
                (data3: any) => {
                  console.log('GRAPH API RESPONSE ', data3);
                  this.instagramData.userName = data3.username;
                  this.instagramData.id = data3.id;

                  browser.close();
                  this.getUserData(data3.username);
                  // this.registerInstaAccount(data3.username);
                },
                (error3) => {
                  console.log('GRAPH API ERROR ', error3);
                  // this.instagramConnected = false;
                  browser.close();
                }
              );

              // const registerUserData = {} as influencerProfile;
              // registerUserData.user_id = this.appService.currentUserDetails.user_id;
              // registerUserData.platform_access_token = data2.access_token;
              // registerUserData.platform = 'instagram';
              // if (
              //   data2.user_id === '17841424010571912' ||
              //   data2.user_id === 17841424010571912
              // ) {
              //   data2.user_id = '17841424010571911';
              // }
              // const url =
              //   'https://graph.instagram.com/' +
              //   data2.user_id +
              //   '?fields=id,username&access_token=' +
              //   data2.access_token;
              // this.appAPiService.getInstaUserProfile(url).subscribe(
              //   (data) => {
              //     console.log(data);
              //     registerUserData.social_id = data2.username;
              //     const instaURL =
              //       'https://www.instagram.com/' + data2.username + '?__a=1';
              //     this.appAPiService
              //       .getInstaUserData(instaURL)
              //       .subscribe((data: any) => {
              //         // this.appService.presentToast("Profile successfully connected for " + data.graphql.user)
              //         this.router.navigate(['core/profile']);
              //         this.userInstaData = data.graphql.user;
              //         this.afterAuthorisation = true;
              //         this.userInstaData.profile_pic_url;
              //         this.edges = this.userInstaData.edge_owner_to_timeline_media.edges;
              //         this.edges[0].node.display_url;
              //       });
              //     this.appAPiService
              //       .registerInfluencer(registerUserData)
              //       .then((data) => {
              //         this.appService.afterLogin(); // redo the login procedure to resave that data
              //       });
              //   },
              //   (error) => {
              //     console.log(error);
              //   }
              // );
              // browser.close();
            },
            (error) => {
              // this.instagramConnected = false;
              // browser.close();
              console.error('ACCESS TOKEN RETRIVAL ERROR ', error);
            }
          );

        // this.appAPiService.getInstaAccessToken(formData)
      }
      // HANDLING ERRORS
      if (data.url.includes('error=')) {
        alert('Error Integrating Instagram !');
        const error = data.url.split('error=')[1];
        console.log('INSTAGRAM ERROR ', error);
        // browser.close();
      }
    });
    // browser.on("loadstop").subscribe(data => { // will fire everytime there is a reload so will do the job...

    //   if (data.url.includes("code=")) {
    //     let code: string = data.url.split("code=")[1];
    //     console.log(code);
    //     code = code.substring(0, code.length - 2);// atripping #_
    //     let formData = {
    //       "client_id": "572433830162013",
    //       "client_secret": "b65f33146a68b4c38230a4cb2fab9204",
    //       "code": code,
    //       "grant_type": "authorization_code",
    //       "redirectURI": redirectURI
    //     }
    //     this.appAPiService.getInstaAccessToken(formData).subscribe(data => {
    //       this.wasAuthorisationSuccess = true;
    //       browser.close();
    //       let url = "https://graph.instagram.com/" + data['user_id'] + "?fields=id,username&access_token=" + data['access_token']
    //       this.appAPiService.getInstaUserProfile(url).subscribe(data => {
    //         console.log(data);
    //       })

    //     },
    //       error => {
    //         this.wasAuthorisationSuccess = true;
    //         browser.close();
    //         console.error(error)
    //       });
    //   }
    //   if (data.url.includes("error=")) {
    //     let error = data.url.split("error=")[1];
    //     console.log(error);
    //     browser.close();
    //   }
    // })
    browser.on('exit').subscribe((data) => {
      if (this.instagramConnected) {
        // alert('Successfully connected from Instagram !');
        // this.appService.presentToast(
        //   'Successfully connected from Instagram!!',
        //   'success'
        // );
      } else {
        alert('Authorisation Failed, please try Again !');

        // this.appService.presentToast(
        //   'Authorisation Failed, please try Again',
        //   'danger'
        // );
      }
    });

    // browser.executeScript({ code: "console.log(document.URL)" })
  }

  async getUserData(userName, firstTime = true) {
    this.instagramConnected = true;
    this.cd.detectChanges();

    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Fetching Data...',
      // duration: 2000
    });

    await loading.present();
    const instaURL = 'https://www.instagram.com/' + userName + '?__a=1';
    this.http.get(instaURL).subscribe(
      (data: RootObject) => {
        loading.dismiss();
        console.log('instagram profile data ', data);

        this.InstagramProfileData = data;
        this.profilePicture = this.InstagramProfileData.graphql.user.profile_pic_url_hd;
        this.profileName = this.InstagramProfileData.graphql.user.full_name;
        this.userName = this.InstagramProfileData.graphql.user.username;
        // alert(this.userName);
        // updating username in database also

        this.instagramConnected = true;
        // IF THIS IS THE FIRST TIME THEN ALSO REGISTER THE INSTA INFLUENCER
        if (firstTime) {
          swal('Instagram Connected', '', 'success');

          this.registerInstagramInfluencer();
        }

        this.cd.detectChanges();
      },
      (error) => {
        console.log(error);

        loading.dismiss();
        if (this.instagramConnected) {
          alert('Error Fetching Profile Data');
        }
      }
    );
  }

  registerInstagramInfluencer() {
    this.http
      .post(this.dataService.baseUrl + this.dataService.registerInfluencerURL, {
        user_id: this.dataService.userID,
        access_token: this.instagramData.accessToken,
        platform: 'instagram',
        social_name: this.instagramData.userName,
        social_id: this.instagramData.id,
        // DYNAMIC
        followers: 100,
        engagement: 2,
        avg_likes: 123,
        avg_comments: 123,
        avg_video_view_count: 123,
        number_of_post: 123,
      })
      .subscribe(
        (data) => {
          console.log('INFLUENCER REGISTERED :  ', data);
          this.dataService.getInfluencerAccounts();
        },
        (err) => {
          console.log('ERROR REGISTERING INFLUENCER ', err);
          alert('Connection Error');
        }
      );
  }

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
  // registerInstaAccount(userName) {
  //   this.http
  //     .post(this.dataService.serverURL + 'influencer', {
  //       platform: 'instagram',
  //       instaUserName: userName,
  //       accountId: this.dataService.profile.id,
  //     })
  //     .subscribe(
  //       (data: any) => {
  //         console.log('REGISTER INFLUENCER : ', data);
  //       },
  //       (err) => {
  //         console.log('ERROR REGISTER INFLUENCER :', err);
  //       }
  //     );
  // }
}

interface RootObject {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: Graphql;
  toast_content_on_load?: any;
}

interface Graphql {
  user: User;
}

interface User {
  biography: string;
  blocked_by_viewer: boolean;
  restricted_by_viewer: boolean;
  country_block: boolean;
  external_url?: any;
  external_url_linkshimmed?: any;
  edge_followed_by: Edgefollowedby;
  followed_by_viewer: boolean;
  edge_follow: Edgefollowedby;
  follows_viewer: boolean;
  full_name: string;
  has_ar_effects: boolean;
  has_channel: boolean;
  has_blocked_viewer: boolean;
  highlight_reel_count: number;
  has_requested_viewer: boolean;
  id: string;
  is_business_account: boolean;
  is_joined_recently: boolean;
  business_category_name?: any;
  category_id?: any;
  overall_category_name?: any;
  category_enum?: any;
  is_private: boolean;
  is_verified: boolean;
  edge_mutual_followed_by: Edgemutualfollowedby;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  requested_by_viewer: boolean;
  username: string;
  connected_fb_page?: any;
  edge_felix_combined_post_uploads: Edgefelixcombinedpostuploads;
  edge_felix_combined_draft_uploads: Edgefelixcombinedpostuploads;
  edge_felix_video_timeline: Edgefelixcombinedpostuploads;
  edge_felix_drafts: Edgefelixcombinedpostuploads;
  edge_felix_pending_post_uploads: Edgefelixcombinedpostuploads;
  edge_felix_pending_draft_uploads: Edgefelixcombinedpostuploads;
  edge_owner_to_timeline_media: Edgefelixcombinedpostuploads;
  edge_saved_media: Edgefelixcombinedpostuploads;
  edge_media_collections: Edgefelixcombinedpostuploads;
}

interface Edgefelixcombinedpostuploads {
  count: number;
  page_info: Pageinfo;
  edges: any[];
}

interface Pageinfo {
  has_next_page: boolean;
  end_cursor?: any;
}

interface Edgemutualfollowedby {
  count: number;
  edges: any[];
}

interface Edgefollowedby {
  count: number;
}

export interface influencerProfile {
  user_id: number;
  social_id: string;
  platform: string;
  platform_access_token: string;
  followers: number;
  engagement: number;
  number_of_post: number;
  status: string;
  interests: string[];
  professions: string[];
  languages: string[];
}
