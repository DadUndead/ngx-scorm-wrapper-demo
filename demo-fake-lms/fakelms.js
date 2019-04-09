/**
*  FakeLMS utility
*  Used this page as reference : http://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/
*  
*/
var FakeLMS = {}

/**
* Tells whether FakeLMS is usable here and now 
*/
FakeLMS.isAvailable = function(undefined) {
	return undefined != window && 'localStorage' in window;
}

FakeLMS.returnBooleanStrings = false;

/**
* Attaches the fake LMS API to the window object so that you can discover it like a genuine one.
*
*/
FakeLMS.attachLMSAPIToWindow = function() {
	window.API_1484_11 = new FakeLMSAPI();
}

FakeLMS.clearData = function() {
	['exit','success_status','completion_status','interactions'].forEach(window.localStorage.removeItem.bind(window.localStorage));
	window.localStorage.setItem('total_time', 0);
}

// error constants
var a;
FakeLMS.STATUS = {
	STARTED: 0,
	INITIALIZED: 1,
	TERMINATED : 2
}
var ERRCODES = {};
var ERRSTRINGS = [];
a = ERRCODES.NO_ERROR = 0;
ERRSTRINGS[a] = "No Error";
a = ERRCODES.GENERAL_INITIALIZATION_FAILURE = 102;
ERRSTRINGS[a] = "General Initialization Failure";
a = ERRCODES.ALREADY_INITIALIZED = 103;
ERRSTRINGS[a] = "Already Initialized";
a = ERRCODES.CONTENT_INSTANCE_TERMINATED = 104;
ERRSTRINGS[a] = "Content Instance Terminated";
a = ERRCODES.GENERAL_TERMINATION_FAILURE = 111;
ERRSTRINGS[a] = "General Termination Failure";
a = ERRCODES.TERMINATION_BEFORE_INITIALIZATION = 112;
ERRSTRINGS[a] = "Termination Before Initialization";
a = ERRCODES.GENERAL_ARGUMENT_ERROR = 201;
ERRSTRINGS[a] = "General Argument Error";
a = ERRCODES.GENERAL_GET_FAILURE = 301;
ERRSTRINGS[a] = "General Get Failure";
a = ERRCODES.GENERAL_SET_FAILURE = 351;
ERRSTRINGS[a] = "General Set Failure";
a = ERRCODES.UNDEFINED_DATA_ELEMENT = 401;
ERRSTRINGS[a] = "Undefined data element";
a = ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT = 402;
ERRSTRINGS[a] = "Unimplemented Data Model Element";
a = ERRCODES.DATA_MODEL_ELEMENT_VALUE_NOT_INITIALIZED = 403;
ERRSTRINGS[a] = "Data Model Element Value Not Initialized";
a = ERRCODES.DATA_MODEL_ELEMENT_IS_READ_ONLY = 404;
ERRSTRINGS[a] = "Data Model Element Is Read Only";
a = ERRCODES.DATA_MODEL_ELEMENT_IS_WRITE_ONLY = 405;
ERRSTRINGS[a] = "Data Model Element Is Write Only";
a = ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE = 407;
ERRSTRINGS[a] = "Data Model Element Value Out Of Range";

FakeLMS.ERRCODES = ERRCODES;
FakeLMS.ERRSTRINGS = ERRSTRINGS;

FakeLMS.SUPPORTED_INTERACTIONS_FIELDS = ['id','type','learner_response'];
FakeLMS.VALID_INTERACTIONS_TYPE_VALUES = [
	"true-false", "choice", "fill-in", "long-fill-in", "matching",
	"performance", "sequencing", "likert", "numeric", "other"
];

var FakeLMSAPI = function() {
	if ( ! ('localStorage' in window)) {
		throw new Error('localStorage not available');
	}
	this.status = FakeLMS.STATUS.STARTED;
	this.lastErrcode = FakeLMS.ERRCODES.NO_ERROR;
	this.lastDiagnotic = '';
}

FakeLMSAPI.prototype._result = function(errcode,diagnostic,undefined) {
	this.lastErrcode = errcode;
	this.lastDiagnotic = undefined === diagnostic ? '' : diagnostic;
}

FakeLMSAPI.prototype._fail = function(errcode,diagnostic) {
	this._result(errcode,diagnostic);
	return FakeLMS.returnBooleanStrings ? "false" : false;
}

FakeLMSAPI.prototype._ok = function() {
	this._result(FakeLMS.ERRCODES.NO_ERROR);
	return FakeLMS.returnBooleanStrings ? "true" : true;
}

FakeLMSAPI.prototype.Initialize = function(wtf) {
	if ("string" != typeof wtf || wtf.length) {
		return this._fail(FakeLMS.ERRCODES.GENERAL_ARGUMENT_ERROR);
	}
	switch (this.status) {
		case FakeLMS.STATUS.STARTED:
			this.localStorage = window.localStorage
			break; // normal case
		case FakeLMS.STATUS.INITIALIZED:
			return this._fail(FakeLMS.ERRCODES.ALREADY_INITIALIZED);
		case FakeLMS.STATUS.TERMINATED:
			return this._fail(FakeLMS.ERRCODES.CONTENT_INSTANCE_TERMINATED);
		default:
			return this._fail(FakeLMS.ERRCODES.GENERAL_INITIALIZATION_FAILURE,'Unknown status '+this.status);
	}
	this.session_time = 0;
	if (null == window.localStorage.getItem('total_time')) {
		window.localStorage.setItem('total_time', 0);
	}
	this.status = FakeLMS.STATUS.INITIALIZED;
	return this._ok();
}


FakeLMSAPI.prototype.Terminate = function(wtf) {
	if ("string" != typeof wtf || wtf.length) {
		return this._fail(FakeLMS.ERRCODES.GENERAL_ARGUMENT_ERROR);
	}
	switch (this.status) {
		case FakeLMS.STATUS.STARTED:
			return this._fail(FakeLMS.ERRCODES.TERMINATION_BEFORE_INITIALIZATION);
		case FakeLMS.STATUS.INITIALIZED:
			break; // normal case
		case FakeLMS.STATUS.TERMINATED:
			// no specific error is designed for this
			// maybe not so important, lat just warn
			console.warn('LMS API : Terminate() called after termination');
			break;
		default:
			return this._fail(FakeLMS.ERRCODES.GENERAL_TERMINATION_FAILURE,'Unknown status '+this.status);
	}
	this.status = FakeLMS.STATUS.TERMINATED;
	// updating total_time by adding last set session_time
	window.localStorage.setItem('total_time', parseInt(window.localStorage.getItem('total_time')) + this.session_time);
	return this._ok();
}

/**
* Return the value for the given key.
*  
*  For now only cmi.interactions.* paths are supported.
*  
*  @param {string} path the identifier of the requested value
*/
FakeLMSAPI.prototype.GetValue = function(path) {
	if ('string' != typeof path) {
		return this._fail(FakeLMS.ERRCODES.GENERAL_ARGUMENT_ERROR,'GetValue takes a string as parameter');
	}
	var parts = path.split('.');
	if (parts.length < 2) {
		return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT);
	}
	if ('cmi' != parts[0]) {
		return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
	}
	if ( -1 != ["exit","session_time"].indexOf(parts[1])) {
		return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_IS_WRITE_ONLY);
	}
	switch (parts[1]) {
		case 'completion_status': // no break
		case 'success_status':
			return window.localStorage.getItem(parts[1]);
			break;
		case 'total_time':
			return "PT"+window.localStorage.getItem('total_time')+"S";
			break;
		case 'interactions':
			if (parts.length < 3) {
				return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
			}
			var interactions = window.localStorage.getItem('interactions');
			if (null == interactions) {
				interactions = [];
				window.localStorage.setItem('interactions',JSON.stringify(interactions));
			} else {
				try {
					interactions = JSON.parse(interactions);
				} catch (e) {
					return this._fail(FakeLMS.ERRCODES.GENERAL_GET_FAILURE, "internal : interactions parse error : "+e.message);
				}
			}
			if ('object' != typeof interactions) {
				return this._fail(FakeLMS.ERRCODES.GENERAL_GET_FAILURE, "internal : interactions is not an object");
			}
			if (! Array.isArray(interactions)) {
				return this._fail(FakeLMS.ERRCODES.GENERAL_GET_FAILURE, "internal : interactions is not an array");
			}
			var nbInteractions = interactions.length;
			switch (parts[2]) {
				case '_count':
					return nbInteractions;
				case '_children':
					return FakeLMS.SUPPORTED_INTERACTIONS_FIELDS;
				default:
					// must be an integer
					if (! parts[2].match(/^[0-9]+$/)) {
						return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
					}
					var n = parseInt(parts[2],10);
					if (n >= nbInteractions) {
						return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_NOT_INITIALIZED);
					}
					var interaction = interactions[n];
					if (parts.length < 4) {
						return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
					}
					var field = parts[3];
					if (-1 == FakeLMS.SUPPORTED_INTERACTIONS_FIELDS.indexOf(field)) {
						return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
					}
					if ( ! (field in interaction)) {
						return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_NOT_INITIALIZED,'not initialized : '+path);
					}
					return interaction[field];
			}
			break;
		default:
			return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
	}
}

FakeLMSAPI.prototype.SetValue = function(path, value) {
	if ('string' != typeof path || 'string' != typeof value) {
		return this._fail(FakeLMS.ERRCODES.GENERAL_ARGUMENT_ERROR,'SetValue takes strings as parameters');
	}
	var parts = path.split('.');
	if (parts.length < 2) {
		return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT);
	}
	if ('cmi' != parts[0]) {
		return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
	}
	if ( -1 != ["total_time"].indexOf(parts[1])) {
		return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_IS_READ_ONLY);
	}
	switch (parts[1]) {
		case 'exit':
			if (-1==["timeout", "suspend", "logout", "normal", ""].indexOf(value)) {
				return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE);
			}
			window.localStorage.setItem('exit', value); // not really necessary ? (cms.exit is write-only)
			break;
		case 'completion_status':
			if (-1==["completed", "incomplete", "not attempted", "unknown"].indexOf(value)) {
				return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE);
			}
			window.localStorage.setItem('completion_status', value);
			break;
		case 'success_status':
			if (-1==["passed", "failed", "unknown"].indexOf(value)) {
				return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE);
			}
			window.localStorage.setItem('success_status', value);
			break;
		case 'session_time':
			var captured = /PT(\d+)S/.exec(value);
			if (null == captured) {
				return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE,"set cmi.session_time with value that do not match /PT\\d+S/ (sole pattern recognized so far)");
			}
			this.session_time = parseInt(captured[1]);
			break;
		case 'interactions':
			if (parts.length < 3) {
				return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
			}
			var interactions = window.localStorage.getItem('interactions');
			if (null == interactions) {
				interactions = [];
			} else {
				try {
					interactions = JSON.parse(interactions);
				} catch (e) {
					return this._fail(FakeLMS.ERRCODES.GENERAL_SET_FAILURE, "internal : interactions parse error : "+e.message);
				}
			}
			if ('object' != typeof interactions) {
				return this._fail(FakeLMS.ERRCODES.GENERAL_SET_FAILURE, "internal : interactions is not an object");
			}
			if (! Array.isArray(interactions)) {
				return this._fail(FakeLMS.ERRCODES.GENERAL_SET_FAILURE, "internal : interactions is not an array");
			}
			var nbInteractions = interactions.length;
			switch (parts[2]) {
				case '_count':
				case '_children':
					return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_IS_READ_ONLY);
				default:
					if (parts.length < 4) {
						return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
					}
					// must be an integer
					if (! parts[2].match(/^[0-9]+$/)) {
						return this._fail(FakeLMS.ERRCODES.UNDEFINED_DATA_ELEMENT,'Unknown data element : '+path);
					}
					var field = parts[3];
					if (-1 == FakeLMS.SUPPORTED_INTERACTIONS_FIELDS.indexOf(field)) {
						return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
					}
					if ('type' == field) {
						if (-1 == FakeLMS.VALID_INTERACTIONS_TYPE_VALUES.indexOf(value)) {
							return this._fail(FakeLMS.ERRCODES.DATA_MODEL_ELEMENT_VALUE_OUT_OF_RANGE);
						}
					}
					var n = parseInt(parts[2],10);
					if (n >= nbInteractions) {
						// initializing missing elements with 'blank' interactions
						for (var i=nbInteractions; i<=n; i++) {
							interactions.push({
								id: i,
								type: 'true-false',
								learner_response: 'true'
							});
						}
					}
					interactions[n][field] = value;
					window.localStorage.setItem('interactions', JSON.stringify(interactions));
					break; // normal case
			}
			break;
		default:
			return this._fail(FakeLMS.ERRCODES.UNIMPLEMENTED_DATA_MODEL_ELEMENT);
	}
	return this._ok();
}

/**
*  Does nothing ! Should be called on real LMS though.
*/
FakeLMSAPI.prototype.Commit = function(wtf) {
	if ("string" != typeof wtf || wtf.length) {
		return this._fail(FakeLMS.ERRCODES.GENERAL_ARGUMENT_ERROR);
	}
	return this._ok();
}

FakeLMSAPI.prototype.GetLastError = function() {
	return this.lastErrcode;
}

FakeLMSAPI.prototype.GetErrorString = function(errCode) {
	return FakeLMS.ERRSTRINGS[errCode];
}

FakeLMSAPI.prototype.GetDiagnostic = function(errCode) {
	// ignoring errCode to retrieve the precise last diagnostic, if available : perhaps more than a LMS API is supposed to do ?
	return this.lastDiagnotic;
}

// visibility for direct browser testing
window.FakeLMS  = FakeLMS;

if ('undefined' != typeof module) module.exports = FakeLMS;
