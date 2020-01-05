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
export class DataService extends BaseService  {
  constructor( http : HttpClient) { 
    super('http://localhost:3000/addRegister' , http)
   }
    
  authToken : any ;
  user : any ;
  
  authenticateUser(resource){
     return this.http.post("http://localhost:3000" + "/login" , JSON.stringify(resource) , httpOptions)
      .pipe(
        map(response => response)
      )   
  }

  storeUserData(token , user){
    localStorage.setItem('id_token', JSON.stringify(token));
    console.log(localStorage.getItem('id_token'))
    localStorage.setItem('user' , JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

}
// export class DataService  {

//   url = 'http://localhost:3000' ;
//   authToken : any ;
//   user : any ;

//   constructor(private http : HttpClient) { }


//   insertData(resource){
//     console.log(resource)
//     return this.http.post(this.url + "/addRegister" , JSON.stringify(resource) , httpOptions)
//       .pipe(
//         map((response : Response) =>{
//           response.json();
//         })
//       )
//   }

//   getData(){
//     return this.http.get(this.url , httpOptions)
//      .pipe(
//        map((response : Response) =>{
//          response.json();
//       })
//     )
//   }

//   authenticateUser(resource){
//      return this.http.post(this.url + "/login" , JSON.stringify(resource) , httpOptions)
//       .pipe(
//         map(response => response)
//       )   
//   }

//   storeUserData(token , user){
//     localStorage.setItem('id_token', JSON.stringify(token));
//     console.log(localStorage.getItem('id_token'))
//     localStorage.setItem('user' , JSON.stringify(user));
//     this.authToken = token;
//     this.user = user;
//   }

// }
