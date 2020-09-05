import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CampserviceService } from '../services/campservice.service';

@Component({
  selector: 'app-campaign-description',
  templateUrl: './campaign-description.page.html',
  styleUrls: ['./campaign-description.page.scss'],
})
export class CampaignDescriptionPage implements OnInit {

  constructor(public modalController: ModalController, private campserv: CampserviceService) { }

  curr_camp: any;
  Locations: any[];
  toggleLink: boolean;

  ngOnInit() {
    this.toggleLink = false;
    this.curr_camp = this.campserv.curr_camp;
    this.Locations = this.curr_camp['influencer_demografics']['locations'];
  }

  dismissModal() {
    this.campserv.dismissModal();
  }

  Toggle() {
    this.toggleLink = !this.toggleLink;
  }


}
