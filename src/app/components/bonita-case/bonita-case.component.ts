import { Component, OnInit } from '@angular/core';
import {BonitaCaseService} from "./bonita-case-service";

@Component({
  selector: 'app-bonita-case',
  templateUrl: './bonita-case.component.html',
  styleUrls: ['./bonita-case.component.scss']
})
export class BonitaCaseComponent implements OnInit {

  constructor(public bonitaCaseService: BonitaCaseService) { }

  ngOnInit(): void {
  }

}
