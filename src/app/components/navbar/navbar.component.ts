import { Component,inject, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule,MatMenuModule,CommonModule,MatToolbarModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public authService = inject(AuthService)
  ngOnInit(): void {  
      console.log(this.authService);   
      this.authService.user$.subscribe(user =>{
        //console.log(user);
      })
      this.authService.idTokenClaims$.subscribe(claims =>{
        console.log('Token Claims:', claims);
      });
  }
  logout(){
    this.authService.logout();
  }
}
