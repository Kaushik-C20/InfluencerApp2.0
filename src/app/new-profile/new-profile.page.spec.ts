import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewProfilePage } from './new-profile.page';

describe('NewProfilePage', () => {
  let component: NewProfilePage;
  let fixture: ComponentFixture<NewProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
