import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @ViewChild('registerform', { static: false })
  // registerForm!: NgForm;
  userAlreadyExist = false;


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }

  onRegisterSubmit(userdata : any){
      const reqObject={
        "username":userdata.username,
        "firstname":userdata.firstname,
        "lastname":userdata.lastname,
        "password":userdata.password,
        "emailAddress":userdata.email,
        "roles":['user']
      }
      const headers = new HttpHeaders({'Content-type': 'application/json'});
      this.http.post('http://localhost:3000/users/api/auth/signup', reqObject, { headers: headers }).subscribe(
       // The response data
      (response) => {
        console.log(response);
      },

      // If there is an error
      (error) => {
        console.log(error);
        if (error.status == 400) {
          this.userAlreadyExist = true;
        }

      },

       // When observable completes
       () => {
        console.log('done!');
        this.router.navigate(['login']);
      }
      );
  }
}
