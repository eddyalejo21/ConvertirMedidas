import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class TemperaturaPage {

  listaMedidas = [
    { medida: 'Celsius (C)', seleccionado: false, valor: 'C' },
    { medida: 'Fahrenheit  (F)', seleccionado: false, valor: 'F' },
    { medida: 'Libras (K)', seleccionado: false, valor: 'K' }
  ];

  medidasForm: FormGroup;
  valorMedida: number = null;
  valorOrigen: String = null;
  valorDestino: String = null;
  valorResultado: number = null;

  

  constructor(private formBuilder: FormBuilder) {
    this.medidasForm = this.formBuilder.group({
      valorMedida: ['', [Validators.required]],
      valorOrigen: ['']
    });
  }

  onCheckboxChangeOrigen(selectedItem: any, event: any) {
    // Desmarcar todas las opciones excepto la seleccionada
    this.listaMedidas.forEach(item => {
      item.seleccionado = item === selectedItem;
    });

    this.valorOrigen = event.detail.value;
    console.log(this.valorOrigen);
  }

  onCheckboxChangeDestino(selectedItem: any, event: any) {
    // Desmarcar todas las opciones excepto la seleccionada
    this.listaMedidas.forEach(item => {
      item.seleccionado = item === selectedItem;
    });

    this.valorDestino = event.detail.value;
  }

  calcular() {

    switch (this.valorOrigen){
      case 'C':
      this.valorResultado = this.valorMedida;
      break;
    case 'F':
      this.valorResultado = (this.valorMedida - 32) * (5 / 9);
      break;
    case 'K':
      this.valorResultado = this.valorMedida - 273.15;
      break;
    default:
      throw new Error('Unidad de temperatura no válida');
    }

  }

}
