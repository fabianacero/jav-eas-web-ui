import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {TasksComponent} from "./pages/tasks/tasks.component";
import {AuthGuard} from "./auth/guards/auth.guard";
import {DocumentComponent} from "./forms/document/document.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'task', component: TasksComponent},
  {path: 'document', component: DocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
