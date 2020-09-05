import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  flowFromLogin = true;
  data: RootObject;
  constructor(
    public http: HttpClient,
    public dataService: DataService,
    public iab: InAppBrowser
  ) {
    this.instagramSyncData();
  }

  updateData() {
    // this.dataService.startLoader();
    // just for precaution
    this.dataService.userID = this.dataService.getItem('wobbUserID');

    this.http
      .get(this.dataService.serverURL + 'user/data', {
        params: { userId: this.dataService.userID },
      })
      .subscribe(
        (data: any) => {
          // this.dataService.stopLoader();

          console.log('GET DATA RESPONSE ', data);
          this.data = data;
          this.instagramSyncData();
        },
        (err) => {
          // this.dataService.stopLoader();
          console.log(err);
          alert('Connection Err !');
        }
      );
  }

  connectInstagram() {
    let connectType =
      window.location.origin === 'http://localhost' ? 'app' : 'web';

    console.log('INSTAGRAM CONNECTION TYPE ', connectType);
    // alert('INSTAGRAM CONNECTION TYPE ' + connectType);
    // CONNECT USING APP LOGIC USING IAB
    let state = {
      type: connectType,
      userId: this.dataService.userID,
    };

    // {"type":"app","userId":1111176}

    // STATE WILL CONTAIN USER ID SINCE NO EXTRA PARAM CAN BE PASSED IN REDIRECT URI
    let url =
      'https://api.instagram.com/oauth/authorize?client_id=572433830162013&redirect_uri=REDIRECT-URI&scope=user_profile,user_media&response_type=code&state=' +
      JSON.stringify(state);

    // const redirectURI = 'https://shopcom.in/instagramLogin/callback.php';
    const redirectURI = 'https://node.wobb.in/influencer/instagram/app/connect';
    // const redirectURI =
    //   'https://localhost:8080/influencer/instagram/app/connect';
    url = url.replace('REDIRECT-URI', redirectURI);

    const browser = this.iab.create(
      url,
      connectType == 'web' ? '_self' : '_blank',
      'location=no'
    );
    // alert(this.url);

    browser.on('loadstop').subscribe((data) => {
      console.log('LOADED URL', data.url);
      // CLOSE THE BROWSER ONCE REDIRECT URI IS LOADED

      if (data.url.includes(redirectURI + '?code=')) {
        browser.close();
      }
    });

    browser.on('exit').subscribe((data) => {
      this.updateData();
    });
  }

  instagramSyncData() {
    // THIS FNC CALCULATES ENGAGEMENT RATE AND UPDATES IT

    try {
      if (!this.data.instagram.social_name) {
        return;
      }
    } catch (error) {
      return;
    }

    this.http
      .get(
        `https://instagram.com/${this.data.instagram.social_name}?__a=1`
        // `https://instagram.com/shopcom.india?__a=1`
      )
      .subscribe(
        (data: any) => {
          console.log('INSTA PUBLIC DATA', data);
          const profileImageUrl = data.graphql.user.profile_pic_url;
          const followers = data.graphql.user.edge_followed_by.count;
          let engagementRate = 0;
          let totalLikes = 0;
          let totalComments = 0;
          let avgLikes = 0;
          let medias = data.graphql.user.edge_owner_to_timeline_media.edges;

          // slice medias array if length is greater than 10
          if (medias.length > 10) {
            medias = medias.slice(0, 10);
          }

          for (let i = 0; i < medias.length; i++) {
            totalLikes += medias[i].node.edge_liked_by.count;
            totalComments += medias[i].node.edge_media_to_comment.count;
          }
          if (totalLikes) avgLikes = totalLikes / medias.length;
          let avgComments = totalComments / medias.length;
          console.log(avgLikes);
          console.log(followers);
          if (avgLikes + avgComments)
            engagementRate = ((avgLikes + avgComments) / followers) * 100;
          console.log('ENGAGEMENT RATE ', engagementRate);

          this.data.instagram.engagement = engagementRate;
          this.data.instagram.followers = followers;
          this.data.instagram.profileImage = profileImageUrl;
          this.updateInfluecerData();
          // engagementRate = parseInt(engagementRate);
        },
        (err) => {
          console.log('ERROR INSTAGRAM SYNC', err);
          console.log(err);
        }
      );
  }

  updateInfluecerData() {
    this.http
      .put(this.dataService.serverURL + 'influencer', {
        socialName: this.data.instagram.social_name,
        followers: this.data.instagram.followers,
        engagement: this.data.instagram.engagement,
        profileImage: this.data.instagram.profileImage,
      })
      .subscribe(
        (data: any) => {
          console.log('update influencer data', data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
interface RootObject {
  allInterests: AllInterest[];
  allLanguages: AllInterest[];
  gender: string;
  bankDetails: BankObject;
  location: Location;
  interests: string[];
  namedInterests: string[];
  languages: string[];
  instagram: Instagram;
  walletBalance: number;
}

interface Instagram {
  id: number;
  user_id: number;
  social_id: string;
  social_name: string;
  platform: string;
  influencer_bio: string;
  influencer_store_link: string;
  platform_access_token: string;
  app_access_token: string;
  followers: number;
  profileImage: string;
  engagement: number;
  avg_likes: number;
  avg_comments: number;
  avg_video_view_count: number;
  number_of_post: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}

interface Location {
  city: string;
  state: string;
  country: string;
}

interface BankObject {
  id: number;
  user_id: number;
  contact_id: string;
  fund_id: string;
  bank_name: string;
  account_type: string;
  name: string;
  ifsc: string;
  account_number: string;
  card_number: string;
  vpa_address: string;
  status: string;
  created: string;
  updated?: any;
}

interface AllInterest {
  id: number;
  name: string;
  parent_id?: any;
  status: string;
  children: Child[];
}

interface Child {
  id: number;
  name: string;
  parent_id: number;
  status: string;
  isChecked: boolean;
}
// axios
//   .get(`https://instagram.com/${meResponse.data.username}?__a=1`)

//   .then((data) => {

//     let profileImageUrl = data.data.graphql.user.profile_pic_url;
//     let followers = data.data.graphql.user.edge_followed_by.count;
//     let engagementRate = 0;
//     let totalLikes = 0;
//     let totalComments = 0;
//     let avgLikes = 0;
//     let medias = data.data.graphql.user.edge_owner_to_timeline_media.edges;

//     // slice medias array if length is greater than 10
//     if (medias.length > 10) medias = medias.slice(0, 10);

//     for (let i = 0; i < medias.length; i++) {
//       totalLikes += medias[i].node.edge_liked_by.count;
//       totalComments += medias[i].node.edge_media_to_comment.count;
//     }
//     if (totalLikes) avgLikes = totalLikes / medias.length;
//     let avgComments = totalComments / medias.length;
//     console.log(avgLikes);
//     console.log(followers);
//     if (avgLikes + avgComments)
//       engagementRate = ((avgLikes + avgComments) / followers) * 100;
//     engagementRate = parseInt(engagementRate);
//     sequelize
//       .query(
//         `insert into influencers(user_id,social_name,social_id,platform,followers,engagement,profileImage) values ('${userId}','${meResponse.data.username}','${meResponse.data.id}','instagram','${followers}','${engagementRate}','${profileImageUrl}')`
//       )
//       .then((data) => {
//         console.log(data);

//         if (state.type == 'app')
//           res.send({
//             status: true,
//             followers: followers,
//             engagementRate: engagementRate,
//           });
//         else {
//           // will redirect
//           // res.send({
//           //   status: true,
//           //   followers: followers,
//           //   engagementRate: engagementRate,
//           // });
//           res.redirect('http://localhost:8100/tabs/settings/');
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
