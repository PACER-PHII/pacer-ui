import { TestBed } from '@angular/core/testing';

import { CaseRecordService } from './case-record.service';

describe('CaseRecordService', () => {
  let service: CaseRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
