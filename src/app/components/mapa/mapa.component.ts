import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ModalMapaComponent } from '../modal-mapa/modal-mapa.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

  ngOnInit(): void {
  }
  
  abrirMapa(){
    const dialogRef = this.dialog.open(ModalMapaComponent, {
      width: '500px', 
      data : {}
    }); 
  }
  
}
