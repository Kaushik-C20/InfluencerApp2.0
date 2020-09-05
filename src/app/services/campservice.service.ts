import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CampserviceService {
  sum: number[] = [];
  id: number;
  // platform:string = 'all';
  curr_camp: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  currentModal;
  currentPopover;

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  dismissPopover() {
    if (this.currentPopover) {
      this.currentPopover.dismiss().then(() => {
        this.currentPopover = null;
      });
    }
  }

  getDetails() {
    const url =
      'https://dev.shopcom.in/hashtag/shopcom-dev/public/home-campaign';
    return this.http.post(url, {});
  }

  // storeplatform(x: string) {
  //   this.platform = x;
  // }

  store(i: number) {
    if (i) {
      this.id = i;
    } else {
      this.id = this.route.snapshot.params['id'];
    }
    this.fetch();
  }

  fetch() {
    const urlcamp =
      'https://dev.shopcom.in/hashtag/shopcom-dev/public/campaign-by-id-app/' +
      this.id;
    this.http.get(urlcamp).subscribe(
      (data) => {
        this.curr_camp = data;
      },
      (err) => {
        console.log('ERROR-Status:', err);
      },
      () => {
        console.log(this.curr_camp);
        this.router.navigate(['/campaign-details', this.id]);
      }
    );
  }

  saveToearn(money: number) {
    this.sum.push(money);
  }
}
