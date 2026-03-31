// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      (click)="onClick.emit()"
      [style.background-color]="color"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() color: string = 'blue';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();
}