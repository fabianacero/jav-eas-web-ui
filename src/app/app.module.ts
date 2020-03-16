import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule} from '@angular/forms';
import {ZgwnuNgBonitaModule} from "@zgwnu/ng-bonita";
import { TasksComponent } from './pages/tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ZgwnuNgBonitaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
