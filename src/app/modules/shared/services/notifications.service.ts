import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  constructor(private readonly toastrService: ToastrService) {}

  success(message: string) {
    this.toastrService.success(message, 'Success', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }

  info(message: string) {
    this.toastrService.info(message, 'Info', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }

  warning(message: string) {
    this.toastrService.warning(message, 'Warning', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }

  error(message: string) {
    this.toastrService.error(message, 'Error', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
    });
  }
}
