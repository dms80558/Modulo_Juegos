import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren('intentosContenedor') intentosContenedor !: QueryList<ElementRef>;
  readonly intentos: Intento[] = [];
  readonly LetraEstado = LetraEstado;
  private estadosDeLetraActuales = 0;
  private numIntentosEnviados  = 0;
  mensInfo: string = "";
  desaparicionInfo: boolean = false;
  won : boolean = false;

  private palabraEscogida = '';
  private contadorLetrasWord: {[letra: string]: number} = {};

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

    
    for(const letra of this.palabraEscogida){
      const count = this.contadorLetrasWord[letra];
      if(count == null){
        this.contadorLetrasWord[letra] = 0; 
      }
      this.contadorLetrasWord[letra]++;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event:KeyboardEvent){
    this.handleClickKey(event.key);
  }

  private handleClickKey(key: string){
    if(this.won){
      return;
    }
    if (LETRAS[key.toLowerCase()]) {
      if(this.estadosDeLetraActuales < (this.numIntentosEnviados+1)*LONGITUD){
        this.setLetra(key);
        this.estadosDeLetraActuales++;
      }
    }
    else if(key=='Backspace'){
      if(this.estadosDeLetraActuales > this.numIntentosEnviados*LONGITUD){
        this.estadosDeLetraActuales--;
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

  private async comprobarIntentoActual(){
    const intentoAct = this.intentos[this.numIntentosEnviados];
    if(intentoAct.letras.some(letra => letra.text =='')){
      this.mostrarMensaje("Faltan letras");
    }

    const wordFromCurTry = intentoAct.letras.map(letra => letra.text).join('').toUpperCase();
    if(!words.includes(this.palabraEscogida)){
      this.mostrarMensaje("No es una palabra de la lista");
      return;
    }

    const contadorLetrasWord = {...this.contadorLetrasWord};
    const estados: LetraEstado[] = [];
    for(let i=0;i<LONGITUD;i++){
      const expected = this.palabraEscogida[i];
      const curLetra = intentoAct.letras[i];
      const got = curLetra.text.toLowerCase();
      let estado = LetraEstado.MAL;
      if(expected==got && contadorLetrasWord[got] > 0){
        contadorLetrasWord[expected]--;
        estado = LetraEstado.MATCH_COMPLETO;
      }else if(this.palabraEscogida.includes(got) && contadorLetrasWord[got] > 0){
        contadorLetrasWord[expected]--;
        estado = LetraEstado.MATCH_PARCIAL;
      }
      estados.push(estado);  
    }
    const intentosContenedor = this.intentosContenedor.get(this.numIntentosEnviados)?.nativeElement as 
      HTMLElement;
      const letterEles = intentosContenedor.querySelectorAll('.letra-contenedor');
      for (let i = 0; i < letterEles.length; i++) {
        const curLetterEle = letterEles[i];
        curLetterEle.classList.add('fold');
        await this.wait(180);
        intentoAct.letras[i].estado = estados[i];
        curLetterEle.classList.remove('fold');
        await this.wait(180);
  }
  this.numIntentosEnviados++;
  if(estados.every(estado=>estado==LetraEstado.MATCH_COMPLETO)){
    this.mostrarMensaje("Has ganado");
    this.won = true;
  }
  }
  private async wait(ms: number) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    })
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
