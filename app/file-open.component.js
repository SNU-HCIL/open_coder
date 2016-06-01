"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var FileOpenComponent = (function () {
    function FileOpenComponent() {
    }
    FileOpenComponent.prototype.fileChangeEvent = function (fileInput) {
        this.files = fileInput.target.files;
    };
    FileOpenComponent.prototype.open = function () {
        console.log("Try to open ${this.files.length} files...");
    };
    FileOpenComponent = __decorate([
        core_1.Component({
            selector: 'oc-file-open',
            template: "\n    <div class=\"file_open\">\n      <input type=\"file\" (change)=\"fileChangeEvent($event)\" placeholder=\"Select CSV files (Multiple choice allowed)\">\n      <button *ngIf=\"files\" (click)=\"open()\">Open</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FileOpenComponent);
    return FileOpenComponent;
}());
exports.FileOpenComponent = FileOpenComponent;
//# sourceMappingURL=file-open.component.js.map