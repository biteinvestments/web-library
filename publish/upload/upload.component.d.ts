import { OnInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
export declare class UploadComponent implements OnInit {
    /**
     * @description 上传文件
     * @param file
     * @param container
     */
    uploadFileFn: any;
    accept?: string;
    acceptTip?: string;
    title?: string;
    disabled?: boolean;
    value?: any;
    defaultValue?: any;
    loading?: boolean;
    touch?: boolean;
    resultEvent: EventEmitter<any>;
    resetTouch: EventEmitter<any>;
    inputRef: ElementRef;
    fileList: any[];
    uploadResult: any;
    success: boolean;
    error: boolean;
    uploading: boolean;
    showModalSuccess: boolean;
    showModalLoading: boolean;
    get classname(): string;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    fileDomInitUpload(): void;
    uploadFile(file: File): void;
    chooseFile(): void;
    handleDelete(): void;
    reUpload(): void;
}
