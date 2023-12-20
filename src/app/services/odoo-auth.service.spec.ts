import { TestBed } from '@angular/core/testing';

import { OdooAuthService } from './odoo-auth.service';

describe('OdooAuthService', () => {
  let service: OdooAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdooAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
