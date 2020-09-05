import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyStorePage } from './my-store.page';

describe('MyStorePage', () => {
  let component: MyStorePage;
  let fixture: ComponentFixture<MyStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
