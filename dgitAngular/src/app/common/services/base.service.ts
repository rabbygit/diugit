import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { from } from 'rxjs';
import { Observable} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private url  , protected http : HttpClient) { }


  insertData(resource){
    console.log(resource)
    return this.http.post(this.url , JSON.stringify(resource) , httpOptions)
      .pipe(
        map((response : Response) => response)
      )
  }

}