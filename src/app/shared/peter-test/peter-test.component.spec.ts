/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PeterTestComponent } from './peter-test.component';

describe('PeterTestComponent', () => {
  let component: PeterTestComponent
  let fixture: ComponentFixture<PeterTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [ PeterTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeterTestComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the color red', () => {
    component.color = 'red';
    component.number = 1;
    component.numbers = [0];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('p').style.color).toEqual('red');
  });

  it('should have 2 elements', () => {
    component.color = 'red';
    component.number = 2;
    component.numbers = [0, 0];
    fixture.detectChanges();
    expect(fixture.nativeElement.getElementsByTagName('p').length).toEqual(2);
  });
});
