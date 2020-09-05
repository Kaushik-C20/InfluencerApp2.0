import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfosliderPage } from './infoslider.page';

describe('InfosliderPage', () => {
  let component: InfosliderPage;
  let fixture: ComponentFixture<InfosliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfosliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfosliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
