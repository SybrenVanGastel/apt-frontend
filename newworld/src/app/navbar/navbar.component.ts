import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home() {
    this.router.navigateByUrl("");
  }

  add() {
    //Navigate to form in add mode
    this.router.navigate(['builds/form/add'], {state: {mode: 'add'}});
  }

}
