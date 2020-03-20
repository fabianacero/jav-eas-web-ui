import { TestBed } from '@angular/core/testing';

import { HttpRequestService } from './http-request.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpRequestService', () => {
    let service: HttpRequestService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                HttpRequestService,
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(HttpRequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
