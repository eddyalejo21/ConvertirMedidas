import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-distancia',
  templateUrl: './distancia.page.html',
  styleUrls: ['./distancia.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class DistanciaPage implements OnInit {

  private formBuilder = inject(FormBuilder)

  listaMedidas = [
    { medida: 'Kilómetros (Km)', valorEnMetros: 1000 },
    { medida: 'Metros (M)', valorEnMetros: 1 },
    { medida: 'Centímetros (Cm)', valorEnMetros: 0.01 },
    { medida: 'Milímetros (Mm)', valorEnMetros: 0.001 },
  ];

  customActionSheetOptions = {
    header: 'Medidas de Distancia',
    subHeader: 'Medida Inicial',
  };

  medidasForm: FormGroup;
  valorMedida: number = null;
  valorOrigen: number = null;
  valorDestino: number = null;
  valorResultado: number = null;

  constructor() { }

  ngOnInit() {
    this.medidasForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      valorMedida: ['', [Validators.required]]
    });
  }

  seleccionarOrigen(event: any) {
    this.valorOrigen = event.detail.value;
  }

  seleccionarDestino(event: any) {
    this.valorDestino = event.detail.value;
  }

  calcularValores() {
    this.valorMedida = this.medidasForm.value['valorMedida']
    this.valorResultado = (this.valorMedida * this.valorOrigen) / this.valorDestino
  }

  limpiarValores(){
    console.log('Limpiar');
    this.valorMedida = null;
    this.valorOrigen = null;
    this.valorDestino = null;
    this.valorResultado = 0;
    console.log('Valor Medida =>', this.valorMedida);
    this.listaMedidas = [...this.listaMedidas];
  }

}
