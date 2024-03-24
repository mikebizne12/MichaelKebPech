import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmComponent } from '@shared/components/modal-confirm/modal-confirm.component';

describe('ModalConfirmComponent', () => {
  let component: ModalConfirmComponent;
  let fixture: ComponentFixture<ModalConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmed value', () => {
    let emittedValue: boolean | null = null;
    component.confirmed.subscribe((value) => (emittedValue = value));

    component.handleConfirm(true);
    expect(emittedValue).toBe(true);

    component.handleConfirm(false);
    expect(emittedValue).toBe(false);
  });
});
