import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  /**
   * @param {Router} _router
   */
  constructor(private _router: Router,
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    setTimeout(()=>{
        this.spinner.hide('main');
    },200) 
    return next.handle(request).pipe(
      catchError(err => {
        if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._router.navigate(['/not-authorized']);

          // ? Can also logout and reload if needed
          // location.reload(true);
        }
        // throwError
        const error = err.error.message || err.statusText;
        this._toastrService.error(error,'',
              { closeButton: true }
        );
        return throwError(error);
      })
    );
  }
}