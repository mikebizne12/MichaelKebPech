import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'app/app.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterModule, SharedModule, CoreModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'MichaelKebPech' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MichaelKebPech');
  });
});
