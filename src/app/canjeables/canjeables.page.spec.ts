import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanjeablesPage } from './canjeables.page';

describe('CanjeablesPage', () => {
  let component: CanjeablesPage;
  let fixture: ComponentFixture<CanjeablesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanjeablesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanjeablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
