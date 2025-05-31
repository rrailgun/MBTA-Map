import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweakpaneComponent } from './tweakpane.component';

describe('TweakpaneComponent', () => {
  let component: TweakpaneComponent;
  let fixture: ComponentFixture<TweakpaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TweakpaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweakpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
