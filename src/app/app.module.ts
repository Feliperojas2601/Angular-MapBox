import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ModalMapaComponent } from './components/modal-mapa/modal-mapa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  entryComponents:[
    ModalMapaComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    ModalMapaComponent
  ],
  imports: [
    BrowserModule, 
    MatDialogModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
