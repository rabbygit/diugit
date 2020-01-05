import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../common/services/prject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addProjectForm : FormGroup ;
  searchForm     : FormGroup ;
  project : any;

  constructor(private service : ProjectService , private formBuilder : FormBuilder,private router : Router) {
    this.addProjectForm = this.formBuilder.group({
      ProjectName : ['' , Validators.required],
      ProjectType : ['' , Validators.required],
      UsedLanguage : ['' , Validators.required],
      GitHubLink : ['' , Validators.required],
      ContributorName : ['' , Validators.required],
      ContributorEmail : ['' , Validators.required],
    })   

    this.searchForm = this.formBuilder.group({
      ProjectName : ['' , Validators.required],
      ProjectType : ['' , Validators.required],
      UsedLanguage : ['' , Validators.required]
    })
  }
  
  ngOnInit() {
    this.service.getData().subscribe(response =>{
     this.project = response;
     console.log(this.project)
    })

    var auth = localStorage.getItem('id_token');

    if( !auth ){
      this.router.navigate(['/'])
    }else{
      if( localStorage.getItem('loaddone')){
        localStorage.removeItem('loaddone')
        location.reload() ; 
      }
    }

  }

  onSubmitSearchProject(){

  }

  onSubmitAddProject(){
    this.service.insertData(this.addProjectForm.value)
      .subscribe(response => {
        this.project = response;
      })
  }


//   <script>
//   $(document).ready(function () {
//     $("#myInput").on("keyup", function () {
//       var value = $(this).val().toLowerCase();
//       $("#myList li").filter(function () {
//         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//       });
//     });
//   });
// </script>
}
