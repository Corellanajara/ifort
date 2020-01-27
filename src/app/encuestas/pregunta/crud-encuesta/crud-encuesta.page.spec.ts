import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrudEncuestaPage } from './crud-encuesta.page';

describe('CrudEncuestaPage', () => {
  let component: CrudEncuestaPage;
  let fixture: ComponentFixture<CrudEncuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEncuestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudEncuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
