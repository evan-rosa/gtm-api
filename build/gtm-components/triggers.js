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
exports.getTrigger = exports.listTriggers = exports.youTubeTrigger = exports.scrollDepthTrigger = exports.formSubmitTrigger = exports.elementVisTrigger = exports.clickLinkTrigger = exports.clickAllElementTrigger = exports.windowLoadedTrigger = exports.domReadyTrigger = exports.pageviewTrigger = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create Triggers**************************************/
//Pageview
async function pageviewTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = {
        "name": triggerName,
        "type": 'pageview',
    };
    const reqBodyCondition = {
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
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.pageviewTrigger = pageviewTrigger;
//DOM Ready
async function domReadyTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = {
        "name": triggerName,
        "type": 'domReady',
    };
    const reqBodyCondition = {
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
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.domReadyTrigger = domReadyTrigger;
//Window Loaded
async function windowLoadedTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = {
        "name": triggerName,
        "type": 'windowLoaded',
    };
    const reqBodyCondition = {
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
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.windowLoadedTrigger = windowLoadedTrigger;
//Click - All Elements
async function clickAllElementTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = {
        "name": triggerName,
        "type": 'click',
    };
    const reqBodyCondition = {
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
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickAllElementTrigger = clickAllElementTrigger;
//Click - Link Click
async function clickLinkTrigger(obj, triggerName, triggerCondition, key, val, waitForTagsBool, waitForTagsTimeout, checkValidationBool, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal) {
    const reqBodyAll = {
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
        }
    };
    const reqBodySome = {
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
    const reqBodyCondition = {
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
    const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySome
        : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickLinkTrigger = clickLinkTrigger;
//Element Visibility
async function elementVisTrigger(obj, triggerName, triggerCondition, key, val, selectionMethod, elementVal, useOnScreenDuration, domChangeListener, firingFrequency, onScreenRatio, onScreenDuration) {
    const selectorType = selectionMethod === 'elementId' ? 'ID' : 'CSS';
    const requestBody = {
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
                value: onScreenDuration // Set minimum on-screen duration - String Bool
            }
        ]
    };
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.elementVisTrigger = elementVisTrigger;
//Form Submission
async function formSubmitTrigger(obj, triggerName, triggerCondition, key, val, waitForTagsBool, checkValidationBool, waitForTagsTimeout, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal) {
    const reqBodyAll = {
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
        }
    };
    const reqBodySomeForms = {
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
    const reqBodyCondition = {
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
    const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySomeForms
        : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.formSubmitTrigger = formSubmitTrigger;
//Scroll Depth
async function scrollDepthTrigger(obj, triggerName, triggerFire, horizontalOn, vertOn, units, measurementValues, triggerCondition, key, val) {
    const vertUnitsMeasure = units === 'PERCENT' ? 'verticalThresholdsPercent' : 'verticalThresholdsPixels';
    const horizontalUnitsMeasure = units === 'PERCENT' ? 'horizontalThresholdsPercent' : 'horizontalThresholdsPixels';
    const reqBodyCondition = {
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
                value: triggerFire //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
            }
        ]
    };
    const reqBodyAll = {
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
                value: triggerFire //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
            }
        ]
    };
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.scrollDepthTrigger = scrollDepthTrigger;
//YouTube Trigger
async function youTubeTrigger(obj, triggerName, captureStart, captureComplete, capturePause, captureProgress, progressTimeOrPercent, progressVal, fixMissingApi, triggerStartOption, triggerCondition, key, val) {
    const progressThreshold = progressTimeOrPercent === 'PERCENTAGE' ? 'progressThresholdsPercent' : 'progressThresholdsTimeInSeconds';
    const reqBodyAll = {
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
                value: triggerStartOption //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
            },
        ]
    };
    const reqBodyCondition = {
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
                value: triggerStartOption //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
            },
        ]
    };
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.youTubeTrigger = youTubeTrigger;
/*********************************List Triggers**************************************/
async function listTriggers(obj) {
    const res = await gtm.accounts.containers.workspaces.triggers.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    //console.log('******************************************************************');
    //console.log(res.data);
    return res.data.trigger;
}
exports.listTriggers = listTriggers;
/*********************************Get Trigger**************************************/
async function getTrigger(obj, triggerId) {
    const res = await gtm.accounts.containers.workspaces.triggers.get({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
    });
    /** */
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
    console.log(res.data.filter.find((id) => id.parameter));
    console.log('***********************************************');
    //console.log(res.data.autoEventFilter.find((id: any) => id.parameter));
}
exports.getTrigger = getTrigger;
