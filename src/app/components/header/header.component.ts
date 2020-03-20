import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public showBackButton = false;
  @Input()
  public showCloseButton = false;
  @Input()
  public headerInfo: any;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public closeSession(): void {
    sessionStorage.removeItem("session");
    this.router.navigate(['/']);
  }

}
