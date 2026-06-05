import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // Update this port to match whatever your .NET Swagger UI showed (e.g., 5001 or 5152)
  private apiUrl = 'http://localhost:5022/api/todo';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  addTodo(item: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, item);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}