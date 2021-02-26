"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTrigger = exports.getTrigger = exports.revertTriggers = exports.listTriggers = exports.deleteTrigger = exports.triggerGroupTrigger = exports.timerTrigger = exports.jsErrTrigger = exports.historyChangeTrigger = exports.customEventTrigger = exports.youTubeTrigger = exports.scrollDepthTrigger = exports.formSubmitTrigger = exports.elementVisTrigger = exports.clickLinkTrigger = exports.clickAllElementTrigger = exports.windowLoadedTrigger = exports.domReadyTrigger = exports.pageviewAll = exports.pageviewTrigger = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create Triggers**************************************/
//Start Pageview
async function pageviewTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = pageviewAll(triggerName);
    const reqBodyCondition = pageviewSome(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.pageviewTrigger = pageviewTrigger;
function pageviewSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'pageview',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
async function pageviewAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'pageview',
    };
}
exports.pageviewAll = pageviewAll;
//End Pageview
//Start DOM Ready
async function domReadyTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = domBodyAll(triggerName);
    const reqBodyCondition = domBodyCondition(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.domReadyTrigger = domReadyTrigger;
function domBodyCondition(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'domReady',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function domBodyAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'domReady',
    };
}
//End DOM Ready
//Window Loaded
async function windowLoadedTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = windowBodyAll(triggerName);
    const reqBodyCondition = windowBodyCondition(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.windowLoadedTrigger = windowLoadedTrigger;
function windowBodyCondition(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'windowLoaded',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function windowBodyAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'windowLoaded',
    };
}
//End Window Loaded
//Click - All Elements
async function clickAllElementTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = clickElementBodyAll(triggerName);
    const reqBodyCondition = clickElementBodyCondition(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickAllElementTrigger = clickAllElementTrigger;
function clickElementBodyCondition(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'click',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function clickElementBodyAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'click',
    };
}
//End Click - All Elements
//Click - Link Click
async function clickLinkTrigger(obj, triggerName, triggerCondition, key, val, waitForTagsBool, waitForTagsTimeout, checkValidationBool, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal) {
    const reqBodyAll = clickLinkBodyAll(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool);
    const reqBodySome = clickLinkBodySome(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool, triggerCondition, key, val);
    const reqBodyCondition = clickLinkBodyCondition(triggerName, triggerCondition, key, val, waitForTagsBool, waitForTagsTimeout, checkValidationBool, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal);
    const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySome
        : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickLinkTrigger = clickLinkTrigger;
function clickLinkBodyCondition(triggerName, triggerCondition, key, val, waitForTagsBool, waitForTagsTimeout, checkValidationBool, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal) {
    return {
        "name": triggerName,
        "type": 'linkClick',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        waitForTags: {
            type: 'boolean',
            value: waitForTagsBool //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: waitForTagsTimeout //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: checkValidationBool //string of true or false
        },
        autoEventFilter: [
            {
                type: autoEventFilterCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: autoEventFilterKey
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: autoEventFilterVal
                    }
                ]
            }
        ],
    };
}
function clickLinkBodySome(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'linkClick',
        waitForTags: {
            type: 'boolean',
            value: waitForTagsBool //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: waitForTagsTimeout //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: checkValidationBool //string of true or false
        },
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function clickLinkBodyAll(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool) {
    return {
        "name": triggerName,
        "type": 'linkClick',
        waitForTags: {
            type: 'boolean',
            value: waitForTagsBool //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: waitForTagsTimeout //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: checkValidationBool
        }
    };
}
//End Click - Link Click
//Element Visibility
async function elementVisTrigger(obj, triggerName, selectionMethod, elementVal, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration, FireOnSomeOrAllEvents, triggerCondition, key, val) {
    const selectorType = selectionMethod === 'elementId' ? 'ID' : 'CSS';
    const requestAll = elementVisReqAll(triggerName, selectionMethod, elementVal, selectorType, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration);
    const requestSome = elementVisReqSome(triggerName, triggerCondition, key, val, selectionMethod, elementVal, selectorType, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration);
    const requestBody = FireOnSomeOrAllEvents === 'all' ? requestAll
        : FireOnSomeOrAllEvents === 'some' ? requestSome : null;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.elementVisTrigger = elementVisTrigger;
function elementVisReqSome(triggerName, triggerCondition, key, val, selectionMethod, elementVal, selectorType, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration) {
    return {
        name: triggerName,
        type: 'elementVisibility',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key //key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val //value
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'template',
                key: selectionMethod,
                value: elementVal
            },
            {
                type: 'template',
                key: 'selectorType',
                value: selectorType
            },
            {
                type: 'boolean',
                key: 'useOnScreenDuration',
                value: useOnScreenDuration //Bool String
            },
            {
                type: 'boolean',
                key: 'useDomChangeListener',
                value: domChangeListener //Bool String
            },
            {
                type: 'template',
                key: 'firingFrequency',
                value: firingFrequency //ONCE, ONCE_PER_ELEMENT, MANY_PER_ELEMENT
            },
            {
                type: 'template',
                key: 'onScreenRatio',
                value: onScreenRatio //Minimum Percent Visible 
            },
            {
                type: 'template',
                key: 'onScreenDuration',
                value: onScreenDuration
            }
        ]
    };
}
function elementVisReqAll(triggerName, selectionMethod, elementVal, selectorType, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration) {
    return {
        name: triggerName,
        type: 'elementVisibility',
        parameter: [
            {
                type: 'template',
                key: selectionMethod,
                value: elementVal
            },
            {
                type: 'template',
                key: 'selectorType',
                value: selectorType
            },
            {
                type: 'boolean',
                key: 'useOnScreenDuration',
                value: useOnScreenDuration //Bool String
            },
            {
                type: 'boolean',
                key: 'useDomChangeListener',
                value: domChangeListener //Bool String
            },
            {
                type: 'template',
                key: 'firingFrequency',
                value: firingFrequency //ONCE, ONCE_PER_ELEMENT, MANY_PER_ELEMENT
            },
            {
                type: 'template',
                key: 'onScreenRatio',
                value: onScreenRatio //Minimum Percent Visible 
            },
            {
                type: 'template',
                key: 'onScreenDuration',
                value: onScreenDuration
            }
        ]
    };
}
//End Element Visibility
//Form Submission
async function formSubmitTrigger(obj, triggerName, waitForTagsBool, checkValidationBool, waitForTagsTimeout, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, triggerCondition, key, val) {
    //All Forms
    const reqBodyAll = formSubmitAll(triggerName);
    // Some Forms 
    const reqBodySomeForms = formSubmitSome(triggerName, triggerCondition, key, val);
    //Some Forms with wait for tags or check validation 
    const reqBodyCondition = formSubmitReqCondition(triggerName, triggerCondition, key, val, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, waitForTagsBool, checkValidationBool, waitForTagsTimeout);
    const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySomeForms
        : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.formSubmitTrigger = formSubmitTrigger;
function formSubmitReqCondition(triggerName, triggerCondition, key, val, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, waitForTagsBool, checkValidationBool, waitForTagsTimeout) {
    return {
        name: triggerName,
        type: 'formSubmission',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        autoEventFilter: [
            {
                type: autoEventFilterCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: autoEventFilterKey
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: autoEventFilterVal
                    }
                ]
            }
        ],
        waitForTags: {
            type: 'boolean',
            value: waitForTagsBool //String Bool
        },
        checkValidation: {
            type: 'boolean',
            value: checkValidationBool // String Bool
        },
        waitForTagsTimeout: {
            type: 'template',
            value: waitForTagsTimeout //String in milliseconds 
        },
        uniqueTriggerId: {
            type: 'template'
        },
    };
}
function formSubmitSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'formSubmission',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function formSubmitAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'formSubmission',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false'
        }
    };
}
//End Form Submission
//Scroll Depth
async function scrollDepthTrigger(obj, triggerName, triggerFire, horizontalOn, vertOn, units, measurementValues, triggerCondition, key, val) {
    const vertUnitsMeasure = units === 'PERCENT' ? 'verticalThresholdsPercent' : 'verticalThresholdsPixels';
    const horizontalUnitsMeasure = units === 'PERCENT' ? 'horizontalThresholdsPercent' : 'horizontalThresholdsPixels';
    const reqBodyCondition = scrollDepthCondition(triggerName, triggerCondition, key, val, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire);
    const reqBodyAll = scrollDepthAll(triggerName, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.scrollDepthTrigger = scrollDepthTrigger;
function scrollDepthAll(triggerName, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire) {
    return {
        name: triggerName,
        type: 'scrollDepth',
        parameter: [
            {
                type: 'boolean',
                key: 'verticalThresholdOn',
                value: vertOn //Bool String
            },
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: units //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: vertUnitsMeasure,
                value: measurementValues // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'boolean',
                key: 'horizontalThresholdOn',
                value: horizontalOn //Bool String
            },
            {
                type: 'template',
                key: 'horizontalThresholdUnits',
                value: units //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: horizontalUnitsMeasure,
                value: measurementValues // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: triggerFire
            }
        ]
    };
}
function scrollDepthCondition(triggerName, triggerCondition, key, val, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire) {
    return {
        name: triggerName,
        type: 'scrollDepth',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'boolean',
                key: 'verticalThresholdOn',
                value: vertOn //Bool String
            },
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: units //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: vertUnitsMeasure,
                value: measurementValues // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'boolean',
                key: 'horizontalThresholdOn',
                value: horizontalOn //Bool String
            },
            {
                type: 'template',
                key: 'horizontalThresholdsPercent',
                value: units
            },
            {
                type: 'template',
                key: horizontalUnitsMeasure,
                value: measurementValues
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: triggerFire
            }
        ]
    };
}
//End Scroll Depth
//YouTube Trigger
async function youTubeTrigger(obj, triggerName, triggerStartOption, fixMissingApi, captureStart, captureComplete, capturePause, captureProgress, progressTimeOrPercent, progressVal, triggerCondition, key, val) {
    const progressThreshold = progressTimeOrPercent === 'PERCENTAGE' ? 'progressThresholdsPercent' : 'progressThresholdsTimeInSeconds';
    const reqBodyAll = ytAll(triggerName, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption);
    const reqBodyCondition = ytCondition(triggerName, triggerCondition, key, val, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.youTubeTrigger = youTubeTrigger;
function ytCondition(triggerName, triggerCondition, key, val, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption) {
    return {
        name: triggerName,
        type: 'youTubeVideo',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'boolean',
                key: 'captureProgress',
                value: captureProgress //String Bool 
            },
            {
                type: 'template',
                key: 'radioButtonGroup1',
                value: progressTimeOrPercent //TIME or PERCENT
            },
            {
                type: 'template',
                key: progressThreshold,
                value: progressVal // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
            },
            {
                type: 'boolean',
                key: 'captureStart',
                value: captureStart //String Bool
            },
            {
                type: 'boolean',
                key: 'captureComplete',
                value: captureComplete //String Bool
            },
            {
                type: 'boolean',
                key: 'capturePause',
                value: capturePause //String Bool
            },
            {
                type: 'boolean',
                key: 'fixMissingApi',
                value: fixMissingApi // String Bool 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: triggerStartOption
            },
        ]
    };
}
function ytAll(triggerName, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption) {
    return {
        name: triggerName,
        type: 'youTubeVideo',
        parameter: [
            {
                type: 'boolean',
                key: 'captureProgress',
                value: captureProgress //String Bool 
            },
            {
                type: 'template',
                key: 'radioButtonGroup1',
                value: progressTimeOrPercent //TIME or PERCENTAGE
            },
            {
                type: 'template',
                key: progressThreshold,
                value: progressVal // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
            },
            {
                type: 'boolean',
                key: 'captureStart',
                value: captureStart //String Bool
            },
            {
                type: 'boolean',
                key: 'captureComplete',
                value: captureComplete //String Bool
            },
            {
                type: 'boolean',
                key: 'capturePause',
                value: capturePause //String Bool
            },
            {
                type: 'boolean',
                key: 'fixMissingApi',
                value: fixMissingApi // String Bool 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: triggerStartOption
            },
        ]
    };
}
//End YouTube Trigger
//Custom Event
async function customEventTrigger(obj, triggerName, customEvent, useRegexMatching, triggerCondition, key, val) {
    const reqBodyAll = customEventAll(triggerName, useRegexMatching, customEvent);
    const reqBodyCondition = customEventCondition(triggerName, useRegexMatching, customEvent, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.customEventTrigger = customEventTrigger;
function customEventCondition(triggerName, useRegexMatching, customEvent, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'customEvent',
        customEventFilter: [
            {
                type: useRegexMatching,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: '{{_event}}'
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: customEvent
                    }
                ]
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function customEventAll(triggerName, useRegexMatching, customEvent) {
    return {
        name: triggerName,
        type: 'customEvent',
        customEventFilter: [
            {
                type: useRegexMatching,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: '{{_event}}'
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: customEvent
                    }
                ]
            }
        ]
    };
}
//End Custom Event
//History Change
async function historyChangeTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = historyAll(triggerName);
    const reqBodyCondition = historyCondition(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.historyChangeTrigger = historyChangeTrigger;
function historyCondition(triggerName, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'historyChange',
        filter: [{
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }],
    };
}
function historyAll(triggerName) {
    return {
        name: triggerName,
        type: 'historyChange'
    };
}
//End History Change
//JavaScript Error
async function jsErrTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = jsErrAll(triggerName);
    const reqBodyCondition = jsErrCondition(triggerName, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.jsErrTrigger = jsErrTrigger;
function jsErrCondition(triggerName, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'jsError',
        filter: [{
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }],
    };
}
function jsErrAll(triggerName) {
    return {
        name: triggerName,
        type: 'jsError'
    };
}
//End JavaScript Error
//Timer
async function timerTrigger(obj, triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, triggerCondition, key, val) {
    const reqBodyAll = timerAll(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal);
    const reqBodyCondition = timerCondition(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.timerTrigger = timerTrigger;
function timerCondition(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'timer',
        eventName: {
            type: 'template',
            value: eventName //gtm.timer or variable
        },
        interval: {
            type: 'template',
            value: interval //milliseconds or variable
        },
        limit: {
            type: 'template',
            value: limit //milliseconds or variable
        },
        autoEventFilter: [
            {
                type: autoEventFilterCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: autoEventFilterKey
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: autoEventFilterVal
                    }
                ]
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function timerAll(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal) {
    return {
        name: triggerName,
        type: 'timer',
        eventName: {
            type: 'template',
            value: eventName //gtm.timer or variable
        },
        interval: {
            type: 'template',
            value: interval //milliseconds or variable
        },
        limit: {
            type: 'template',
            value: limit //milliseconds or variable
        },
        autoEventFilter: [
            {
                type: autoEventFilterCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: autoEventFilterKey
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: autoEventFilterVal
                    }
                ]
            }
        ]
    };
}
//End Timer
//Trigger Group
async function triggerGroupTrigger(obj, triggerName, triggerReference, triggerCondition, key, val) {
    const reqBodyAll = triggerGroupAll(triggerName, triggerReference);
    const reqBodyCondition = triggerGroupCondition(triggerName, triggerReference, triggerCondition, key, val);
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.triggerGroupTrigger = triggerGroupTrigger;
function triggerGroupCondition(triggerName, triggerReference, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'triggerGroup',
        parameter: [
            {
                type: 'list',
                key: 'triggerIds',
                list: triggerReference
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function triggerGroupAll(triggerName, triggerReference) {
    return {
        name: triggerName,
        type: 'triggerGroup',
        parameter: [
            {
                type: 'list',
                key: 'triggerIds',
                list: triggerReference
            }
        ]
    };
}
//End Trigger Group
/*********************************Delete Triggers**************************************/
async function deleteTrigger(obj, triggerId) {
    const res = await gtm.accounts.containers.workspaces.triggers.delete({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
    });
    /** */
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
}
exports.deleteTrigger = deleteTrigger;
/*********************************List Triggers**************************************/
async function listTriggers(obj) {
    const res = await gtm.accounts.containers.workspaces.triggers.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    console.log('******************************************************************');
    console.log(res.data);
    return res.data.trigger;
}
exports.listTriggers = listTriggers;
/*********************************Revert Triggers**************************************/
async function revertTriggers(obj, triggerId) {
    const res = await gtm.accounts.containers.workspaces.variables.revert({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
    });
    console.log(res.data);
}
exports.revertTriggers = revertTriggers;
/*********************************Get Trigger**************************************/
async function getTrigger(obj, triggerId) {
    const res = await gtm.accounts.containers.workspaces.triggers.get({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
    });
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
    console.log(res.data.filter.find((id) => id.parameter));
    console.log('***********************************************');
    console.log(res.data.parameter.find((id) => id.list));
    console.log('***********************************************');
    //console.log(res.data.autoEventFilter.find((id: any) => id.parameter));
}
exports.getTrigger = getTrigger;
/*********************************Update Trigger**************************************/
async function updateTrigger(obj, triggerId, triggerName, triggerType, triggerFiresOn, triggerCondition, key, val, param1, param2, param3, param4, param5, param6, param7, param8) {
    //Pageview
    const pageviewAll = updatePageviewAll(triggerName);
    const pageviewSome = updatePageviewSome(triggerName, triggerCondition, key, val);
    //DOM Ready
    const domAll = updateDomAll(triggerName);
    const domSome = updateDomSome(triggerName, triggerCondition, key, val);
    //Window Loaded
    const windowAll = updateWindowAll(triggerName);
    const windowSome = updateWindowSome(triggerName, triggerCondition, key, val);
    //Element Clicks
    const elementClickAll = updateElementClickAll(triggerName);
    const elementClickSome = updateElementClickSome(triggerName, triggerCondition, key, val);
    //Link Click
    const linkClickAll = updateLinkClickAll(triggerName);
    const linkClickSome = updateLinkClickSome(triggerName, triggerCondition, key, val);
    //Element Vis
    const selectorType = param1 === 'elementId' ? 'ID' : 'CSS';
    const visAll = updateVisAll(triggerName, param1, param2, selectorType, param3, param4, param5, param6, param7);
    const visSome = updateVisSome(triggerName, triggerCondition, key, val, param1, param2, selectorType, param3, param4, param5, param6, param7);
    //Forms
    //All Forms
    const formAll = updateFormsAll(triggerName);
    // Some Forms 
    const formSome = updateFormsSome(triggerName, triggerCondition, key, val);
    //Some Forms with wait for tags or check validation 
    const formCondition = updateFormCondition(triggerName, triggerCondition, key, val, param1, param2, param3, param4, param5, param6);
    //Scroll
    const vertUnitsMeasure = param2 === 'PERCENT' ? 'verticalThresholdsPercent' : 'verticalThresholdsPixels';
    const horizontalUnitsMeasure = param2 === 'PERCENT' ? 'horizontalThresholdsPercent' : 'horizontalThresholdsPixels';
    const scrollSome = updateScrollSome(triggerName, triggerCondition, key, val, param1, param2, vertUnitsMeasure, param3, param4, horizontalUnitsMeasure, param5, param6);
    const scrollAll = updateScrollAll(triggerName, param1, param2, vertUnitsMeasure, param3, param4, horizontalUnitsMeasure, param5, param6);
    /////YouTube
    const progressThreshold = param2 === 'PERCENTAGE' ? 'progressThresholdsPercent' : 'progressThresholdsTimeInSeconds';
    const ytAll = updateYouTubeAll(triggerName, param1, param2, progressThreshold, param3, param4, param5, param6, param7, param8);
    const ytSome = updateYouTubeSome(triggerName, triggerCondition, key, val, param1, param2, progressThreshold, param3, param4, param5, param6, param7, param8);
    //Custom Event
    const customEventAll = updateCustomEventAll(triggerName, param1, param2);
    const customEventSome = updateCustomEventSome(triggerName, param1, param2, triggerCondition, key, val);
    //History
    const historyAll = updateHistoryAll(triggerName);
    const historySome = updateHistorySome(triggerName, triggerCondition, key, val);
    //JavaScript Error
    const jsAll = updateJsAll(triggerName);
    const jsSome = updateJsSome(triggerName, triggerCondition, key, val);
    //Timer
    const timerAll = updateTimerAll(triggerName, param1, param2, param3, param4, param5, param6);
    const timerSome = updateTimerSome(triggerName, param1, param2, param3, param4, param5, param6, triggerCondition, key, val);
    //Timer Group
    const timerGroupAll = updateTimeGroupAll(triggerName, param1);
    const timerGroupSome = updateTimeGroupSome(triggerName, param1, triggerCondition, key, val);
    const pageviewFrequency = triggerFiresOn === 'all' ? pageviewAll
        : triggerFiresOn === 'some' ? pageviewSome
            : null;
    const domFrequency = triggerFiresOn === 'all' ? domAll
        : triggerFiresOn === 'some' ? domSome
            : null;
    const windowFrequency = triggerFiresOn === 'all' ? windowAll
        : triggerFiresOn === 'some' ? windowSome
            : null;
    const elementClickFrequency = triggerFiresOn === 'all' ? elementClickAll
        : triggerFiresOn === 'some' ? elementClickSome
            : null;
    const linkClickFrequency = triggerFiresOn === 'all' ? linkClickAll
        : triggerFiresOn === 'some' ? linkClickSome
            : null;
    const visibilityFrequency = triggerFiresOn === 'all' ? visAll
        : triggerFiresOn === 'some' ? visSome : null;
    const formFrequency = param4 && param6 || param5 ? formCondition : triggerCondition ? formSome
        : formAll;
    const scrollFrequency = triggerCondition ? scrollSome : scrollAll;
    const ytFrequency = triggerCondition ? ytSome : ytAll;
    const customEventFrequency = triggerCondition ? customEventSome : customEventAll;
    const historyFrequency = triggerCondition ? historySome : historyAll;
    const jsFrequency = triggerCondition ? jsSome : jsAll;
    const timerFrequency = triggerCondition ? timerSome : timerAll;
    const timerGroupFrequency = triggerCondition ? timerGroupSome : timerGroupAll;
    const requestBody = triggerType === 'pageview' ? pageviewFrequency
        : triggerType === 'dom' ? domFrequency
            : triggerType === 'window' ? windowFrequency
                : triggerType === 'element click' ? elementClickFrequency
                    : triggerType === 'link click' ? linkClickFrequency
                        : triggerType === 'visibility' ? visibilityFrequency
                            : triggerType === 'form' ? formFrequency
                                : triggerType === 'scroll' ? scrollFrequency
                                    : triggerType === 'youtube' ? ytFrequency
                                        : triggerType === 'custom' ? customEventFrequency
                                            : triggerType === 'history' ? historyFrequency
                                                : triggerType === 'js' ? jsFrequency
                                                    : triggerType === 'timer' ? timerFrequency
                                                        : triggerType === 'group' ? timerGroupFrequency
                                                            : null;
    const res = await gtm.accounts.containers.workspaces.triggers.update({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
        requestBody: requestBody
    });
}
exports.updateTrigger = updateTrigger;
function updateTimeGroupSome(triggerName, param1, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'triggerGroup',
        parameter: [
            {
                type: 'list',
                key: 'triggerIds',
                list: param1
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateTimeGroupAll(triggerName, param1) {
    return {
        name: triggerName,
        type: 'triggerGroup',
        parameter: [
            {
                type: 'list',
                key: 'triggerIds',
                list: param1
            }
        ]
    };
}
function updateTimerSome(triggerName, param1, param2, param3, param4, param5, param6, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'timer',
        eventName: {
            type: 'template',
            value: param1 //gtm.timer or variable
        },
        interval: {
            type: 'template',
            value: param2 //milliseconds or variable
        },
        limit: {
            type: 'template',
            value: param3 //milliseconds or variable
        },
        autoEventFilter: [
            {
                type: param4,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: param5
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: param6
                    }
                ]
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateTimerAll(triggerName, param1, param2, param3, param4, param5, param6) {
    return {
        name: triggerName,
        type: 'timer',
        eventName: {
            type: 'template',
            value: param1 //gtm.timer or variable
        },
        interval: {
            type: 'template',
            value: param2 //milliseconds or variable
        },
        limit: {
            type: 'template',
            value: param3 //milliseconds or variable
        },
        autoEventFilter: [
            {
                type: param4,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: param5
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: param6
                    }
                ]
            }
        ]
    };
}
function updateJsSome(triggerName, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'jsError',
        filter: [{
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }],
    };
}
function updateJsAll(triggerName) {
    return {
        name: triggerName,
        type: 'jsError'
    };
}
function updateHistorySome(triggerName, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'historyChange',
        filter: [{
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }],
    };
}
function updateHistoryAll(triggerName) {
    return {
        name: triggerName,
        type: 'historyChange'
    };
}
function updateCustomEventSome(triggerName, param1, param2, triggerCondition, key, val) {
    return {
        name: triggerName,
        type: 'customEvent',
        customEventFilter: [
            {
                type: param1,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: '{{_event}}'
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: param2
                    }
                ]
            }
        ],
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateCustomEventAll(triggerName, param1, param2) {
    return {
        name: triggerName,
        type: 'customEvent',
        customEventFilter: [
            {
                type: param1,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: '{{_event}}'
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: param2
                    }
                ]
            }
        ]
    };
}
function updateYouTubeSome(triggerName, triggerCondition, key, val, param1, param2, progressThreshold, param3, param4, param5, param6, param7, param8) {
    return {
        name: triggerName,
        type: 'youTubeVideo',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'boolean',
                key: 'captureProgress',
                value: param1 //String Bool 
            },
            {
                type: 'template',
                key: 'radioButtonGroup1',
                value: param2 //TIME or PERCENT
            },
            {
                type: 'template',
                key: progressThreshold,
                value: param3 // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
            },
            {
                type: 'boolean',
                key: 'captureStart',
                value: param4 //String Bool
            },
            {
                type: 'boolean',
                key: 'captureComplete',
                value: param5 //String Bool
            },
            {
                type: 'boolean',
                key: 'capturePause',
                value: param6 //String Bool
            },
            {
                type: 'boolean',
                key: 'fixMissingApi',
                value: param7 // String Bool 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: param8
            },
        ]
    };
}
function updateYouTubeAll(triggerName, param1, param2, progressThreshold, param3, param4, param5, param6, param7, param8) {
    return {
        name: triggerName,
        type: 'youTubeVideo',
        parameter: [
            {
                type: 'boolean',
                key: 'captureProgress',
                value: param1 //String Bool 
            },
            {
                type: 'template',
                key: 'radioButtonGroup1',
                value: param2 //TIME or PERCENTAGE
            },
            {
                type: 'template',
                key: progressThreshold,
                value: param3 // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
            },
            {
                type: 'boolean',
                key: 'captureStart',
                value: param4 //String Bool
            },
            {
                type: 'boolean',
                key: 'captureComplete',
                value: param5 //String Bool
            },
            {
                type: 'boolean',
                key: 'capturePause',
                value: param6 //String Bool
            },
            {
                type: 'boolean',
                key: 'fixMissingApi',
                value: param7 // String Bool 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: param8
            },
        ]
    };
}
function updateScrollAll(triggerName, param1, param2, vertUnitsMeasure, param3, param4, horizontalUnitsMeasure, param5, param6) {
    return {
        name: triggerName,
        type: 'scrollDepth',
        parameter: [
            {
                type: 'boolean',
                key: 'verticalThresholdOn',
                value: param1 //Bool String
            },
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: param2 //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: vertUnitsMeasure,
                value: param3 // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'boolean',
                key: 'horizontalThresholdOn',
                value: param4 //Bool String
            },
            {
                type: 'template',
                key: 'horizontalThresholdUnits',
                value: param2 //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: horizontalUnitsMeasure,
                value: param5 // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: param6
            }
        ]
    };
}
function updateScrollSome(triggerName, triggerCondition, key, val, param1, param2, vertUnitsMeasure, param3, param4, horizontalUnitsMeasure, param5, param6) {
    return {
        name: triggerName,
        type: 'scrollDepth',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'boolean',
                key: 'verticalThresholdOn',
                value: param1 //Bool String
            },
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: param2 //PERCENT or PIXELS
            },
            {
                type: 'template',
                key: vertUnitsMeasure,
                value: param3 // percentage values (10, 25, 50, 75, 100) or pixel values (1000, 1500, 800) 
            },
            {
                type: 'boolean',
                key: 'horizontalThresholdOn',
                value: param4 //Bool String
            },
            {
                type: 'template',
                key: 'horizontalThresholdsPercent',
                value: param2
            },
            {
                type: 'template',
                key: horizontalUnitsMeasure,
                value: param5
            },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: param6
            }
        ]
    };
}
function updateFormCondition(triggerName, triggerCondition, key, val, param1, param2, param3, param4, param5, param6) {
    return {
        name: triggerName,
        type: 'formSubmission',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ],
        autoEventFilter: [
            {
                type: param1,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: param2
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: param3
                    }
                ]
            }
        ],
        waitForTags: {
            type: 'boolean',
            value: param4 //String Bool
        },
        checkValidation: {
            type: 'boolean',
            value: param5 // String Bool
        },
        waitForTagsTimeout: {
            type: 'template',
            value: param6 //String in milliseconds 
        },
        uniqueTriggerId: {
            type: 'template'
        },
    };
}
function updateFormsSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'formSubmission',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateFormsAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'formSubmission',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false'
        }
    };
}
function updateVisSome(triggerName, triggerCondition, key, val, param1, param2, selectorType, param3, param4, param5, param6, param7) {
    return {
        name: triggerName,
        type: 'elementVisibility',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key //key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val //value
                    }
                ]
            }
        ],
        parameter: [
            {
                type: 'template',
                key: param1,
                value: param2
            },
            {
                type: 'template',
                key: 'selectorType',
                value: selectorType
            },
            {
                type: 'boolean',
                key: 'useOnScreenDuration',
                value: param3 //Bool String
            },
            {
                type: 'boolean',
                key: 'useDomChangeListener',
                value: param4 //Bool String
            },
            {
                type: 'template',
                key: 'firingFrequency',
                value: param5 //ONCE, ONCE_PER_ELEMENT, MANY_PER_ELEMENT
            },
            {
                type: 'template',
                key: 'onScreenRatio',
                value: param6 //Minimum Percent Visible 
            },
            {
                type: 'template',
                key: 'onScreenDuration',
                value: param7
            }
        ]
    };
}
function updateLinkClickSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'linkClick',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateLinkClickAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'linkClick',
        waitForTags: {
            type: 'boolean',
            value: 'false' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'false'
        }
    };
}
function updateElementClickSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'click',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateElementClickAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'click',
    };
}
function updateWindowSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'windowLoaded',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateWindowAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'windowLoaded',
    };
}
function updateDomSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'domReady',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updateDomAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'domReady',
    };
}
function updatePageviewSome(triggerName, triggerCondition, key, val) {
    return {
        "name": triggerName,
        "type": 'pageview',
        filter: [
            {
                type: triggerCondition,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: key
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: val
                    }
                ]
            }
        ]
    };
}
function updatePageviewAll(triggerName) {
    return {
        "name": triggerName,
        "type": 'pageview',
    };
}
function updateVisAll(triggerName, param1, param2, selectorType, param3, param4, param5, param6, param7) {
    return {
        name: triggerName,
        type: 'elementVisibility',
        parameter: [
            {
                type: 'template',
                key: param1,
                value: param2
            },
            {
                type: 'template',
                key: 'selectorType',
                value: selectorType
            },
            {
                type: 'boolean',
                key: 'useOnScreenDuration',
                value: param3 //Bool String
            },
            {
                type: 'boolean',
                key: 'useDomChangeListener',
                value: param4 //Bool String
            },
            {
                type: 'template',
                key: 'firingFrequency',
                value: param5 //ONCE, ONCE_PER_ELEMENT, MANY_PER_ELEMENT
            },
            {
                type: 'template',
                key: 'onScreenRatio',
                value: param6 //Minimum Percent Visible 
            },
            {
                type: 'template',
                key: 'onScreenDuration',
                value: param7
            }
        ]
    };
}
