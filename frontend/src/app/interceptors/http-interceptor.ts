import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, ObservableInput, throwError } from "rxjs";
import { ErrorInterface } from "../model/profile";
import { DataService } from "../services/data.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private dataService: DataService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.dataService.fetchToken();
        if (authToken === null) {
            return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorObj: ErrorInterface = {
                        code: error.status,
                        message: error.error.message
                    }
                    return throwError(() => errorObj);
                })
            );
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + authToken)    
        })
        return next.handle(authReq)
                .pipe(
                    catchError((error: HttpErrorResponse) => {
                        const errorObj: ErrorInterface = {
                            code: error.status,
                            message: error.error.message
                        }
                        return throwError(() => errorObj);
                    })
                );
    }
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
]