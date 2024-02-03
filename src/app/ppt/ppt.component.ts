import { Component, OnInit } from '@angular/core';

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
            
            this.jugador = this.jugador +1;
            this.maquinav =5;
            this.jugadorv = 5;
          }


          
      }
      else if (eleccion=="papel" && this.elecciones [eleccionMaquina]=="tijeras"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"){
        this.r = "Has elegido mal estúdipo 🤌"
        
          this.jugadorv = this.jugadorv - 1;
          if(this.jugadorv==0){
            this.maquina = this.maquina +1;
            this.maquinav =5;
            this.jugadorv = 5;
          }

      }
      else{
        this.r = ". . . Empate"
      }
    
      
      
  }


  
}
