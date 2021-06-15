import { EventEmitter, OnInit } from '@angular/core';
export declare type AlertType = 'success' | 'danger' | 'warning' | 'info';
export declare class AlertComponent implements OnInit {
    type: AlertType;
    showIcon: boolean;
    closeable: boolean;
    closeEvent: EventEmitter<boolean>;
    hide: boolean;
    constructor();
    ngOnInit(): void;
    close(): void;
}
