import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-volver-jugar-dg',
  templateUrl: './volver-jugar-dg.component.html',
  styleUrls: ['./volver-jugar-dg.component.css']
})
export class VolverJugarDgComponent {
  constructor(public dialogRef: MatDialogRef<VolverJugarDgComponent>){}

  seguirjugando() : void{
    this.dialogRef.close('botonPresionado');
  }

}
