import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  Router,
} from '@angular/router';
// import { ProfilePage } from './profile/profile.page';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NewProfilePage } from './new-profile/new-profile.page';
import { DataService } from './services/data.service';
import { RequestAGigPage } from './request-agig/request-agig.page';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    // redirectTo: 'update-details',
    // redirectTo: 'vaibhav_fuke_',
    pathMatch: 'full',
  },

  {
    path: 'login',
    // pathMatch: 'prefix',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
  },

  {
    path: 'infoslider',
    pathMatch: 'full',
    loadChildren: () =>
      import('./infoslider/infoslider.module').then(
        (m) => m.InfosliderPageModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then((m) => m.OtpPageModule),
    // canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'create-gig',
    loadChildren: () =>
      import('./create-gig/create-gig.module').then(
        (m) => m.CreateGigPageModule
      ),
  },
  {
    path: 'dashboard',
    children: [
      {
        path: 'profile',
        component: NewProfilePage,
        loadChildren: () =>
          import('./new-profile/new-profile.module').then(
            (m) => m.NewProfilePageModule
          ),

        // component: ProfilePage,
        // loadChildren: () =>
        //   import('./profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'design-test',
    loadChildren: () =>
      import('./design-test/design-test.module').then(
        (m) => m.DesignTestPageModule
      ),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },

  {
    path: 'campaign-details/:id',
    loadChildren: () =>
      import('./campaign-details/campaign-details.module').then(
        (m) => m.CampaignDetailsPageModule
      ),
  },
  {
    path: 'campaign-description',
    loadChildren: () =>
      import('./campaign-description/campaign-description.module').then(
        (m) => m.CampaignDescriptionPageModule
      ),
  },
  {
    path: 'campaign-deliverables',
    loadChildren: () =>
      import('./campaign-deliverables/campaign-deliverables.module').then(
        (m) => m.CampaignDeliverablesPageModule
      ),
  },
  {
    path: 'campaign-eligibility',
    loadChildren: () =>
      import('./campaign-eligibility/campaign-eligibility.module').then(
        (m) => m.CampaignEligibilityPageModule
      ),
  },

  {
    path: 'my-store',
    loadChildren: () =>
      import('./my-store/my-store.module').then((m) => m.MyStorePageModule),
  },
  {
    path: 'bankdetails',
    loadChildren: () =>
      import('./bankdetails/bankdetails.module').then(
        (m) => m.BankdetailsPageModule
      ),
  },
  {
    path: 'my-store-campaign-details/:campaignId',
    loadChildren: () =>
      import(
        './my-store-campaign-details/my-store-campaign-details.module'
      ).then((m) => m.MyStoreCampaignDetailsPageModule),
  },
  {
    path: 'deliverable-submit',
    loadChildren: () =>
      import('./deliverable-submit/deliverable-submit.module').then(
        (m) => m.DeliverableSubmitPageModule
      ),
  },
  {
    path: 'my-store-campaign-complete/:postId',
    loadChildren: () =>
      import(
        './my-store-campaign-complete/my-store-campaign-complete.module'
      ).then((m) => m.MyStoreCampaignCompletePageModule),
  },

  {
    path: 'update-details',
    loadChildren: () =>
      import('./update-details/update-details.module').then(
        (m) => m.UpdateDetailsPageModule
      ),
  },

  // {
  //   path: ':username',

  //   loadChildren: () =>
  //     import('./request-agig/request-agig.module').then(
  //       (m) => m.RequestAGigPageModule
  //     ),
  // },
  {
    path: 'select-interests',
    loadChildren: () =>
      import('./select-interests/select-interests.module').then(
        (m) => m.SelectInterestsPageModule
      ),
  },

  // {
  //   path: 'notification',
  //   loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CommonModule,
    BrowserModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router, public dataService: DataService) {
    // before this also see if the route is info slider or not
    // if (this.dataService.getItem('tutorialShowed')) {
    //   alert('asdf');
    //   this.router.navigate(['/login']);
    // }
  }
}
