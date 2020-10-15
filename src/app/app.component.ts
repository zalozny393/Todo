import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {TodoItemDirective} from './todo-item.directive';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>To do list:</h1>
    <ng-template appTodoItem></ng-template>
    <button (click)="addTodo()" mat-raised-button color="primary">Add todo</button>
  `
})
export class AppComponent implements OnInit {

  @ViewChild(TodoItemDirective, {static: true}) todo: TodoItemDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getList()
      .map(todo => this.addTodo(todo));
  }

  addTodo(todo: any = {}): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(TodoItemComponent);
    const componentRef = this.todo.viewContainerRef.createComponent<TodoItemComponent>(componentFactory);
    componentRef.instance._ref = componentRef;
    if (todo){
      componentRef.instance.data = todo;
      componentRef.instance.updatedItemEvent.subscribe(data => this.updateTodo(data));
      componentRef.instance.deletedItemEvent.subscribe(data => this.deleteTodo(data));
    }
  }

  updateTodo(todo: any): void{
    this.todoService.updateItem(todo);
  }

  deleteTodo(todo: any): void{
    this.todoService.deleteItem(todo);
  }
}
