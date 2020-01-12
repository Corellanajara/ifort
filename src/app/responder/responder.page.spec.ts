import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResponderPage } from './responder.page';

describe('ResponderPage', () => {
  let component: ResponderPage;
  let fixture: ComponentFixture<ResponderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
