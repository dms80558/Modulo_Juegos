import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent  implements OnInit{
  texto:string="";
  texto2:string="";
  r:string="";
  maquina:number = 5;
  jugador:number = 5;
  public images = ["../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png","../../assets/img/cred.png"];
 

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
          this.maquina -= 1;
      }
      else if (eleccion=="papel" && this.elecciones [eleccionMaquina]=="tijeras"
      ||eleccion=="piedra" && this.elecciones [eleccionMaquina]=="papel"
      ||eleccion=="tijeras" && this.elecciones [eleccionMaquina]=="papel"){
        this.r = "Has elegido mal estúdipo 🤌"
        this.jugador -= 1;

      }
      else{
        this.r = ". . . Empate"
      }
      
      
  }


  
}
