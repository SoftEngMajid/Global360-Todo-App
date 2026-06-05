import { TestBed } from '@angular/core/testing';

// FIX: Replaced { App } with standard Angular naming conventions.
// (Make sure your actual component file exports 'AppComponent'!)
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // This runs before every single test to give us a fresh slate.
  // Think of it as spinning up a mini-browser environment just for this component.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Because this is a standalone component, we 'import' it instead of 'declaring' it.
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should successfully instantiate the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // The ultimate sanity check. If this fails, the component is totally broken 
    // (usually due to a missing dependency in the constructor).
    expect(app).toBeTruthy();
  });

  it('should render the correct title in the DOM', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    
    // We need to wait for Angular to finish its initial rendering cycle.
    // (Super important! If we skip this, we might check the DOM before the HTML is actually drawn).
    await fixture.whenStable();
    
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Query the DOM just like vanilla JavaScript to see what the user actually sees.
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');
  });
});