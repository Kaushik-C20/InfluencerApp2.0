import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesignTestPage } from './design-test.page';

describe('DesignTestPage', () => {
  let component: DesignTestPage;
  let fixture: ComponentFixture<DesignTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesignTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
