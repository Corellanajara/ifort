import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstrumentoPage } from './instrumento.page';

describe('InstrumentoPage', () => {
  let component: InstrumentoPage;
  let fixture: ComponentFixture<InstrumentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstrumentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
