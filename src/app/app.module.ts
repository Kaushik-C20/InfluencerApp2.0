import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Sim } from '@ionic-native/sim/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { UserDetailsService } from './services/user-details.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    GooglePlaceModule,
    // NgModule,
  ],
  providers: [
    StatusBar,
    Sim,
    DataService,
    UserDetailsService,
    AuthService,
    HttpClient,
    SplashScreen,
    FileChooser,
    PhotoViewer,
    InAppBrowser,
    Clipboard,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
