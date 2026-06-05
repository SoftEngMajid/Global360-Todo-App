import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { TodoItem } from './todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // We need this so ngModel works in the template
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodoTitle: string = '';

  // Real-world apps usually need a loading state so the UI doesn't look frozen
  // TODO: Hook this up to a nice loading spinner in the HTML template later!
  isLoading: boolean = false; 

  // Injecting our service to handle the heavy lifting (API calls)
  constructor(private todoService: TodoService) {}

  // Lifecycle hook: triggers right as the component mounts to the screen
  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Whoops, failed to load the to-dos:', err);
        this.isLoading = false;
      }
    });
  }

  addTodo(): void {
    // Sanity check: Don't let users submit blank tasks (spaces don't count!)
    if (!this.newTodoTitle.trim()) {
        return; 
    }

    const newItem: TodoItem = {
      title: this.newTodoTitle.trim(), // Trim it here to keep the payload clean
      isCompleted: false
    };

    this.todoService.addTodo(newItem).subscribe({
      next: (createdItem) => {
        // Optimistically update the UI: shove the new item right into our local array
        this.todos.push(createdItem); 
        
        // Wipe the input box clean for the next task
        this.newTodoTitle = ''; 
      },
      error: (err) => console.error('Uh oh, could not save the new task:', err)
    });
  }

  deleteTodo(id: number | undefined): void {
    // Can't delete what doesn't have an ID
    if (!id) return;

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        // Drop the deleted item from our local array so it vanishes from the screen instantly
        this.todos = this.todos.filter(t => t.id !== id);
      },
      error: (err) => console.error('Failed to nuke the to-do item:', err)
    });
  }
}