import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampaignEligibilityPage } from './campaign-eligibility.page';

describe('CampaignEligibilityPage', () => {
  let component: CampaignEligibilityPage;
  let fixture: ComponentFixture<CampaignEligibilityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignEligibilityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignEligibilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
