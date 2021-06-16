import { Component, Input, Output, EventEmitter } from '@angular/core';
export class ButtonComponent {
    constructor() {
        this.type = 'basic';
        this.loading = false;
        this.translate = 'access';
        this.color = '';
        this.dark = false;
        this.full = false;
        this.size = 'middle';
        this.clickEvent = new EventEmitter();
    }
    get _disabled() {
        return this.disabled || this.loading;
    }
    get classname() {
        const list = [];
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
    ngOnInit() {
    }
    handleClick(event) {
        if (this._disabled) {
            return;
        }
        this.clickEvent.emit(event);
    }
}
ButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'bite-button',
                template: "<ng-container [ngSwitch]=\"type\">\n    <ng-container *ngSwitchCase=\"'flat'\">\n        <button mat-flat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'stroked'\">\n        <button mat-stroked-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchCase=\"'raised'\">\n        <button mat-raised-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n    <ng-container *ngSwitchDefault>\n        <button mat-button [disabled]=\"_disabled\" [color]=\"color\" [class]=\"classname\" (click)=\"handleClick($event)\">\n            <span *ngTemplateOutlet=\"BUTTON_CONTENT\"></span>\n        </button>\n    </ng-container>\n</ng-container>\n\n<ng-template #BUTTON_CONTENT>\n    <ng-container *ngIf=\"loading; else CONTENT\">\n        <span class=\"loading-icon\" [class]=\"dark ? 'dark': ''\"></span>\n    </ng-container>\n    <ng-template #CONTENT>\n        <ng-content></ng-content>\n    </ng-template>\n</ng-template>\n",
                styles: [":root{--mobile-bg:linear-gradient(#4db2ee,#fff);--primary-color:#4db2ee;--primary-color-02:rgba(\"#4DB2EE\",0.2)}@keyframes spinning{to{transform:rotate(1turn)}}@-webkit-keyframes spinning{to{transform:rotate(1turn)}}.loading-icon{display:inline-block;height:16px;line-height:16px;position:relative;text-align:center;width:16px}.loading-icon:before{-webkit-animation:spinning 1s linear infinite;animation:spinning 1s linear infinite;border:2px solid #fff;border-left-color:transparent;border-radius:50%;bottom:0;content:\"\";height:14px;left:0;margin:auto;position:absolute;right:0;top:0;width:14px}.loading-icon.dark:before{border-color:#717f86 #717f86 #717f86 transparent}.bi-large-button{height:50px}"]
            },] }
];
ButtonComponent.ctorParameters = () => [];
ButtonComponent.propDecorators = {
    type: [{ type: Input }],
    disabled: [{ type: Input }],
    loading: [{ type: Input }],
    translate: [{ type: Input }],
    color: [{ type: Input }],
    dark: [{ type: Input }],
    full: [{ type: Input }],
    size: [{ type: Input }],
    border: [{ type: Input }],
    clickEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvamFjay9qYWNrL3Byb2plY3Qvd2ViLWxpYnJhcnkvcHJvamVjdHMvYml0ZS11aS9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPL0UsTUFBTSxPQUFPLGVBQWU7SUFnQzFCO1FBN0JTLFNBQUksR0FBNkMsT0FBTyxDQUFDO1FBRXpELFlBQU8sR0FBYSxLQUFLLENBQUM7UUFDMUIsY0FBUyxHQUF5QixRQUFRLENBQUM7UUFDM0MsVUFBSyxHQUF3QyxFQUFFLENBQUM7UUFDaEQsU0FBSSxHQUFhLEtBQUssQ0FBQztRQUN2QixTQUFJLEdBQWEsS0FBSyxDQUFDO1FBQ3ZCLFNBQUksR0FBaUMsUUFBUSxDQUFDO1FBRTdDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0lBb0IvQixDQUFDO0lBbEJqQixJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsTUFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQztTQUNyQztRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBSUQsUUFBUTtJQUNSLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVTtRQUNwQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7O1lBL0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsdTdDQUFzQzs7YUFFdkM7Ozs7bUJBSUUsS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsS0FBSztvQkFDTCxLQUFLO21CQUNMLEtBQUs7bUJBQ0wsS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYml0ZS1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuIFxuICBASW5wdXQoKSB0eXBlPzogJ2ZsYXQnIHwgJ3N0cm9rZWQnIHwgJ2Jhc2ljJyB8ICdyYWlzZWQnID0gJ2Jhc2ljJztcbiAgQElucHV0KCkgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBASW5wdXQoKSBsb2FkaW5nPzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0cmFuc2xhdGU/OiAnZGVuaWVkJyB8ICdhY2Nlc3MnID0gJ2FjY2Vzcyc7XG4gIEBJbnB1dCgpIGNvbG9yPzogJ3ByaW1hcnknIHwgJ2FjY2VudCcgfCAnd2FybicgfCAnJyA9ICcnO1xuICBASW5wdXQoKSBkYXJrPzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBmdWxsPzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzaXplPzogJ21pbmknIHwgJ21pZGRsZScgfCAnbGFyZ2UnID0gJ21pZGRsZSc7XG4gIEBJbnB1dCgpIGJvcmRlcj86IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBjbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgZ2V0IF9kaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCB8fCB0aGlzLmxvYWRpbmc7XG4gIH1cblxuICBnZXQgY2xhc3NuYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgbGlzdDogYW55W10gPSBbXTtcbiAgICBpZiAodGhpcy5mdWxsKSB7XG4gICAgICBsaXN0LnB1c2goJ2JpLWJ1dHRvbi1mdWxsJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpemUpIHtcbiAgICAgIGxpc3QucHVzaChgYmktJHt0aGlzLnNpemV9LWJ1dHRvbmApO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib3JkZXIpIHtcbiAgICAgIGxpc3QucHVzaCgnYmktYm9yZGVyLWJ1dHRvbicpO1xuICAgIH1cbiAgICByZXR1cm4gbGlzdC5qb2luKCcgJyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxufVxuIl19