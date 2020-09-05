import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-store-campaign-complete',
  templateUrl: './my-store-campaign-complete.page.html',
  styleUrls: ['./my-store-campaign-complete.page.scss'],
})
export class MyStoreCampaignCompletePage implements OnInit {
  postLink = '';
  file = undefined;
  step = undefined;
  postId;
  likes = 0;
  comments = 0;
  engagementRate = 0;
  stepCanComplete = false;
  // campaignDetails;
  data = undefined;
  constructor(
    public dataService: DataService,
    public http: HttpClient,
    private socialSharing: SocialSharing,
    public activatedRoute: ActivatedRoute,
    private clipboard: Clipboard,
    public router: Router,
    public navCtrl: NavController,
    public toastController: ToastController
  ) {
    // this.getCampaignDetails(
    //   this.dataService.myStore.selectedEndoresedCampaign.campaign_id
    // );
    // console.log(this.activatedRoute.snapshot.params.postId);

    this.postId = this.activatedRoute.snapshot.params.postId;

    this.getDetails();
  }
  getDetails() {
    this.http.get(this.dataService.serverURL + `post/${this.postId}`).subscribe(
      (data: any) => {
        console.log('POST DATA', data);
        this.data = data.data;
        this.calculateStep();
      },
      (err) => {
        console.log(err);
        alert('Connection Error');
      }
    );
  }

  sampleFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  proofFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  // getCampaignDetails(campaignId) {
  //   this.http
  //     .get(
  //       this.dataService.baseUrl +
  //         this.dataService.getCampaignDetailsBasedonIdURL +
  //         campaignId
  //     )
  //     .subscribe((data) => {
  //       console.log('GOT CAMPAIGN DETAILS ON MY STORE PAGE', data);
  //       this.campaignDetails = data;
  //     });
  // }
  ngOnInit() {
    // console.log(
    //   'SELECTED CAMPAIGN DELIVERABLE ',
    //   this.dataService.myStore.selectedDeliverable
    // );
    // // CALCULATE THE STEP NUMBER
    // this.step = 1;
    // if (
    //   this.dataService.myStore.selectedDeliverable.deliverable_status !=
    //     'pending' &&
    //   this.dataService.myStore.selectedDeliverable.deliverable_status !=
    //     'not submited' &&
    //   this.dataService.myStore.selectedDeliverable.deliverable_status !=
    //     'rejected'
    // ) {
    //   this.step = 2;
    // }
  }

  calculateStep() {
    const stepStatus = this.data.postData.review_status;
    if (
      stepStatus === 'pending' ||
      stepStatus === 'approval_pending' ||
      stepStatus === 'rejected'
    ) {
      this.step = 1;
    } else {
      this.step = 2;
    }

    if (
      stepStatus === 'approval_pending' ||
      stepStatus === 'verification_pending' ||
      stepStatus === 'posted'
    ) {
      this.stepCanComplete = false;
    } else {
      this.stepCanComplete = true;
    }
  }

  post() {
    // will post to insta

    this.socialSharing
      .shareViaInstagram('Caption and hashtags', '')
      .then(() => {
        // Sharing via email is possible
      })
      .catch(() => {
        // Sharing via email is not possible
      });
  }

  forApproval() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.file, this.file.name);
    uploadData.append('postId', this.postId);
    this.http
      .post(this.dataService.serverURL + 'post/preapproval', uploadData)
      .subscribe(
        (data: any) => {
          console.log('POST PREAPPROVAL ', data);
          this.router.navigate(['/tabs/store']);
        },
        (err) => {
          console.log(err);
          alert('Connection Error');
        }
      );
  }

  forPostApproval() {
    const newPostLink = this.postLink.split('?')[0];

    // CHECK THE FORMAT OF LINK
    if (
      newPostLink.includes('instagram.com/p') ||
      newPostLink.includes('instagram.com/stories')
    ) {
    } else {
      alert('Invalid Link');
      return;
    }

    this.http.get(newPostLink + '?__a=1').subscribe(
      (data: any) => {
        console.log(data);

        if (data.graphql) {
          this.likes =
            data.graphql.shortcode_media.edge_media_preview_like.count;
          this.comments =
            data.graphql.shortcode_media.edge_media_to_parent_comment.count;

          this.sendData();
        } else {
          this.sendData();
        }

        this.sendData();
      },
      (err) => {
        console.log(err);

        alert('Incorrect Post Link !');

        // this.sendData();
      }
    );
  }

  sendData() {
    console.log('likes count', this.likes);
    console.log('comments count', this.comments);

    const uploadData = new FormData();
    uploadData.append('myFile', this.file, this.file.name);
    uploadData.append('postId', this.postId + '');
    uploadData.append('postLink', this.postLink);
    uploadData.append('likes', this.likes + '');
    uploadData.append('comments', this.comments + '');
    uploadData.append('engagementRate', this.engagementRate + '');
    this.http
      .post(this.dataService.serverURL + 'post/postapproval', uploadData)
      .subscribe(
        (data: any) => {
          console.log('POST postAPPROVAL ', data);
          this.router.navigate(['/tabs/store']);
        },
        (err) => {
          console.log(err);
          alert('Connection Error');
        }
      );
  }

  async copy() {
    const toast = await this.toastController.create({
      header: 'Content Copied',
      // message: 'Click to Close',
      position: 'bottom',
      duration: 1000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
    let copyContent = '';
    this.data.tagData.forEach((element) => {
      copyContent += '@' + element.tag + ' ';
    });
    this.data.hashtagData.forEach((element) => {
      copyContent += '#' + element.hashtag + ' ';
    });

    console.log(copyContent);

    this.clipboard.copy(copyContent);

    //will copy hashtags
  }

  viewResouce(link) {
    window.open(link);
  }
  openInstagram() {
    window.open('https://instagram.com');
  }
}
