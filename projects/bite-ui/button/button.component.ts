import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bite-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

 
  @Input() type?: 'flat' | 'stroked' | 'basic' | 'raised' = 'basic';
  @Input() disabled?: boolean;
  @Input() loading?: boolean = false;
  @Input() translate?: 'denied' | 'access' = 'access';
  @Input() color?: 'primary' | 'accent' | 'warn' | '' = '';
  @Input() dark?: boolean = false;
  @Input() full?: boolean = false;
  @Input() size?: 'mini' | 'middle' | 'large' = 'middle';
  @Input() border?: boolean;
  @Output() clickEvent = new EventEmitter<any>();

  get _disabled(): boolean {
    return this.disabled || this.loading;
  }

  get classname(): string {
    const list: any[] = [];
    if (this.full) {
      list.push('bi-button-full');
    }
    if (this.size) {
      list.push(`bi-${this.size}-button`);
    }
    if (this.border) {
      list.push('bi-border-button');
    }
    return list.join(' ');
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event: any): void {
    if (this._disabled) {
      return;
    }
    this.clickEvent.emit(event);
  }

}
