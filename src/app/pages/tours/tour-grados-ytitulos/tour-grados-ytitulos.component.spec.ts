import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourGradosYTitulosComponent } from './tour-grados-ytitulos.component';

describe('TourGradosYTitulosComponent', () => {
  let component: TourGradosYTitulosComponent;
  let fixture: ComponentFixture<TourGradosYTitulosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TourGradosYTitulosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourGradosYTitulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
