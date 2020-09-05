import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampaignPage } from './campaign.page';

describe('CampaignPage', () => {
  let component: CampaignPage;
  let fixture: ComponentFixture<CampaignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
