import { OnInit, EventEmitter } from '@angular/core';
export declare class ButtonComponent implements OnInit {
    type?: 'flat' | 'stroked' | 'basic' | 'raised';
    disabled?: boolean;
    loading?: boolean;
    translate?: 'denied' | 'access';
    color?: 'primary' | 'accent' | 'warn' | '';
    dark?: boolean;
    full?: boolean;
    size?: 'mini' | 'middle' | 'large';
    border?: boolean;
    clickEvent: EventEmitter<any>;
    get _disabled(): boolean;
    get classname(): string;
    constructor();
    ngOnInit(): void;
    handleClick(event: any): void;
}
