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
import { DocumentComponent } from './forms/document/document.component';
import { RequestSavingsAccountComponent } from './forms/request-savings-account/request-savings-account.component';
import { RequestCdtAccountComponent } from './forms/request-cdt-account/request-cdt-account.component';
import { FooterComponent } from './components/footer/footer.component';
import { CreateCdtAccountComponent } from './forms/create-cdt-account/create-cdt-account.component';
import { StartComponent } from './pages/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    BonitaCaseComponent,
    HeaderComponent,
    DocumentComponent,
    RequestSavingsAccountComponent,
    RequestCdtAccountComponent,
    FooterComponent,
    CreateCdtAccountComponent,
    StartComponent
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
