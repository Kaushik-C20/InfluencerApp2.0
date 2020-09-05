import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestAGigPage } from './request-agig.page';

describe('RequestAGigPage', () => {
  let component: RequestAGigPage;
  let fixture: ComponentFixture<RequestAGigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAGigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAGigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
