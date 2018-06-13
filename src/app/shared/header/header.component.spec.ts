/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { appReducers } from '../functions/reducerTest';
import { ClarityModule } from 'clarity-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';

describe('HeaderComponent', () => {
  let component: any;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore(appReducers),
        RouterTestingModule,
        ClarityModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home', () => {
    spyOn(component.router, 'navigate');
    component.home();
    expect(component.router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should navigate friends', () => {
    spyOn(component.router, 'navigate');
    component.friends();
    expect(component.router.navigate).toHaveBeenCalledWith(['friends']);
  });

  it('should navigate logout', () => {
    spyOn(component.router, 'navigate');
    component.logout();
    expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  });
});
