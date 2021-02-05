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
exports.getTrigger = exports.listTriggers = exports.createTrigger = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create Triggers**************************************/
//export function for creating a trigger in GTM
async function createTrigger(obj, triggerName, triggerType, triggerCondition, triggerParam1, triggerParam2, triggerParam3, triggerParam4) {
    const reqBodyPageviewAll = {
        "name": triggerName,
        "type": triggerType,
    };
    const reqBodyPageviewSome = {
        "name": triggerName,
        "type": triggerType,
        filter: [
            {
                type: triggerParam1,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: triggerParam2
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: triggerParam3
                    }
                ]
            }
        ]
    };
    const reqBodyTriggerGroupAll = {
        "name": triggerName,
        "type": 'triggerGroup',
        "parameter": [
            {
                type: 'list',
                key: 'triggerIds',
                list: triggerParam1 //list of triggers
            }
        ]
    };
    const reqBodyTriggerGroupSome = {
        "name": triggerName,
        "type": 'triggerGroup',
        "filter": [
            {
                type: triggerParam1,
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: triggerParam2 // {{event}}
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: triggerParam3 // value
                    }
                ]
            }
        ],
        "parameter": [
            {
                type: 'list',
                key: 'triggerIds',
                list: triggerParam4 //list of triggers
            }
        ]
    };
    const reqBodyScrollAll = {
        "name": triggerName,
        "type": 'scrollDepth',
        "parameter": [
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: 'PIXELS'
            },
            {
                type: 'template',
                key: 'horizontalThresholdsPercent',
                value: '11'
            },
            { type: 'boolean', key: 'verticalThresholdOn', value: 'true' },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: 'WINDOW_LOAD'
            },
            {
                type: 'template',
                key: 'verticalThresholdsPixels',
                value: '1000'
            },
            { type: 'boolean', key: 'horizontalThresholdOn', value: 'true' },
            {
                type: 'template',
                key: 'horizontalThresholdUnits',
                value: 'PERCENT'
            }
        ]
    };
    const reqBodyScrollSome = {
        "name": triggerName,
        "type": 'scrollDepth',
        "parameter": [
            {
                type: 'template',
                key: 'verticalThresholdUnits',
                value: 'PIXELS'
            },
            {
                type: 'template',
                key: 'horizontalThresholdsPercent',
                value: '11'
            },
            { type: 'boolean', key: 'verticalThresholdOn', value: 'true' },
            {
                type: 'template',
                key: 'triggerStartOption',
                value: 'WINDOW_LOAD'
            },
            {
                type: 'template',
                key: 'verticalThresholdsPixels',
                value: '1000'
            },
            { type: 'boolean', key: 'horizontalThresholdOn', value: 'true' },
            {
                type: 'template',
                key: 'horizontalThresholdUnits',
                value: 'PERCENT'
            }
        ],
        "filter": [
            {
                type: 'triggerParam1',
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: 'triggerParam2' // {{event}}
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: 'triggerParam3' // value
                    }
                ]
            }
        ]
    };
    const requestBody = triggerType === 'pageview' && triggerCondition === 'all' ? reqBodyPageviewAll
        : triggerType === 'pageview' && triggerCondition === 'some' ? reqBodyPageviewSome
            : triggerType === 'scroll' && triggerCondition === 'all' ? reqBodyScrollAll
                : triggerType === 'scroll' && triggerCondition === 'some' ? reqBodyScrollSome
                    : triggerType === 'trigger group' && triggerCondition === 'all' ? reqBodyTriggerGroupAll
                        : triggerType === 'trigger group' && triggerCondition === 'some' ? reqBodyTriggerGroupSome
                            /*
                            : triggerCondition === 'pageview equals' ? filterEquals
                            : triggerCondition === 'pageview contains' ? filterContains
                            : triggerCondition === 'pageview starts with' ? filterStartsWith
                            : triggerCondition === 'pageview does not equal' ? filterDoesNotEqual*/
                            : null;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
    // console.log(res.data);
}
exports.createTrigger = createTrigger;
/*********************************List Triggers**************************************/
async function listTriggers(obj) {
    const res = await gtm.accounts.containers.workspaces.triggers.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    console.log('******************************************************************');
    //console.log(res.data);
    return res.data.trigger;
}
exports.listTriggers = listTriggers;
/*********************************Get Trigger**************************************/
async function getTrigger(obj, triggerId) {
    const res = await gtm.accounts.containers.workspaces.triggers.get({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
    });
    /** */
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
    console.log(res.data.filter.find((id) => id.parameter));
    console.log('***********************************************');
    console.log(res.data.parameter.find((id) => id.list));
}
exports.getTrigger = getTrigger;
