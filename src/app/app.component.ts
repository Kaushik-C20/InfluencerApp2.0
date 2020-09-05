import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserDetailsService } from './services/user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public iab: InAppBrowser,
    public userDetails: UserDetailsService
  ) {
    this.initializeApp();
    this.userDetails.instagramSyncData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // alert(JSON.stringify(window.location));
      // window.open(
      //   'https://api.instagram.com/oauth/authorize?client_id=572433830162013&redirect_uri=https://localhost:8080/influencer/instagram/web/connect&scope=user_profile,user_media&response_type=code&extra=param',
      //   '_self'
      // );
      // location.replace("https://api.instagram.com/oauth/authorize?client_id=572433830162013&redirect_uri=https://localhost:8080/influencer/instagram/web/connect&scope=user_profile,user_media&response_type=code&extra=param"),
      // window.location.href =
      //   'https://api.instagram.com/oauth/authorize?client_id=572433830162013&redirect_uri=https://localhost:8080/influencer/instagram/web/connect&scope=user_profile,user_media&response_type=code&extra=param';
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
