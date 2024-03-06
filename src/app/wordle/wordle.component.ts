import { Component, HostListener } from '@angular/core';
import {words} from './words';

const LONGITUD = 5; 
const INTENTOS = 6;

const LETRAS = (() => {
  const ret: { [key: string]: boolean } = {};
  for (let charCode = 97; charCode < 97 + 26; charCode++) {
    ret[String.fromCharCode(charCode)] = true;
  }
  return ret;
})();

interface Intento{
  letras: Letra[];
}

interface Letra{
  text: string;
  estado: LetraEstado; 
}

enum LetraEstado{
  MAL,
  MATCH_COMPLETO,
  //LETRA EN LA PALABRA PERO EN LA POSICON INCORRECTA
  MATCH_PARCIAL, 
  PENDIENTE,
}

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})



export class WordleComponent {
  readonly intentos: Intento[] = [];
  private estadosDeLetraActuales = 0;
  private numIntentosEnviados  = 0;
  mensInfo: string = "";
  desaparicionInfo: boolean = false;

  private palabraEscogida = '';

  constructor() {
    // Populate initial state of "tries".
    for (let i = 0; i < INTENTOS; i++) {
        const letras: Letra[] = [];
        for (let j = 0; j < LONGITUD; j++) {
            letras.push({text: '', estado: LetraEstado.PENDIENTE});
        }
        this.intentos.push({letras});
    }

    const longWords = words.length;
    while(true){
      const index = Math.floor(Math.random()* longWords);
      const palabra = words[index];
      if(palabra.length==LONGITUD){
        this.palabraEscogida = palabra.toLowerCase();
        break;
      }
      
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event:KeyboardEvent){
    this.handleClickKey(event.key);
  }

  private handleClickKey(key: string){
    
    if (LETRAS[key.toLowerCase()]) {
      if(this.estadosDeLetraActuales < (this.numIntentosEnviados+1)*LONGITUD){
        this.setLetra(key);
        this.estadosDeLetraActuales++;
      }
    }
    else if(key=='Backspace'){
      if(this.estadosDeLetraActuales > this.numIntentosEnviados*LONGITUD){
        this.numIntentosEnviados--;
        this.setLetra('');
      }
    } else if(key == 'Enter'){
      this.comprobarIntentoActual();
    }
  }

  private setLetra(letra:string){
    const intentosIndex = Math.floor(this.estadosDeLetraActuales/LONGITUD);
    const letraIndex = this.estadosDeLetraActuales - intentosIndex * LONGITUD;
    this.intentos[intentosIndex] .letras[letraIndex].text = letra;

  }

  private comprobarIntentoActual(){
    const intentoAct = this.intentos[this.numIntentosEnviados];
    if(intentoAct.letras.some(letra => letra.text =='')){
      this.mostrarMensaje(this.palabraEscogida);
    }
  }

  private mostrarMensaje(m:string){
    this.mensInfo = m; 
    setTimeout(()=>{
      this.desaparicionInfo = true;
      setTimeout(()=>{
        this.mensInfo='';
        this.desaparicionInfo = false;
      },500);
    },2000);
  }
}
