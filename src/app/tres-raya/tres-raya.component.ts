import { Component, OnInit } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
import { CeldaEnum } from '../celda/CeldaEnum';

@Component({
  selector: 'app-tres-raya',
  templateUrl: './tres-raya.component.html',
  styleUrls: ['./tres-raya.component.css']
})
export class TresRayaComponent implements OnInit {
  private jugadorTurno: CeldaEnum | undefined;
  public tabla: CeldaEnum[][] = [];
  private gameOver: boolean = false;
  public mensajes: String = "";

  constructor(){}

  ngOnInit(): void {

    this.newJuego();
  }

  get finJuego():boolean{
    return this.gameOver;
  }

  newJuego(){
    this.crearTabla();
    this.jugadorTurno = CeldaEnum.X;
    this.gameOver = false;
    this.mensajes = 'Jugador actual ' +this.jugadorTurno;
  }

  public crearTabla(){
    this.tabla = [];
    for(let fila = 0; fila<3; fila++){
      this.tabla[fila] = [];
      for(let col= 0; col<3; col++){
        this.tabla[fila][col] = CeldaEnum.VACIO;
      }
    }
  }

  mover(fila:number,col:number): void{
    if(!this.gameOver && this.tabla[fila][col]=== CeldaEnum.VACIO){
      
      this.tabla[fila][col] = this.jugadorTurno!;
      
      if(this.empate()){
        this.mensajes = "Empate";
        this.gameOver = true;
      }
      else if(this.ganador()){
        this.mensajes = 'Gano' + this.jugadorTurno;
        this.gameOver = true;
      }
      else{
        this.jugadorTurno = this.jugadorTurno === CeldaEnum.X ? CeldaEnum.O : CeldaEnum.X;
      }
    }
    this.mensajes = 'Jugador actual ' +this.jugadorTurno;
  }

  empate():boolean{
    for(const columnas of this.tabla){
      for(const col of columnas){
        if(col === CeldaEnum.VACIO){
          return false;
        }
      }
    }
    return !this.ganador();
  }

  ganador(): boolean{
    //horizontal
    for(const columnas of this.tabla){
      if(columnas[0]=== columnas[1] && columnas[0] === columnas[2] && columnas[0]!==CeldaEnum.VACIO){
        return true;
      }
    }
    //vertical 
    for(let col=0; col< this.tabla[0].length; col++){
      if(
        this.tabla[0][col] === this.tabla[1][col] &&
        this.tabla[0][col] === this.tabla[2][col] &&
        this.tabla[0][col] !== CeldaEnum.VACIO
      ){
        return true;
      }
    }

    //diagonales
    if(
      this.tabla[0][0] === this.tabla[1][1] &&
      this.tabla[0][0] === this.tabla[2][2] &&
      this.tabla[0][0] !== CeldaEnum.VACIO
    ){
      return true;
    }
    if(
      this.tabla[0][2] === this.tabla[1][1] &&
      this.tabla[0][2] === this.tabla[2][2] &&
      this.tabla[0][2] !== CeldaEnum.VACIO
    ){
      return true;
    }

    return false;
  }


}
