import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateGigPage } from './create-gig.page';

describe('CreateGigPage', () => {
  let component: CreateGigPage;
  let fixture: ComponentFixture<CreateGigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
