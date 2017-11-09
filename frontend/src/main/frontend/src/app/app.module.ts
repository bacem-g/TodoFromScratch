import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { AppRoutingModule } from './/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from "./todo/add-todo.component";

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
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
