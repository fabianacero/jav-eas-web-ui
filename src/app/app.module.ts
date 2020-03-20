import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {ZgwnuNgBonitaModule} from "@zgwnu/ng-bonita";
import {TasksComponent} from './pages/tasks/tasks.component';
import {BonitaCaseComponent} from './components/bonita-case/bonita-case.component';
import {BonitaCaseService} from "./components/bonita-case/bonita-case-service";
import {CommonModule} from "@angular/common";
import {HttpRequestService} from "./provider/http-request/http-request.service";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    BonitaCaseComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ZgwnuNgBonitaModule
  ],
  providers: [BonitaCaseService, HttpRequestService],
  bootstrap: [AppComponent],
  exports: [BonitaCaseComponent]
})
export class AppModule {
}
