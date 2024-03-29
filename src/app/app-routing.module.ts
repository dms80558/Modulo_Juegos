import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PptComponent } from './ppt/ppt.component';
import { Page404Component } from './page404/page404.component';
import { InicioComponent } from './inicio/inicio.component';
import { TresRayaComponent } from './tres-raya/tres-raya.component';
import { WordleComponent } from './wordle/wordle.component';

const routes: Routes = [
  {path: 'piedra-papel-tijera', component: PptComponent},
  {path: 'tres-raya', component:TresRayaComponent},
  {path: 'wordle', component:WordleComponent},
  {path: '', component: InicioComponent},
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
