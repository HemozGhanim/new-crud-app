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
export class ApiService {
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
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // Optionally log the error to the console or send it to a logging service
    this.toastr.error(errorMessage || 'An unexpected error occurred');
    return throwError(() => new Error(errorMessage));
  }
}
