import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class PruebaPage {

  tempForm: FormGroup;
  unidades = ['Celsius', 'Fahrenheit', 'Kelvin'];
  origenSeleccionado: string | null = null;
  destinoSeleccionado: string | null = null;
  resultado: number | null = null;

  constructor(private fb: FormBuilder) {
    this.tempForm = this.fb.group({
      valor: ['', Validators.required],
    });
  }

  seleccionarOrigen(unidad: string) {
    this.origenSeleccionado = unidad;
  }

  seleccionarDestino(unidad: string) {
    this.destinoSeleccionado = unidad;
  }

  convertir() {
    if (!this.origenSeleccionado || !this.destinoSeleccionado) {
      alert('Seleccione unidades válidas');
      return;
    }

    const valor = this.tempForm.value.valor;
    if (isNaN(valor)) {
      alert('Ingrese un valor numérico válido');
      return;
    }

    this.resultado = this.calcularConversion(valor, this.origenSeleccionado, this.destinoSeleccionado);
  }

  calcularConversion(valor: number, origen: string, destino: string): number {
    if (origen === destino) return valor;

    let tempEnCelsius: number;

    // Convertir a Celsius primero
    switch (origen) {
      case 'Celsius':
        tempEnCelsius = valor;
        break;
      case 'Fahrenheit':
        tempEnCelsius = (valor - 32) * 5/9;
        break;
      case 'Kelvin':
        tempEnCelsius = valor - 273.15;
        break;
      default:
        return 0;
    }

    // Convertir de Celsius a la unidad de destino
    switch (destino) {
      case 'Celsius':
        return tempEnCelsius;
      case 'Fahrenheit':
        return (tempEnCelsius * 9/5) + 32;
      case 'Kelvin':
        return tempEnCelsius + 273.15;
      default:
        return 0;
    }
  }

  limpiar() {
    this.tempForm.reset();
    this.origenSeleccionado = null;
    this.destinoSeleccionado = null;
    this.resultado = null;
  }


}
