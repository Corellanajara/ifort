import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImportarPage } from './importar.page';

describe('ImportarPage', () => {
  let component: ImportarPage;
  let fixture: ComponentFixture<ImportarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
