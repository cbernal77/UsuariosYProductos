import { TestBed } from '@angular/core/testing';  // Importa las herramientas de testing de Angular
import { AppComponent } from './app.component';   // Importa el componente principal de la aplicación

describe('App', () => {  // Define un grupo de pruebas para el componente AppComponent
  beforeEach(async () => {  // Se ejecuta antes de cada prueba, configura el entorno de pruebas
    await TestBed.configureTestingModule({
      imports: [AppComponent],  // Importa el componente para usarlo en las pruebas
    }).compileComponents();  // Compila los componentes declarados en el módulo de pruebas
  });

  it('should create the app', () => {  // Prueba que verifica que el componente se cree correctamente
    const fixture = TestBed.createComponent(AppComponent);  // Crea una instancia del componente
    const app = fixture.componentInstance;  // Obtiene la instancia del componente creada
    expect(app).toBeTruthy();  // Espera que la instancia del componente exista y sea verdadera (no nula)
  });

  it('should render title', () => {  // Prueba que verifica que el título se renderice en el HTML
    const fixture = TestBed.createComponent(AppComponent);  // Crea una instancia del componente
    fixture.detectChanges();  // Ejecuta la detección de cambios para actualizar el DOM con el template
    const compiled = fixture.nativeElement as HTMLElement;  // Obtiene el elemento HTML renderizado
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');  
    // Busca el elemento <h1> y verifica que su texto contenga 'Hello, frontend'
  });
});




