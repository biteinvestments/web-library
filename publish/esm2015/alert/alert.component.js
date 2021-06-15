import { Component, EventEmitter, Input, Output } from '@angular/core';
export class AlertComponent {
    constructor() {
        // Alert 类型
        this.type = 'info';
        // 是否显示图标，用于支持用户自定义图标
        this.showIcon = true;
        // 是否可关闭
        this.closeable = false;
        // 关闭回调
        this.closeEvent = new EventEmitter();
        this.hide = false;
    }
    ngOnInit() {
    }
    close() {
        this.closeEvent.emit(true);
        this.hide = true;
    }
}
AlertComponent.decorators = [
    { type: Component, args: [{
                selector: 'bite-alert',
                template: "<div class=\"bite-alert {{ type }} \" *ngIf=\"!hide\">\n  <button type=\"button\" class=\"bite-close\" (click)=\"close()\" *ngIf=\"closeable\">X</button>\n  <span class=\"bite-alert-icon icon-{{ type }}\" *ngIf=\"showIcon\"></span>\n  <ng-content></ng-content>\n</div>\n",
                styles: [".bite-alert{background-color:rgba(37,159,215,.08);padding:20px}"]
            },] }
];
AlertComponent.ctorParameters = () => [];
AlertComponent.propDecorators = {
    type: [{ type: Input }],
    showIcon: [{ type: Input }],
    closeable: [{ type: Input }],
    closeEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qYWNrL2phY2svcHJvamVjdC93ZWItbGlicmFyeS9wcm9qZWN0cy9iaXRlLXVpL2FsZXJ0LyIsInNvdXJjZXMiOlsiYWxlcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRL0UsTUFBTSxPQUFPLGNBQWM7SUFXekI7UUFUQSxXQUFXO1FBQ0YsU0FBSSxHQUFjLE1BQU0sQ0FBQztRQUNsQyxxQkFBcUI7UUFDWixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLFFBQVE7UUFDQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLE9BQU87UUFDRyxlQUFVLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFDMUUsU0FBSSxHQUFHLEtBQUssQ0FBQztJQUNHLENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7O1lBeEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsMFJBQXFDOzthQUV0Qzs7OzttQkFJRSxLQUFLO3VCQUVMLEtBQUs7d0JBRUwsS0FBSzt5QkFFTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IHR5cGUgQWxlcnRUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2RhbmdlcicgfCAnd2FybmluZycgfCAnaW5mbyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JpdGUtYWxlcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBBbGVydCDnsbvlnotcbiAgQElucHV0KCkgdHlwZTogQWxlcnRUeXBlID0gJ2luZm8nO1xuICAvLyDmmK/lkKbmmL7npLrlm77moIfvvIznlKjkuo7mlK/mjIHnlKjmiLfoh6rlrprkuYnlm77moIdcbiAgQElucHV0KCkgc2hvd0ljb24gPSB0cnVlO1xuICAvLyDmmK/lkKblj6/lhbPpl61cbiAgQElucHV0KCkgY2xvc2VhYmxlID0gZmFsc2U7XG4gIC8vIOWFs+mXreWbnuiwg1xuICBAT3V0cHV0KCkgY2xvc2VFdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBoaWRlID0gZmFsc2U7XG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBjbG9zZSgpe1xuICAgIHRoaXMuY2xvc2VFdmVudC5lbWl0KHRydWUpO1xuICAgIHRoaXMuaGlkZSA9IHRydWU7XG4gIH1cbn1cbiJdfQ==