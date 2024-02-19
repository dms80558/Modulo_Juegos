import { Component, OnInit, Input } from '@angular/core';
import { CeldaEnum } from './CeldaEnum';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit{

  @Input() public simbolo: CeldaEnum = CeldaEnum.VACIO;
  @Input() public fila: number | undefined;
  @Input() public col: number | undefined;

  constructor(){}
  ngOnInit(){}
}
