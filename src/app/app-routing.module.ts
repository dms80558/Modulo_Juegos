import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PptComponent } from './ppt/ppt.component';
import { Page404Component } from './page404/page404.component';
import { InicioComponent } from './inicio/inicio.component';
import { TresRayaComponent } from './tres-raya/tres-raya.component';

const routes: Routes = [
  {path: 'piedra-papel-tijera/:nick', component: PptComponent},
  {path: 'tres-raya', component:TresRayaComponent},
  {path: '', component: InicioComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
