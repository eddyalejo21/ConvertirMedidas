import { CommonModule } from '@angular/common';
import { compileNgModule } from '@angular/compiler';
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
    { medida: 'Kelvin (K)', seleccionado: false, valor: 'K' }
  ];

  medidasForm: FormGroup;
  valorMedida: number = null;
  valorOrigen: String = null;
  valorDestino: String = null;
  valorResultado: number = null;

  constructor(private formBuilder: FormBuilder) {
    this.medidasForm = this.formBuilder.group({
      valorMedida: ['', [Validators.required]],
      valorOrigen: [''],
      valorDestino: ['']
    });
  }

  onCheckboxChangeOrigen(selectedItem: any, event: any) {
    // Desmarcar todas las opciones excepto la seleccionada
    this.listaMedidas.forEach(item => {
      item.seleccionado = item === selectedItem;
    });

    this.valorOrigen = event.detail.value;
  }

  customActionSheetOptions = {
    header: 'Medidas de Distancia',
    subHeader: 'Medida Inicial',
  };

  seleccionarDestino(event: any) {
    this.valorDestino = event.detail.value;
    console.log('Valor', this.valorDestino)
  }

  calcular() {
    if (this.valorOrigen === this.valorDestino) return this.valorMedida;

    let tempEnCelsius: number;

    // Convertir a Celsius primero
    switch (this.valorOrigen) {
      case 'C':
        tempEnCelsius = this.valorMedida;
        break;
      case 'F':
        tempEnCelsius = (this.valorMedida - 32) * 5 / 9;
        break;
      case 'K':
        tempEnCelsius = this.valorMedida - 273.15;
        break;
      default:
        return 0;
    }

    // Convertir de Celsius a la unidad de destino
    switch (this.valorDestino) {
      case 'C':
        this.valorResultado = tempEnCelsius
        return this.valorResultado;
      case 'F':
        this.valorResultado = (tempEnCelsius * 9 / 5) + 32
        return this.valorResultado;
      case 'K':
        this.valorResultado = tempEnCelsius + 273.15
        return this.valorResultado;
      default:
        return 0;
    }

  }

  limpiarValores() {
    this.medidasForm.reset(); // Reinicia el formulario
    this.valorMedida = null;
    this.valorOrigen = null;
    this.valorDestino = null;
    this.valorResultado = null;
    this.listaMedidas = [...this.listaMedidas];

    // Desmarcar todos los checkboxes
    this.listaMedidas.forEach(item => item.seleccionado = false);

  }

}
