import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {TasksComponent} from "./pages/tasks/tasks.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {DocumentComponent} from "./forms/document/document.component";
import {RequestSavingsAccountComponent} from "./forms/request-savings-account/request-savings-account.component";
import {RequestCdtAccountComponent} from "./forms/request-cdt-account/request-cdt-account.component";
import {CreateCdtAccountComponent} from "./forms/create-cdt-account/create-cdt-account.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'task', component: TasksComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'request-saving', component: RequestSavingsAccountComponent},
  {path: 'request-cdt', component: RequestCdtAccountComponent},
  {path: 'create-cdt', component: CreateCdtAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
