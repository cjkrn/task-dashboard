import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

export interface Task {
  id: number ;
  name: string;
  description: string;
  priority: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => {
        const maxId = tasks.reduce((max, emp) => Math.max(max, Number(emp.id)), 0);      
        task.id = maxId + 1;
        return task;
      }),
      switchMap((taskWithId) => {
        return this.http.post<Task>(this.apiUrl, taskWithId);
      })
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  
}