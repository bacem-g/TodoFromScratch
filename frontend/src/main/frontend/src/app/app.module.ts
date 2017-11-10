import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { AppRoutingModule } from './/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from "./todo/add-todo.component";
import { TodoService } from "./todo/todo.service";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TodoCreatedNotificationService } from "./todo/todo-created-notification.service";


@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [TodoService,
              TodoCreatedNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
