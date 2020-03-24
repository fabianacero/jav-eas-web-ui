import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {TasksComponent} from "./pages/tasks/tasks.component";
import {DocumentComponent} from "./forms/document/document.component";
import {RequestSavingsAccountComponent} from "./forms/request-savings-account/request-savings-account.component";
import {RequestCdtAccountComponent} from "./forms/request-cdt-account/request-cdt-account.component";
import {CreateCdtAccountComponent} from "./forms/create-cdt-account/create-cdt-account.component";
import {StartComponent} from "./pages/start/start.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {TaskGuard} from "./guards/tasks/task.guard";
import {FinishComponent} from "./pages/finish/finish.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'start', component: StartComponent, canActivate: [TaskGuard]},
  {path: 'task', component: TasksComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'request-saving/:task', component: RequestSavingsAccountComponent},
  {path: 'request-cdt/:task', component: RequestCdtAccountComponent},
  {path: 'create-cdt/:task', component: CreateCdtAccountComponent},
  {path: 'finish', component: FinishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
