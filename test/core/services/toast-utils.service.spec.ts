import { TestBed } from '@angular/core/testing';
import { ToastUtilsService } from '@core/services/toast-utils.service';

describe('ToastUtilsService', () => {
  let service: ToastUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastUtilsService],
    });
    service = TestBed.inject(ToastUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
