import { Injectable } from '@angular/core';

const MOCK_TODO = [
  {
    id: 1,
    description: 'Implement pipeline',
    date: new Date(),
    completed: true
  },
  {
    id: 2,
    description: 'Increase test coverage',
    date: new Date(),
    completed: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  getList(): any[]{
    console.log('Retrieve:', MOCK_TODO);
    return MOCK_TODO;
  }

  updateItem(data: any): void{
    console.log('Updated:', data);
    // TODO: send data to api
  }

  deleteItem(data: any): void{
    console.log('Deleted:', data);
    // TODO: send data to api
  }
}
