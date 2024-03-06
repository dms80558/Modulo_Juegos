import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { PptComponent } from './ppt/ppt.component';
import {MatDialogModule} from '@angular/material/dialog';
import { VolverJugarDgComponent } from './volver-jugar-dg/volver-jugar-dg.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Page404Component } from './page404/page404.component';
import { TresRayaComponent } from './tres-raya/tres-raya.component';
import { CeldaComponent } from './celda/celda.component';
import { WordleComponent } from './wordle/wordle.component';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PptComponent,
    VolverJugarDgComponent,
    Page404Component,
    TresRayaComponent,
    CeldaComponent,
    WordleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
