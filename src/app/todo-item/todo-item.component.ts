import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  template: `
    <p fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="20px">
      <mat-form-field class="example-full-width">
        <input (change)="updateItem('description', $event.target.value)" matInput value="{{data.description}}">
      </mat-form-field>
      <span>{{data.date | date:'short'}}</span>
      <mat-checkbox (change)="updateItem('completed', $event.checked)" [checked]="data.completed"></mat-checkbox>
      <mat-icon (click)="removeObject()" class="close" aria-hidden="false" aria-label="Example home icon">close</mat-icon>
    </p>
  `,
  styles: [`.close{cursor: pointer;}`]
})
export class TodoItemComponent implements OnInit {
  _ref: any;
  @Input() data: any;
  @Output() updatedItemEvent = new EventEmitter<string>();
  @Output() deletedItemEvent = new EventEmitter<string>();

  ngOnInit(): void {
    if (Object.keys(this.data).length === 0){
      // set default values
      this.data = {
        id: 13, // TODO: replace with uuid
        description: '',
        date: new Date(),
        completed: false
      };
    }
  }

  removeObject(): void {
    this.deleteItem();
    this._ref.destroy();
  }

  updateItem(key: string, value: any): void {
    const updatedData = this.data;
    updatedData[key] = value;
    this.updatedItemEvent.emit(updatedData);
  }

  deleteItem(): void {
    this.deletedItemEvent.emit(this.data);
  }
}
