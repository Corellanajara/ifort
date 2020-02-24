import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscojerPage } from './escojer.page';

describe('EscojerPage', () => {
  let component: EscojerPage;
  let fixture: ComponentFixture<EscojerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscojerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscojerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
