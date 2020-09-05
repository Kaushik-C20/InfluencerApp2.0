import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyStoreCampaignCompletePage } from './my-store-campaign-complete.page';

describe('MyStoreCampaignCompletePage', () => {
  let component: MyStoreCampaignCompletePage;
  let fixture: ComponentFixture<MyStoreCampaignCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoreCampaignCompletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStoreCampaignCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
