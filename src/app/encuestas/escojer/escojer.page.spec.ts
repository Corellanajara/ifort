import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscojerEncuestasPage } from './escojer.page';

describe('EscojerPage', () => {
  let component: EscojerEncuestasPage;
  let fixture: ComponentFixture<EscojerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscojerEncuestasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscojerEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
