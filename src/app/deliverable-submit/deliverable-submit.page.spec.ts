import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverableSubmitPage } from './deliverable-submit.page';

describe('DeliverableSubmitPage', () => {
  let component: DeliverableSubmitPage;
  let fixture: ComponentFixture<DeliverableSubmitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverableSubmitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverableSubmitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
