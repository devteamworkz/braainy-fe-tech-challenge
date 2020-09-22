import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  @Output() confirm: EventEmitter<void>;
  @Output() decline: EventEmitter<void>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { confirm: EventEmitter<void>; decline: EventEmitter<void> }) {}

  ngOnInit(): void {
    this.confirm = this.data.confirm;
    this.decline = this.data.decline;
  }

  yes(): void {
    this.confirm.emit();
  }

  no(): void {
    this.decline.emit();
  }
}
