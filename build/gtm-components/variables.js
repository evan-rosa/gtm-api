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
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertVariable = exports.listVariables = exports.getVariable = exports.deleteVariable = exports.createVariable = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
//Create Variable
//Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference
//export function for creating a variable in GTM
async function createVariable(obj, varName, varType, reqVal, optVal, visSelectType, visPercentage) {
    //Save all gtm variable types as constant variable array objects to be called later
    //1st Party Cookie
    const k = [
        {
            "type": "template",
            "key": "name",
            "value": reqVal //required value
        }
    ];
    //Auto Event Variable
    const aev = [
        {
            "type": "template",
            "key": "varType",
            "value": reqVal //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": optVal //optional value - won't set in GTM. appears to be a bug.
        }
    ];
    //Constant String
    const c = [
        {
            "type": "template",
            "key": "value",
            "value": reqVal //required value
        }
    ];
    //Custom JS Variable
    const jsm = [
        {
            "type": "template",
            "key": "javascript",
            "value": reqVal //required value
        }
    ];
    //Data Layer Variable
    const v = [
        {
            "type": "template",
            "key": "name",
            "value": reqVal //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": optVal //optional value - won't set in GTM. appears to be a bug.
        },
        {
            "type": "integer",
            "key": "dataLayerVersion",
            "value": "2"
        }
    ];
    //DOM Element
    const d = [
        {
            "type": "template",
            "key": "elementId",
            "value": reqVal //required value
        },
        {
            "type": "template",
            "key": "attributeName",
            "value": optVal //optional value
        }
    ];
    //HTTP Referrer
    const f = [
        {
            "type": "template",
            "key": "component",
            "value": reqVal //required value
        }
    ];
    //JS Variable
    const j = [
        {
            "type": "template",
            "key": "name",
            "value": reqVal //required value
        }
    ];
    //GA Setting variable
    const gas = [
        {
            type: 'template',
            key: 'cookieDomain',
            value: 'auto'
        },
        {
            type: 'boolean',
            key: 'doubleClick',
            value: 'false'
        },
        {
            type: 'boolean',
            key: 'setTrackerName',
            value: 'false'
        },
        {
            type: 'boolean',
            key: 'useDebugVersion',
            value: 'false'
        },
        {
            type: 'list',
            key: 'fieldsToSet',
            list: [Array]
        },
        {
            type: 'boolean',
            key: 'useHashAutoLink',
            value: 'false'
        },
        {
            type: 'boolean',
            key: 'decorateFormsAutoLink',
            value: 'false'
        },
        {
            type: 'boolean',
            key: 'enableLinkId',
            value: 'false'
        },
        {
            type: 'list',
            key: 'dimension',
            list: [Array]
        },
        {
            type: 'boolean',
            key: 'enableEcommerce',
            value: 'false'
        },
        {
            type: 'template',
            key: 'trackingId',
            value: '{{UA - Web Properties}}' //Tracking ID
        }
    ];
    //Lookup Table
    //lookup variable
    const smm = [
        {
            "type": "template",
            "key": "input",
            "value": reqVal //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": optVal
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": "MyDefaultValue" // Optional Value
        }
    ];
    //Lookup Regex
    const remm = [
        {
            "type": "template",
            "key": "input",
            "value": reqVal //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": optVal
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": "MyDefaultValue" // Optional Value
        }
    ];
    //URL Variable
    const u = [
        {
            "type": "template",
            "key": "component",
            "value": reqVal //required value
        },
        {
            "type": "template",
            "key": "customUrlSource",
            "value": optVal //optional value
        }
    ];
    const visScreenRatio = optVal === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': visPercentage }
        : null;
    const vis = [
        {
            'type': 'template',
            'key': 'elementId',
            'value': reqVal //Element Selector (#id or .class)
        },
        {
            'type': 'template',
            'key': 'outputMethod',
            'value': optVal // Value = BOOLEAN or PERCENT (If PERCENT then delete last bracket onScreenRatio)
        },
        {
            'type': 'template',
            'key': 'selectorType',
            'value': visSelectType //Selection Method (ID or CSS Selector)
        },
        visScreenRatio
    ];
    //Save the request body params as a const variable - if statement calling the appropriate array object based on the input of the gtm variable type
    const params = varType === 'k' ? k
        : varType === 'aev' ? aev
            : varType === 'c' ? c
                : varType === 'cid' ? null
                    : varType === 'ctv' ? null
                        : varType === 'e' ? null
                            : varType === 'ev' ? null
                                : varType === 'gas' ? gas
                                    : varType === 'jsm' ? jsm
                                        : varType === 'v' ? v
                                            : varType === 'dbg' ? null
                                                : varType === 'd' ? d
                                                    : varType === 'f' ? f
                                                        : varType === 'j' ? j
                                                            : varType === 'remm' ? remm
                                                                : varType === 'smm' ? smm
                                                                    : varType === 'r' ? null
                                                                        : varType === 'u' ? u
                                                                            : varType === 'uv' ? null
                                                                                : varType === 'vis' ? vis
                                                                                    : null;
    // Create variable
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": varType,
            "parameter": params
        }
    });
}
exports.createVariable = createVariable;
//Delete GTM Variable
async function deleteVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.delete({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
}
exports.deleteVariable = deleteVariable;
// Get GTM Variable
async function getVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.get({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
    console.log('***********************************************');
    console.log(res.data);
}
exports.getVariable = getVariable;
//List Variables
async function listVariables(obj) {
    const res = await gtm.accounts.containers.workspaces.variables.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    console.log(res.data.variable);
    return res.data.variable;
}
exports.listVariables = listVariables;
//Revert GTM Variable Changes
async function revertVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.revert({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
}
exports.revertVariable = revertVariable;