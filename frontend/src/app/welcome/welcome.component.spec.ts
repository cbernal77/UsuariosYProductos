
import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa utilidades para testing en Angular

import { WelcomeComponent } from './welcome.component'; // Importa el componente que se va a testear

describe('Welcome', () => { // Define un suite de pruebas para el componente "Welcome"
  let component: WelcomeComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<WelcomeComponent>; // Variable para el fixture que maneja el entorno de prueba del componente

  beforeEach(async () => { // Se ejecuta antes de cada prueba, configura el entorno de pruebas
    await TestBed.configureTestingModule({ // Configura un módulo de prueba para este componente
      imports: [WelcomeComponent] // Importa el componente standalone para el test
    })
    .compileComponents(); // Compila los componentes y templates declarados

    fixture = TestBed.createComponent(WelcomeComponent); // Crea una instancia del fixture para el componente
    component = fixture.componentInstance; // Obtiene la instancia del componente desde el fixture
    fixture.detectChanges(); // Detecta cambios para actualizar la vista con datos iniciales
  });

  it('should create', () => { // Define un caso de prueba que verifica si el componente se crea correctamente
    expect(component).toBeTruthy(); // Espera que la instancia del componente exista y sea verdadera (no null ni undefined)
  });
});

