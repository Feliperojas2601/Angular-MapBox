import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapaComponent } from '../mapa/mapa.component';


interface Marcador {
  lng : number; 
  lat:  number; 
}

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.css']
})
export class ModalMapaComponent implements OnInit {
  
  mapbox=(mapboxgl as typeof mapboxgl); 
  mapa : any; 
  mapaToken: string =  'pk.eyJ1IjoiZmVsaXBlcm9qYXMyNiIsImEiOiJja3N1b21pa2cwZnlwMnh0N3h2cXlrcHM0In0.ZQj-mdfMcI3MNvjoF7CMmQ'; 
  marcador:any; 
  marcadores:mapboxgl.Marker[]=[]; 

  constructor(public dialogRef: MatDialogRef<MapaComponent>, @Inject(MAT_DIALOG_DATA) public data:any ) {
    if(localStorage.getItem('lng') !==null && localStorage.getItem('lat') !== null){
      let lng = localStorage.getItem('lng'); 
      let lat = localStorage.getItem('lat'); 
      this.marcador = {'lng':Number(lng), 'lat':Number(lat)}; 
    }
  }

  ngOnInit(): void {
    this.mapbox.accessToken = this.mapaToken; 
    this.mapa =  new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [-74.049310,4.719460], 
      zoom: 9
    })
    this.mapa.addControl(new mapboxgl.NavigationControl());
    if(this.marcador){
      this.crearMarcador(this.marcador); 
    } 
    this.mapa.on('click', (e:any) => {
      this.crearMarcador(e.lngLat); 
    })
  }

  crearMarcador(e:Marcador){ 
    if(this.marcadores !== null){
      for(let i = 0; i<this.marcadores.length; i++){  
        let aux = new mapboxgl.Marker(); 
        aux = this.marcadores[i];  
        aux.remove(); 
        this.marcadores.splice(i,1); 
      }
    }
    const marcador = new mapboxgl.Marker()
                              .setLngLat(e)
                              .addTo(this.mapa);
    this.marcadores.push(marcador); 
  }

  confirmarMarcador(){ 
    if(this.marcadores[0]){
      localStorage.setItem('lng', this.marcadores[0].getLngLat().lng.toString()); 
      localStorage.setItem('lat', this.marcadores[0].getLngLat().lat.toString());
      this.dialogRef.close(); 
    }
    this.dialogRef.close();
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
