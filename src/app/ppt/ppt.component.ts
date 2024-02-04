import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolverJugarDgComponent } from '../volver-jugar-dg/volver-jugar-dg.component';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent  implements OnInit{
  imagejugador:string="";
  imge:string="";
  r:string=""
  //vidas
  maquinav:number = 5;
  jugadorv:number = 5;
  //contador de partidas
  maquina:number = 0;
  jugador:number = 0;



  elecciones:string [] = ["piedra","papel","tijeras"];
  imagenes:string[] = ["../../assets/img/piedra.png",
  "../../assets/img/papel.png",
  "../../assets/img/tijeras.png"];

  constructor(public dialog: MatDialog){}

  abrirDialogo(): void{
    const dialogRef = this.dialog.open(VolverJugarDgComponent, {
      width: '500px',
      height: '100px',
      panelClass: 'background'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'botonPresionado'){
        if(this.maquinav==0){
          this.jugador = this.jugador +1;
            this.maquinav =5;
            this.jugadorv = 5;
        }
        if(this.jugadorv==0){
          this.maquina = this.maquina +1;
          this.maquinav =5;
          this.jugadorv = 5;
        }
        
        
      }
    })
  }

  ngOnInit(): void {
    
  }

  elegir(eleccion:string,recurso:string){
    
      this.imagejugador = recurso;
      var eleccionMaquina= Math.floor(Math.random()*3);
      this.imge =  this.imagenes [eleccionMaquina];


      if(eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="papel" && this.elecciones [eleccionMaquina]=="piedra"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="tijeras"){
          this.r = "Ganaste 👏👏";
          this.maquinav = this.maquinav - 1;
          if(this.maquinav==0){
            this.abrirDialogo();

            
          }


          
      }
      else if (eleccion=="papel" && this.elecciones [eleccionMaquina]=="tijeras"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"){
        this.r = "Has elegido mal estúdipo 🤌"
        
          this.jugadorv = this.jugadorv - 1;
          if(this.jugadorv==0){
            this.abrirDialogo();
          }

      }
      else{
        this.r = ". . . Empate"
      }
    
      
      
  }


  
}
