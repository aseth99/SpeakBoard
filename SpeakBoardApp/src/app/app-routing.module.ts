import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CardDisplayComponent } from './card-display/card-display.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'card-display', component: CardDisplayComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
