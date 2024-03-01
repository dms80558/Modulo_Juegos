import { Component, HostListener } from '@angular/core';

const LONGITUD = 5; 
const INTENTOS = 6;

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

  constructor() {
    // Populate initial state of "tries".
    for (let i = 0; i < INTENTOS; i++) {
      const letras: Letra[] = [];
      for (let j = 0; j < LONGITUD; j++) {
        letras.push({text: '', estado: LetraEstado.PENDIENTE});
      }
      this.intentos.push({letras});
    }
  }
  @HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.handleClickKey(event.key);
}
  handleClickKey(key: string) {
    if (this.won) {
      return;
    }
    if (LETTERS[key.toLowerCase()]) {
      // Only allow typing letters in the current try. Don't go over if the
      // current try has not been submitted.
      if (this.curLetterIndex < (this.numSubmittedTries + 1) * WORD_LENGTH) {
        this.setLetter(key);
        this.curLetterIndex++;
      }
    }
    // Handle delete.
    else if (key === 'Backspace') {
      // Don't delete previous try.
      if (this.curLetterIndex > this.numSubmittedTries * WORD_LENGTH) {
        this.curLetterIndex--;
        this.setLetter('');
      }
    }
    // Submit the current try and check.
    else if (key === 'Enter') {
      this.checkCurrentTry();
    }
  }

}
