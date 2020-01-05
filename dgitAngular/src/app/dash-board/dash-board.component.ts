import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from'@angular/forms'
import { DataService } from '../common/services/data.service';

// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-boaotstrap';
import { RegisterUser } from '../common/registeruser';
import { Router } from '@angular/router';
import * as $ from "jquery";
import {ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;

  $: any;
  registerForm : FormGroup;
  loginForm   : FormGroup ;
  registerUser  ;
  user ;
  constructor(private formbuilder : FormBuilder , 
    private service : DataService,
    private router : Router ) { 
    
    this.registerForm = this.formbuilder.group({
      Name : ['' , Validators.required],
      Email : ['' , Validators.required],
      Password : ['' , Validators.required]
    })

    this.loginForm = this.formbuilder.group({
      Email : ['' , Validators.required],
      Password : ['' , Validators.required]
    })

   }

   ngOnInit() {
    var auth = localStorage.getItem('id_token')
    if( auth ){
      this.router.navigate(['/home'])
    }
  }

  onSubmit(){
    // console.log(this.registerForm.value)
    this.service.insertData(this.registerForm.value)
      .subscribe((response : Response) =>{
        this.registerUser = response ;
        if(this.registerUser.success){
          this.router.navigate['/']
        }
      })
  }

  

  onSubmitLogin(){
    this.service.authenticateUser(this.loginForm.value)
      .subscribe(data =>{
        this.user = data ;
        if(this.user.success){
          this.service.storeUserData(this.user.token , this.user.user);

          localStorage.setItem('loaddone','true')

          this.router.navigate(['/home'])
        }else{
          console.log(this.user.msg)
        }
      })
  }
  
}
