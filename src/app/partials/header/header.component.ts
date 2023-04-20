import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username!: any;

  constructor(private router: Router , public authService:AuthService) {
  }

  handleLogOut() {
    this.authService.logout();
    console.log('LogOut Successfully') ;
    this.router.navigateByUrl('/home');
  }


  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

}









