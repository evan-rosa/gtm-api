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
exports.updateVariable = exports.revertVariable = exports.listVariables = exports.getVariable = exports.deleteVariable = exports.createVariable = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
//Create Variable
//Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference
//export function for creating a variable in GTM
async function createVariable(obj, varName, varType, varParam1, varParam2, varParam3, varParam4, varParam5, varParam6, varParam7, varParam8, varParam9, varParam10, varParam11, varParam12, varParam13, varParam14) {
    //Save all gtm variable types as constant variable array objects to be called later
    //1st Party Cookie
    const k = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        }
    ];
    //Auto Event Variable
    const aev = [
        {
            "type": "template",
            "key": "varType",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": varParam2 //optional value - won't set in GTM. appears to be a bug.
        }
    ];
    //Constant String
    const c = [
        {
            "type": "template",
            "key": "value",
            "value": varParam1 //required value
        }
    ];
    //Custom JS Variable
    const jsm = [
        {
            "type": "template",
            "key": "javascript",
            "value": varParam1 //required value
        }
    ];
    //Data Layer Variable
    const v = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": varParam2 //optional value - won't set in GTM. appears to be a bug.
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
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "attributeName",
            "value": varParam2 //optional value
        }
    ];
    //HTTP Referrer
    const f = [
        {
            "type": "template",
            "key": "component",
            "value": varParam1 //required value
        }
    ];
    //JS Variable
    const j = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        }
    ];
    //GA Setting variable
    const gas = [
        //tracking id
        {
            type: 'template',
            key: 'trackingId',
            value: varParam1 // Tracking ID
        },
        //Cookie Domain
        {
            type: 'template',
            key: 'cookieDomain',
            value: varParam2
        },
        //fields to set
        {
            type: 'list',
            key: 'fieldsToSet',
            list: varParam3 //const var in api-gtm file
        },
        //custom dimensions
        {
            type: 'list',
            key: 'dimension',
            list: varParam4 //const var in api-gtm file
        },
        //custom metrics
        {
            type: 'list',
            key: 'metric',
            list: varParam5 //const var in api-gtm file
        },
        //Content Group
        {
            type: 'list',
            key: 'contentGroup',
            list: varParam6 // create on api-gtm.ts file
        },
        // Enable Display Advertising Features 
        {
            type: 'boolean',
            key: 'doubleClick',
            value: varParam7
        },
        //Cross Domain Tracking
        {
            type: 'template',
            key: 'autoLinkDomains',
            value: varParam8 //comma separated domains. Example, to track inbox.example.com and send.example.com enter example.com. If you want to track a specific subdomain include the subdomain
        },
        {
            type: 'boolean',
            key: 'useHashAutoLink',
            value: varParam9 // change value
        },
        {
            type: 'boolean',
            key: 'decorateFormsAutoLink',
            value: varParam10 //false
        },
        //Global function name for GTM. Renames the global function used by the Universal Analytics Tag
        {
            type: 'template',
            key: 'functionName',
            value: varParam11
        },
        //The transport URL is the base URL where analytics requests will be sent.
        {
            type: 'template',
            key: 'transportUrl',
            value: varParam12
        },
        //Debug Version
        {
            type: 'boolean',
            key: 'useDebugVersion',
            value: varParam13 // Change Value
        },
        //Enable Enhanced Link Attribution
        { type: 'boolean',
            key: 'enableLinkId',
            value: varParam14 //Boolean
        }
    ];
    //Lookup Table
    //lookup variable
    const smm = [
        {
            "type": "template",
            "key": "input",
            "value": varParam1 //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": varParam2
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
            "value": varParam1 //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": varParam2
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
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "customUrlSource",
            "value": varParam2 //optional value
        }
    ];
    //Element Visibility 
    const visScreenRatio = varParam2 === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': varParam4 }
        : null;
    const vis = [
        {
            'type': 'template',
            'key': 'elementId',
            'value': varParam1 //Element Selector (#id or .class)
        },
        {
            'type': 'template',
            'key': 'outputMethod',
            'value': varParam2 // Value = BOOLEAN or PERCENT (If PERCENT then delete last bracket onScreenRatio)
        },
        {
            'type': 'template',
            'key': 'selectorType',
            'value': varParam3 //Selection Method (ID or CSS Selector)
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
    /** */
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
    //console.log(res.data.parameter.find((id: any) => id.key === 'convertNullToValue').list);
    //console.log('***********************************************');
    //console.log(res.data.parameter.find((id: any) => id.key === 'convertNullToValue').list.find((id: any) => id.type === 'map').map);
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
async function updateVariable(obj, variableId, varName, varType, varParam1, varParam2, varParam3, varParam4, varParam5, varParam6, varParam7, varParam8, varParam9, varParam10, varParam11, varParam12, varParam13, varParam14, varParamFormat) {
    //Save all gtm variable types as constant variable array objects to be called later
    //1st Party Cookie
    const k = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        }
    ];
    //Auto Event Variable
    const aev = [
        {
            "type": "template",
            "key": "varType",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": varParam2 //optional value - won't set in GTM. appears to be a bug.
        }
    ];
    //Constant String
    const c = [
        {
            "type": "template",
            "key": "value",
            "value": varParam1 //required value
        }
    ];
    //Custom JS Variable
    const jsm = [
        {
            "type": "template",
            "key": "javascript",
            "value": varParam1 //required value
        }
    ];
    //Data Layer Variable
    const v = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": varParam2 //optional value - won't set in GTM. appears to be a bug.
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
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "attributeName",
            "value": varParam2 //optional value
        }
    ];
    //HTTP Referrer
    const f = [
        {
            "type": "template",
            "key": "component",
            "value": varParam1 //required value
        }
    ];
    //JS Variable
    const j = [
        {
            "type": "template",
            "key": "name",
            "value": varParam1 //required value
        }
    ];
    //GA Setting variable
    const gas = [
        //tracking id
        {
            type: 'template',
            key: 'trackingId',
            value: varParam1 // Tracking ID
        },
        //Cookie Domain
        {
            type: 'template',
            key: 'cookieDomain',
            value: varParam2
        },
        //fields to set
        {
            type: 'list',
            key: 'fieldsToSet',
            list: varParam3 //const var in api-gtm file
        },
        //custom dimensions
        {
            type: 'list',
            key: 'dimension',
            list: varParam4 //const var in api-gtm file
        },
        //custom metrics
        {
            type: 'list',
            key: 'metric',
            list: varParam5 //const var in api-gtm file
        },
        //Content Group
        {
            type: 'list',
            key: 'contentGroup',
            list: varParam6 // create on api-gtm.ts file
        },
        // Enable Display Advertising Features 
        {
            type: 'boolean',
            key: 'doubleClick',
            value: varParam7
        },
        //Cross Domain Tracking
        {
            type: 'template',
            key: 'autoLinkDomains',
            value: varParam8 //comma separated domains. Example, to track inbox.example.com and send.example.com enter example.com. If you want to track a specific subdomain include the subdomain
        },
        {
            type: 'boolean',
            key: 'useHashAutoLink',
            value: varParam9 // change value
        },
        {
            type: 'boolean',
            key: 'decorateFormsAutoLink',
            value: varParam10 //false
        },
        //Global function name for GTM. Renames the global function used by the Universal Analytics Tag
        {
            type: 'template',
            key: 'functionName',
            value: varParam11
        },
        //The transport URL is the base URL where analytics requests will be sent.
        {
            type: 'template',
            key: 'transportUrl',
            value: varParam12
        },
        //Debug Version
        {
            type: 'boolean',
            key: 'useDebugVersion',
            value: varParam13 // Change Value
        },
        //Enable Enhanced Link Attribution
        { type: 'boolean',
            key: 'enableLinkId',
            value: varParam14 //Boolean
        }
    ];
    //Lookup Table
    //lookup variable
    const smm = [
        {
            "type": "template",
            "key": "input",
            "value": varParam1 //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": varParam2
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
            "value": varParam1 //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": varParam2
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
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "customUrlSource",
            "value": varParam2 //optional value
        }
    ];
    //Element Visibility 
    const visScreenRatio = varParam2 === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': varParam4 }
        : null;
    const vis = [
        {
            'type': 'template',
            'key': 'elementId',
            'value': varParam1 //Element Selector (#id or .class)
        },
        {
            'type': 'template',
            'key': 'outputMethod',
            'value': varParam2 // Value = BOOLEAN or PERCENT (If PERCENT then delete last bracket onScreenRatio)
        },
        {
            'type': 'template',
            'key': 'selectorType',
            'value': varParam3 //Selection Method (ID or CSS Selector)
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
    const res = await gtm.accounts.containers.workspaces.variables.update({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
        requestBody: {
            "name": varName,
            "type": varType,
            "parameter": params,
            "formatValue": varParamFormat
        }
    });
    console.log(res.data);
}
exports.updateVariable = updateVariable;
