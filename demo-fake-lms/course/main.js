(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n</div>\n<article style=\"text-align:center\">\n  <p>\n    SCORM API version: {{apiVersion}}\n  </p>\n  <p>\n    Press the buttons to change your score. The score will be send to the LMS, if it is connected and SCORM_API is\n    found.\n  </p>\n\n  <button (click)=\"changeScore(score-1)\">-</button>\n  {{score}}\n  <button (click)=\"changeScore(score+1)\">+</button>\n  <hr>\n  <div style=\"text-align:center\">\n    <button (click)=\"submitScore()\">Save</button>\n  </div>\n</article>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lms_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lms.service */ "./src/app/lms.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(lmsService) {
        this.lmsService = lmsService;
        this.title = 'ngx-scorm-wrapper-demo';
        this.score = 0;
        this.maxScore = 100;
        this.minScore = 0;
        this.apiVersion = 'not found';
        this.apiVersion = lmsService.apiVersion;
        this.score = lmsService.score;
    }
    AppComponent.prototype.changeScore = function (score) {
        if (score >= this.minScore && score <= this.maxScore) {
            this.score = score;
            this.lmsService.score = this.score;
        }
        else {
            this.score = score < this.minScore ? this.minScore : this.maxScore;
        }
    };
    AppComponent.prototype.submitScore = function () {
        this.lmsService.commit(); // Finally saves data to LMS
        this.lmsService.terminate();
        window.close();
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_lms_service__WEBPACK_IMPORTED_MODULE_2__["LmsService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_scorm_wrapper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-scorm-wrapper */ "./node_modules/ngx-scorm-wrapper/dist/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _lms_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lms.service */ "./src/app/lms.service.ts");






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                ngx_scorm_wrapper__WEBPACK_IMPORTED_MODULE_3__["ScormWrapperModule"],
            ],
            providers: [
                _lms_service__WEBPACK_IMPORTED_MODULE_5__["LmsService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/lms.service.ts":
/*!********************************!*\
  !*** ./src/app/lms.service.ts ***!
  \********************************/
/*! exports provided: LmsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LmsService", function() { return LmsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_scorm_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-scorm-wrapper */ "./node_modules/ngx-scorm-wrapper/dist/index.js");
/* harmony import */ var _timeConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeConverter */ "./src/app/timeConverter.ts");




var LmsService = /** @class */ (function () {
    function LmsService(scormWrapper) {
        this.scormWrapper = scormWrapper;
        try {
            this.scormWrapper.doLMSInitialize(); // Try to find SCORM_API and initialize it
        }
        catch (err) {
            console.log('Cannot find LMS API');
        }
        if (!scormWrapper.LMSIsInitialized) {
            console.warn('LMS is not connected');
            return;
        }
        else {
            console.warn('LMS is connected');
            this.startTime = new Date().getTime();
            this.scormWrapper.doLMSSetValue('cmi.score.max', '100');
            this.scormWrapper.doLMSSetValue('cmi.location', '0:0'); // assume that the format is <chapter>:<page>
            this.scormWrapper.doLMSSetValue('cmi.session_time', this.sessionTime);
            this.scormWrapper.doLMSSetValue('cmi.completion_status', 'incomplete');
            this.commit();
        }
    }
    Object.defineProperty(LmsService.prototype, "apiVersion", {
        get: function () {
            return this.scormWrapper.APIVersion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LmsService.prototype, "sessionTime", {
        get: function () {
            if (this.startTime) {
                var currentTime = new Date().getTime();
                return Object(_timeConverter__WEBPACK_IMPORTED_MODULE_3__["default"])((currentTime - this.startTime) / 1000);
            }
            return '00:00:00.0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LmsService.prototype, "score", {
        get: function () {
            if (this.scormWrapper.LMSIsInitialized) {
                var scaledScore = +this.scormWrapper.doLMSGetValue('cmi.score.scaled') || 0;
                var rawScore = +this.scormWrapper.doLMSGetValue('cmi.score.raw') || 0;
                return scaledScore * 100 || rawScore;
            }
            console.warn('LMS is not connected');
            return 0;
        },
        set: function (score) {
            if (this.scormWrapper.LMSIsInitialized) {
                this.scormWrapper.doLMSSetValue('cmi.score.scaled', '' + score / 100);
                return;
            }
            console.warn('LMS is not connected');
        },
        enumerable: true,
        configurable: true
    });
    LmsService.prototype.commit = function () {
        this.scormWrapper.doLMSCommit();
    };
    LmsService.prototype.terminate = function () {
        this.scormWrapper.doLMSFinish();
    };
    LmsService.prototype.getSuspendData = function () {
        if (!this.scormWrapper.LMSIsInitialized) {
            console.warn('LMS is not connected');
            return null;
        }
        var suspendData = this.scormWrapper.doLMSGetValue('cmi.suspend_data');
        if (suspendData) {
            return JSON.parse(suspendData);
        }
        return null;
    };
    LmsService.prototype.sendData = function (data) {
        if (!this.scormWrapper.LMSIsInitialized) {
            console.warn('LMS is not connected');
            return null;
        }
        var score = data.score, location = data.location, completionStatus = data.completionStatus, suspendData = data.suspendData;
        this.scormWrapper.doLMSSetValue('cmi.score.max', '100');
        this.scormWrapper.doLMSSetValue('cmi.location', location); // assume that the format is <chapter>:<page>
        this.scormWrapper.doLMSSetValue('cmi.session_time', this.sessionTime);
        this.scormWrapper.doLMSSetValue('cmi.completion_status', completionStatus);
        this.scormWrapper.doLMSSetValue('cmi.score.scaled', score / 100 + '');
        this.scormWrapper.doLMSSetValue('cmi.core.lesson_location', location);
        this.scormWrapper.doLMSSetValue('cmi.suspend_data', JSON.stringify(suspendData));
        this.commit();
    };
    LmsService.prototype.getData = function () {
        if (!this.scormWrapper.LMSIsInitialized) {
            console.warn('LMS is not connected');
            return null;
        }
        var suspendData = this.scormWrapper.doLMSGetValue('cmi.suspend_data');
        if (suspendData) {
            return JSON.parse(suspendData);
        }
        return null;
    };
    LmsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_scorm_wrapper__WEBPACK_IMPORTED_MODULE_2__["ScormWrapperService"]])
    ], LmsService);
    return LmsService;
}());



/***/ }),

/***/ "./src/app/timeConverter.ts":
/*!**********************************!*\
  !*** ./src/app/timeConverter.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*******************************************************************************
 ** this function will convert seconds into hours, minutes, and seconds in
 ** CMITimespan type format - HHHH:MM:SS.SS (Hours has a max of 4 digits &
 ** Min of 2 digits
 *******************************************************************************/
var convertTotalSeconds = function (totalSeconds) {
    var sec = (totalSeconds % 60);
    totalSeconds -= sec;
    var tmp = (totalSeconds % 3600); // of seconds in the total # of minutes
    totalSeconds -= tmp; // of seconds in the total # of hours
    // convert seconds to conform to CMITimespan type (e.g. SS.00)
    sec = Math.round(sec * 100) / 100;
    var strSec = sec.toString();
    var strWholeSec = strSec;
    var strFractionSec = '';
    if (strSec.indexOf('.') !== -1) {
        strWholeSec = strSec.substring(0, strSec.indexOf('.'));
        strFractionSec = strSec.substring(strSec.indexOf('.') + 1, strSec.length);
    }
    if (strWholeSec.length < 2) {
        strWholeSec = '0' + strWholeSec;
    }
    strSec = strWholeSec;
    if (strFractionSec.length) {
        strSec = strSec + '.' + strFractionSec;
    }
    var hour;
    var min;
    if ((totalSeconds % 3600) !== 0) {
        hour = 0;
    }
    else {
        hour = (totalSeconds / 3600);
    }
    if ((tmp % 60) !== 0) {
        min = 0;
    }
    else {
        min = (tmp / 60);
    }
    var strHour = (hour.toString().length < 2) ? "0" + hour : hour;
    var strMin = (min.toString().length < 2) ? "0" + min : min;
    return strHour + ":" + strMin + ":" + strSec;
};
/* harmony default export */ __webpack_exports__["default"] = (convertTotalSeconds);


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\WORK\personal-projects\ngx-scorm-wrapper-demo\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map