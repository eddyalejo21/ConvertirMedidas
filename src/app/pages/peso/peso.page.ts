import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
})
export class PesoPage{

  listaMedidas = [
    { medida: 'Toneladas (T)', valorEnKilos: 1000 },
    { medida: 'Kilogramos (Kg)', valorEnKilos: 1 },
    { medida: 'Libras (Lb)', valorEnKilos: 0.4536 },
    { medida: 'Gramos (Gr)', valorEnKilos: 0.001 },
  ];

  medidasForm: FormGroup;
  valorMedida: number = null;
  valorOrigen: number = null;
  valorDestino: number = null;
  valorResultado: number = null;

  constructor(private formBuilder: FormBuilder) {
    this.medidasForm = this.formBuilder.group({
      opcionSeleccionadaOrigen: ['', [Validators.required]],
      opcionSeleccionadaDestino: ['', [Validators.required]],
      valorMedida: ['', [Validators.required]]
    });
  }

  calcular() {
    this.valorMedida = this.medidasForm.value.valorMedida;
    this.valorOrigen = this.medidasForm.value.opcionSeleccionadaOrigen;
    this.valorDestino = this.medidasForm.value.opcionSeleccionadaDestino;
    this.valorResultado = (this.valorMedida * this.valorOrigen) / this.valorDestino;
  }

  limpiarValores(){
    this.medidasForm = this.formBuilder.group({
      opcionSeleccionadaOrigen: [''],
      opcionSeleccionadaDestino: [''],
      valorMedida: ['', [Validators.required]],
      valorResultado: ['']
    });

    this.valorResultado = null;
  }

}
