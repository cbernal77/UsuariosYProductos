
// Importa herramientas necesarias para pruebas unitarias en Angular.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Importa el componente que se va a probar.
import { AuthComponent } from './auth.component';

// Define el grupo de pruebas para el componente AuthComponent.
describe('Auth', () => {
  // Declara una variable para la instancia del componente.
  let component: AuthComponent;
  // Declara una variable para el fixture, que es una envoltura del componente que permite acceder al DOM y disparar cambios.
  let fixture: ComponentFixture<AuthComponent>;

  // beforeEach se ejecuta antes de cada prueba.
  beforeEach(async () => {
    // Configura el entorno de pruebas de Angular.
    await TestBed.configureTestingModule({
      // Importa el componente a probar (porque es standalone).
      imports: [AuthComponent]
    })
    // Compila los componentes declarados en el módulo de prueba.
    .compileComponents();

    // Crea una instancia del componente dentro del fixture.
    fixture = TestBed.createComponent(AuthComponent);
    // Obtiene el componente desde el fixture.
    component = fixture.componentInstance;
    // Detecta y aplica los cambios iniciales de datos/binding en la vista del componente.
    fixture.detectChanges();
  });

  // Define una prueba: verificar que el componente se crea correctamente.
  it('should create', () => {
    // Espera que la instancia del componente no sea null o undefined (es decir, que fue creada correctamente).
    expect(component).toBeTruthy();
  });
});
