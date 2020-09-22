import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ConfirmComponent } from '../components/confirm/confirm.component';

@Directive({
  selector: '[appConfirm]',
})
export class ConfirmDirective implements OnInit, OnDestroy {
  @Output() confirm: EventEmitter<void> = new EventEmitter();
  @Output() decline: EventEmitter<void> = new EventEmitter();

  confirm$: Observable<void> = this.confirm.asObservable();
  decline$: Observable<void> = this.confirm.asObservable();

  dialog: MatDialogRef<ConfirmComponent>;
  subscriptions: Subscription[] = [];

  constructor(private readonly matDialog: MatDialog) {}

  ngOnInit() {
    this.subscriptions.push(
      this.confirm$.subscribe(() => {
        if (this.dialog) {
          this.dialog.close();
        }
      })
    );

    this.subscriptions.push(
      this.decline$.subscribe(() => {
        if (this.dialog) {
          this.dialog.close();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  @HostListener('click')
  onHostClick(): void {
    this.dialog = this.matDialog.open(ConfirmComponent, { data: { confirm: this.confirm, decline: this.decline } });
  }
}
