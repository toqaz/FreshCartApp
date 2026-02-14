import { error } from 'console';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toasterService = inject(ToastrService);

  return next(req).pipe( catchError((err:HttpErrorResponse)=>{
    toasterService.error(err.error.message)
    return throwError(()=> err)
  }) )

};
