import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AsignarPage } from './asignar.page';

describe('AsignarPage', () => {
  let component: AsignarPage;
  let fixture: ComponentFixture<AsignarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
