import { Component, OnInit } from '@angular/core';

import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { InfluencerServiceService } from '../influencer-service.service';
import { Button } from 'protractor';
import { disableDebugTools } from '@angular/platform-browser';
import { DataService } from '../services/data.service';

import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.page.html',
  styleUrls: ['./create-gig.page.scss'],
})
export class CreateGigPage implements OnInit {
  public sampleName = undefined;
  public title = '';
  public type = '';
  public duration = '';
  public gigCost = '';
  public description = '';
  public availableSlots = '';
  public fileToUpload: File = null;

  slots = [];

  errorMsg;
  time: number = 0;
  constructor(
    public toastController: ToastController,
    public dataService: DataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
    // public fileChooser: FileChooser,
    // tslint:disable-next-line: no-shadowed-variable
    public InfluencerServiceService: InfluencerServiceService
  ) {
    const oldDateObj = new Date();
    const newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + 330 * 60 * 1000);
    console.log(newDateObj.toISOString().substr(0, 16));

    this.slots.push(newDateObj.toISOString().substr(0, 16));
    console.log(this.slots);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Gig Created Sucessfully',
      color: 'danger',
      duration: 2000,
    });
    toast.present();
  }

  ngOnInit() {
    // var oldDateObj = new Date();
    // var newDateObj = new Date();
    // newDateObj.setTime(oldDateObj.getTime() + 330 * 60 * 1000);
    // console.log(newDateObj.toISOString().substr(0, 16));
    // this.slots.push(newDateObj.toISOString().substr(0, 16));
  }
  addDuration() {
    this.time = this.time + 5;
  }
  decreaseDuration() {
    this.time = this.time - 5;
  }
  submitGig() {
    //CHECK IF ALL SLOTS ARE PROPERLY FILLED

    let instaInfluencerId;
    this.dataService.influencerAccounts.forEach((element) => {
      if (element.platform === 'instagram') {
        // alert('Found insta user');
        // this.getUserData(element.instaUserName, false);
        // save this influencer id in dataservice to use it create gig page

        instaInfluencerId = element.id;
        return;
      }
    });

    let requestObject = {
      title: this.title,
      type: this.type,
      duration: this.time,
      // duration: this.duration,
      // availableSlots: this.availableSlots,
      cost: this.gigCost,

      sampleName: this.sampleName,
      influencerId: instaInfluencerId,
      description: this.description,
      // file: this.file,

      availableSlots: JSON.stringify(this.slots),
    };

    this.http.post(this.dataService.serverURL + 'gig', requestObject).subscribe(
      (data: any) => {
        console.log('GIG POST ', data);

        // alert('submitted');
        this.navCtrl.pop();
      },
      (err) => {
        alert('Error Submitting the gig');
      }
    );

    //  console.log("****************",data);
    //      this.InfluencerServiceService.submitGig(data).
    //      subscribe((result: any) => {
    //        console.log("&&&&&&&&&&&&&&&",result);

    //       if (result)
    //       {
    //             if(result.message){

    //               console.log(result.message);
    //               this.errorMsg=result.message;

    //             }
    //             else{
    //             console.log("success");
    //             }
    //     }
    //     }, error => {
    //       console.log(error);
    //     });
  }

  back() {
    this.navCtrl.navigateBack('/profile');
  }

  addSlot() {
    if (!this.slots[this.slots.length - 1]) {
      this.dataService.showSwal('Fill The Slot', 'warning');

      return;
    }
    this.slots.push('');

    console.log(this.slots);
  }

  deleteSlot(index) {
    this.slots.splice(index, 1);
  }

  uploadGig(fileInput: any) {
    const files: FileList = fileInput.target.files;
    console.log(files);

    const payload = new FormData();
    payload.append('gigExplainationFile', files.item(0));

    this.http
      .post(this.dataService.serverURL + 'gig/upload', payload)
      .subscribe(
        (data: any) => {
          if (!data.status) {
            alert('Failed to upload file');

            return;
          }
          this.sampleName = data.sampleName;
          alert('sample gig added');
          console.log(data);
        },
        (err) => {
          alert('Connection Err');

          console.log(err);
        }
      );

    // console.log('will upload');
  }
  chooseGig() {
    // this.fileChooser
    //   .open()
    //   .then((uri) => {
    //     alert(JSON.stringify(uri));
    //     console.log(uri);
    //   })
    //   .catch((err) => {
    //     alert(JSON.stringify(err));
    //     console.log(err);
    //   });
  }
}
