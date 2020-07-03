import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  public basket: string = 'assets/icons/basket.svg';

  constructor() { }

  public ngOnInit(): void {
  }

}
