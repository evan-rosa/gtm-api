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
exports.getTrigger = exports.listTriggers = exports.clickLinkTrigger = exports.clickAllElementTrigger = exports.windowLoadedTrigger = exports.domReadyTrigger = exports.pageviewTrigger = void 0;
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
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickAllElementTrigger = clickAllElementTrigger;
//Click - Link Click
async function clickLinkTrigger(obj, triggerName, triggerCondition, key, val) {
    const reqBodyAll = {
        "name": triggerName,
        "type": 'linkClick',
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
            value: 'true' //string of true or false
        },
        waitForTagsTimeout: {
            type: 'template',
            value: '2000' //string number in milliseconds
        },
        checkValidation: {
            type: 'boolean',
            value: 'true' //string of true or false
        },
        autoEventFilter: [
            {
                type: 'contains',
                parameter: [
                    {
                        type: 'template',
                        key: 'arg0',
                        value: '{{AEV - Element URL Hostname}}'
                    },
                    {
                        type: 'template',
                        key: 'arg1',
                        value: 'wefss'
                    }
                ]
            }
        ],
    };
    const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll;
    // Create trigger
    const res = await gtm.accounts.containers.workspaces.triggers.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: requestBody
    });
}
exports.clickLinkTrigger = clickLinkTrigger;
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
    //console.log(res.data.parameter.find((id: any) => id.list));
}
exports.getTrigger = getTrigger;
