import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent  implements OnInit{
  texto:string="";
  texto2:string="";
  r:string=""
  //vidas
  maquinav:number = 5;
  jugadorv:number = 5;
  //contador de partidas
  maquina:number = 0;
  jugador:number = 0;

  public images = ["../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png"];

  removeImage(){
    this.images = ["../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png"];
   }

   reiniciar(){
    if(this.maquinav==0&&this.jugadorv!=0){
      this.jugador += 1; 
    }
    else if(this.maquinav!=0&&this.jugadorv==0){
      this.maquina += 1; 
    }
   }

  elecciones:string [] = ["piedra","papel","tijeras"];
  ngOnInit(): void {
    this.texto ="Elige sabiamente: "
  }

  elegir(eleccion:string){
    
      this.texto = "Eligiste: " + eleccion;
      var eleccionMaquina= Math.floor(Math.random()*3);
      this.texto2 = "La maquina ha elegido " + this.elecciones [eleccionMaquina];

      if(eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="papel" && this.elecciones [eleccionMaquina]=="piedra"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="tijeras"){
          this.r = "Ganaste 👏👏";
          if(this.maquinav>0){
            this.maquinav = this.maquinav - 1;
          }
          else{
            this.jugador = this.jugador +1;

            this.maquinav =0;
            this.jugadorv = 0;
          }
          
          this.reiniciar;
      }
      else if (eleccion=="papel" && this.elecciones [eleccionMaquina]=="tijeras"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"){
        this.r = "Has elegido mal estúdipo 🤌"
        if(this.jugadorv>0){
          this.jugadorv = this.jugadorv - 1;
        }
        else{
          this.maquina = this.maquina +1;
          this.maquinav =0;
          this.jugadorv = 0;
        }

      }
      else{
        this.r = ". . . Empate"
      }
    
      
      
  }


  
}
