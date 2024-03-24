import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/http/api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const testData = { message: 'test data' };
    const endpoint = '/test';
    service.get(endpoint).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(service.url + endpoint);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should post data', () => {
    const testData = { message: 'test data' };
    const endpoint = '/test';
    service.post(endpoint, testData).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(service.url + endpoint);
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('should put data', () => {
    const testData = { message: 'test data' };
    const endpoint = '/test';
    service.put(endpoint, testData).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(service.url + endpoint);
    expect(req.request.method).toEqual('PUT');
    req.flush(testData);
  });

  it('should delete data', () => {
    const testData = { message: 'test data' };
    const endpoint = '/test';
    service.delete(endpoint).subscribe(data => {
      expect(data).toEqual(testData);
    });
    const req = httpTestingController.expectOne(service.url + endpoint);
    expect(req.request.method).toEqual('DELETE');
    req.flush(testData);
  });
});
