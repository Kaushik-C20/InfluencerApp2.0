import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyStoreCampaignDetailsPage } from './my-store-campaign-details.page';

describe('MyStoreCampaignDetailsPage', () => {
  let component: MyStoreCampaignDetailsPage;
  let fixture: ComponentFixture<MyStoreCampaignDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoreCampaignDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStoreCampaignDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
