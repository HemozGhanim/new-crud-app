import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // Generic GET request
  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<T> {
    return this.http.get<T>(url, { params, headers }).pipe(
      map(this.handleResponse),
      catchError((error) => this.handleError(error))
    );
  }

  // Generic POST request
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers }).pipe(
      map(this.handleResponse),
      catchError((error) => this.handleError(error))
    );
  }

  // Generic PUT request
  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers }).pipe(
      map(this.handleResponse),
      catchError((error) => this.handleError(error))
    );
  }

  // Generic DELETE request
  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers }).pipe(
      map(this.handleResponse),
      catchError((error) => this.handleError(error))
    );
  }

  // Response handler (you can modify this as per your response structure)
  private handleResponse(response: any): any {
    // You can add some logging or other response handling logic here if needed
    return response || {};
  }

  // Error handler
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';
    if (!errorRes || !errorRes.error.error) {
      this.toastr.error(errorMessage || 'An unexpected error occurred');
      return throwError(() => new Error(errorMessage));
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
        case 'USER_DISABLED':
          errorMessage = 'This user has been disabled';
          break;
        default:
          errorMessage = 'An unexpected error occurred';
      }
      this.toastr.error(errorMessage || 'An unexpected error occurred');
      return throwError(() => new Error(errorMessage));
    }
  }
}
