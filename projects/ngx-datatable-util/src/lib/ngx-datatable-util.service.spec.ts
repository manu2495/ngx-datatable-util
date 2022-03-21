import { TestBed } from '@angular/core/testing';

import { NgxDatatableUtilService } from './ngx-datatable-util.service';

describe('NgxDatatableUtilService', () => {
  let service: NgxDatatableUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDatatableUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
