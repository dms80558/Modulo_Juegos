import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolverJugarDgComponent } from '../volver-jugar-dg/volver-jugar-dg.component';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


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

  // constructor(private ruta:ActivatedRoute){

  // }

  elecciones:string [] = ["piedra","papel","tijeras"];
  imagenes:string[] = ["../../assets/img/piedra.png",
  "../../assets/img/papel.png",
  "../../assets/img/tijeras.png"];

  constructor(public dialog: MatDialog){}

  abrirDialogo(): void{
    Swal.fire({
      title: "Fin de la partida",
      text: "¿Quieres seguir jugando?",
      icon: "question",
      confirmButtonText: "Jugar",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
      
    }).then((result) => {
      if (result.isConfirmed) {
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
      } else {
        this.jugador = 0;
        this.maquina = 0; 
        this.maquinav =5;
        this.jugadorv = 5;
      }
      });
  }

  ngOnInit(): void {
    // this.ruta.params.subscribe(
    //   params => {
    //       this.nombre = params['nick'];
    //   }
    // )
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
      // ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="piedra"
      ){
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
