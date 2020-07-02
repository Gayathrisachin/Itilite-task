import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';  

const routes: Routes = [
  {
    path:'app',component:AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
