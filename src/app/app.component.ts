import { transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task } from './task/task';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskDialogComponent,
  TaskDialogResult,
} from './task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todo = this.store.collection('todo').valueChanges({ idField: 'id' });
  inProgress = this.store
    .collection('inProgress')
    .valueChanges({ idField: 'id' });
  done = this.store.collection('done').valueChanges({ idField: 'id' });

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  edit(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      //not cancel situation
      if (result !== undefined) {
        if (result.delete) {
          //delete
          dataList.splice(taskIndex, 1);
        } else {
          //change
          dataList[taskIndex] = task;
        }
      }
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      //not cancel situation
      if (result !== undefined) {
        this.todo.push(result.task);
      }
    });
  }
}
