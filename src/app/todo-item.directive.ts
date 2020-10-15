import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appTodoItem]'
})
export class TodoItemDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
