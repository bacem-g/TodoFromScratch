import { TestBed, inject } from '@angular/core/testing';

import { TodoCreatedNotificationService } from './todo-created-notification.service';

describe('TodoCreatedNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoCreatedNotificationService]
    });
  });

  it('should be created', inject([TodoCreatedNotificationService], (service: TodoCreatedNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
