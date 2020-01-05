import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { from } from 'rxjs';
import { Observable} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { BaseService } from './base.service';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService{

  constructor( http : HttpClient) { 
    super('http://localhost:3000/addProject' , http)
   }

  getData(){
    return this.http.get('http://localhost:3000/getProject' , httpOptions).pipe(
      map(response => response)
    )
  }

}
