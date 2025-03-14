import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICES } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  // http://127.0.0.1:8000/api
  registerRole(data:any){
    this.isLoadingSubject.next(true);
    let url = URL_SERVICES + "/roles";
    let headers = new HttpHeaders({'Authorization': `Bearer ${this.authservice.token}`})
    return this.http.post(url, data, {
      headers
    }).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    );
  }
}
