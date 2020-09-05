import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectInterestsPage } from './select-interests.page';

describe('SelectInterestsPage', () => {
  let component: SelectInterestsPage;
  let fixture: ComponentFixture<SelectInterestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInterestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
