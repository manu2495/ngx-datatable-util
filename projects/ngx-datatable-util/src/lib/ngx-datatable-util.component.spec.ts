import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableUtilComponent } from './ngx-datatable-util.component';

describe('NgxDatatableUtilComponent', () => {
  let component: NgxDatatableUtilComponent;
  let fixture: ComponentFixture<NgxDatatableUtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDatatableUtilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatatableUtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
