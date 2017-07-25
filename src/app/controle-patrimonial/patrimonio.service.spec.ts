import { TestBed, inject } from '@angular/core/testing';

import { PatrimonioService } from './patrimonio.service';

describe('PatrimonioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatrimonioService]
    });
  });

  it('should be created', inject([PatrimonioService], (service: PatrimonioService) => {
    expect(service).toBeTruthy();
  }));
});
