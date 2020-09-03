import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerPage } from './ver.page';

describe('VerPage', () => {
  let component: VerPage;
  let fixture: ComponentFixture<VerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
