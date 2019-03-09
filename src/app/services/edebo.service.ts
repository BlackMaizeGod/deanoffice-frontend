
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class EdeboService {
  private url = `${environment.apiUrl}/students/edebo-synchronization`;
  constructor(private _http: HttpClient) { }

  uploadFile(formData: any): Observable<any> {
    return this._http.post(`${this.url}/process-file`, formData)
      .catch(this._errorHandler);
  }
  updateDb(data: any): Observable<any> {
    return this._http.post(`${this.url}/save`, data)
      .catch(this._errorHandler);
  }

   _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return observableThrowError(error || 'Some Error on Server Occured');
  }
}
