import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildOverviewComponent } from './build-overview.component';

describe('BuildOverviewComponent', () => {
  let component: BuildOverviewComponent;
  let fixture: ComponentFixture<BuildOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
