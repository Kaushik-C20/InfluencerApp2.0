import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampaignDeliverablesPage } from './campaign-deliverables.page';

describe('CampaignDeliverablesPage', () => {
  let component: CampaignDeliverablesPage;
  let fixture: ComponentFixture<CampaignDeliverablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDeliverablesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampaignDeliverablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
