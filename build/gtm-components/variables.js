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
exports.updateVariable = exports.revertVariable = exports.listVariables = exports.getVariable = exports.deleteVariable = exports.createVisibilityVariable = exports.createUrlVariable = exports.createRegexTableVariable = exports.createLookupTableVariable = exports.createSettingVariable = exports.createJsVariable = exports.createHttpVariable = exports.createDomElementVariable = exports.createDataLayerVariable = exports.createCustomJSVariable = exports.createConstantVariable = exports.createAutoEventVariable = exports.createFirstPartyCookie = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/***************************************************************Create Variable***************************************************************/
//Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference
//First Party Cookie
async function createFirstPartyCookie(obj, varName, cookieName, decodeCookie, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const reqBody = firstPartyCookie(varName, cookieName, decodeCookie, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
}
exports.createFirstPartyCookie = createFirstPartyCookie;
function firstPartyCookie(varName, cookieName, decodeCookie, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "name": varName,
        "type": 'k',
        "parameter": [
            {
                "type": "template",
                "key": "name",
                "value": cookieName //cookieName
            },
            {
                type: 'boolean',
                key: 'decodeCookie',
                value: decodeCookie //optional value - string true/false (If enabled, the cookie value will be URI-decoded, e.g., the cookie 'xxx%3Dyyy' would become 'xxx=yyy'.)
            }
        ],
        "formatValue": {
            "caseConversionType": 'lowercase',
            "convertNullToValue": {
                type: 'template',
                value: convertNullToValue
            },
            "convertUndefinedToValue": {
                type: 'template',
                value: convertUndefinedToValue
            },
            "convertTrueToValue": {
                type: 'template',
                value: convertTrueToValue
            },
            "convertFalseToValue": {
                type: 'template',
                value: convertFalseToValue
            }
        }
    };
}
//End First Party Cookie
//Auto Event Variable
async function createAutoEventVariable(obj, varName, varType, urlComponentType, extraParam, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    let arr = elementUrl(urlComponentType);
    let hostStripWWW = aevHost(extraParam);
    //The last non-directory segment in the path will be stripped if it matches any of the default pages. For instance, if a default page is 'index.html' and the URL is 'http://a.com/x/index.html', the variable's value will be '/x/'.
    let elementAttrName = aevAttrName(urlComponentType);
    let defaultPage = aevPath(extraParam);
    let queryKey = aevQuery(extraParam);
    let affiliatedDomains = aevIsOutbound(extraParam);
    const varTypeVal = varType === 'element' ? 'ELEMENT'
        : varType === 'element type' ? 'TAG_NAME'
            : varType === 'element attr' ? 'ATTRIBUTE'
                : varType === 'element classes' ? 'CLASSES'
                    : varType === 'element target' ? 'TARGET'
                        : varType === 'element text' ? 'TEXT'
                            : varType === 'element url' ? 'URL'
                                : varType === 'element id' ? 'ID'
                                    : varType === 'history new url fragment' ? 'HISTORY_NEW_URL_FRAGMENT'
                                        : varType === 'history old url fragment' ? 'HISTORY_OLD_URL_FRAGMENT'
                                            : varType === 'history new state' ? 'HISTORY_NEW_STATE'
                                                : varType === 'history old state' ? 'HISTORY_OLD_STATE'
                                                    : varType === 'history change source' ? 'HISTORY_CHANGE_SOURCE'
                                                        : null;
    const param = varType === 'element url' ? arr
        : null;
    const addParam = urlComponentType === 'HOST' ? hostStripWWW
        : urlComponentType === 'PATH' ? defaultPage
            : urlComponentType === 'QUERY' ? queryKey
                : urlComponentType === 'IS_OUTBOUND' ? affiliatedDomains
                    : varType === 'element attr' ? elementAttrName
                        : null;
    const element = paramVal(varTypeVal, param, addParam);
    const reqBody = requestBody(varName, element, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
}
exports.createAutoEventVariable = createAutoEventVariable;
function requestBody(varName, element, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "name": varName,
        "type": 'aev',
        "parameter": element,
        "formatValue": {
            "caseConversionType": 'lowercase',
            "convertNullToValue": {
                type: 'template',
                value: convertNullToValue
            },
            "convertUndefinedToValue": {
                type: 'template',
                value: convertUndefinedToValue
            },
            "convertTrueToValue": {
                type: 'template',
                value: convertTrueToValue
            },
            "convertFalseToValue": {
                type: 'template',
                value: convertFalseToValue
            }
        }
    };
}
function paramVal(varTypeVal, param, addParam) {
    return [
        {
            type: 'boolean',
            key: 'setDefaultValue',
            value: 'true'
        },
        {
            type: 'template',
            key: 'varType',
            value: varTypeVal
        },
        {
            type: 'template',
            key: 'defaultValue',
            value: '(AEV Not Set)'
        },
        param,
        addParam
    ];
}
function aevIsOutbound(extraParam) {
    return {
        type: 'template',
        key: 'affiliatedDomains',
        value: extraParam
    };
}
function aevQuery(extraParam) {
    return {
        type: 'template',
        key: 'queryKey',
        value: extraParam
    };
}
function aevPath(extraParam) {
    return {
        type: 'list',
        key: 'defaultPages',
        list: [
            {
                type: 'template',
                value: extraParam
            }
        ]
    };
}
function aevAttrName(urlComponentType) {
    return {
        type: 'template',
        key: 'attribute',
        value: urlComponentType
    };
}
function aevHost(extraParam) {
    return {
        type: 'boolean',
        key: 'stripWww',
        value: extraParam
    };
}
function elementUrl(urlComponentType) {
    return {
        type: 'template',
        key: 'component',
        value: urlComponentType
    };
}
//End Auto Event Variable
//Constant String
async function createConstantVariable(obj, varName, constantValue, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = constantParam(constantValue);
    const formatVal = constantFormalVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const reqBody = {
        "name": varName,
        "type": 'c',
        "parameter": param,
        "formatValue": formatVal
    };
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
}
exports.createConstantVariable = createConstantVariable;
function constantFormalVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function constantParam(constantValue) {
    return [
        {
            "type": "template",
            "key": "value",
            "value": constantValue
        }
    ];
}
//End Constant String
//Custom JS Variable
async function createCustomJSVariable(obj, varName, functionValue, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = customJsParam(functionValue);
    const formatVal = customJsFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'jsm',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createCustomJSVariable = createCustomJSVariable;
function customJsFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function customJsParam(functionValue) {
    return [
        {
            "type": "template",
            "key": "javascript",
            "value": functionValue
        }
    ];
}
//End Custom JS Variable
//Data Layer Variable
async function createDataLayerVariable(obj, varName, dataLayerValue, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = dlvParam(dataLayerValue);
    const formatVal = dlvFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'v',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createDataLayerVariable = createDataLayerVariable;
function dlvFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function dlvParam(dataLayerValue) {
    return [
        {
            "type": "template",
            "key": "name",
            "value": dataLayerValue //required value
        },
        {
            type: 'boolean',
            key: 'setDefaultValue',
            value: 'true'
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": '(DLV - Not Set)' //optional value - won't set in GTM. appears to be a bug.
        },
        {
            "type": "integer",
            "key": "dataLayerVersion",
            "value": "2"
        }
    ];
}
//End Data Layer Variable
//DOM Element
async function createDomElementVariable(obj, varName, elementIdVal, attributeNameVal, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = domParam(elementIdVal, attributeNameVal);
    const formatVal = domFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'd',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createDomElementVariable = createDomElementVariable;
function domFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function domParam(elementIdVal, attributeNameVal) {
    return [
        {
            "type": "template",
            "key": "elementId",
            "value": elementIdVal //required value
        },
        {
            "type": "template",
            "key": "attributeName",
            "value": attributeNameVal
        }
    ];
}
//End DOM Element
//HTTP Referrer
async function createHttpVariable(obj, varName, urlComponentType, extraParam, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    let hostStripWWW = httpHost(extraParam);
    let defaultPage = httpPath(extraParam);
    let queryKey = httpQuery(extraParam);
    const addParam = urlComponentType === 'HOST' ? hostStripWWW
        : urlComponentType === 'PATH' ? defaultPage
            : urlComponentType === 'QUERY' ? queryKey
                : null;
    const param = [
        {
            "type": "template",
            "key": "component",
            "value": urlComponentType //required value
        },
        addParam
    ];
    const formatVal = {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'f',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createHttpVariable = createHttpVariable;
function httpQuery(extraParam) {
    return {
        type: 'template',
        key: 'queryKey',
        value: extraParam
    };
}
function httpPath(extraParam) {
    return {
        type: 'list',
        key: 'defaultPages',
        list: [
            {
                type: 'template',
                value: extraParam
            }
        ]
    };
}
function httpHost(extraParam) {
    return {
        type: 'boolean',
        key: 'stripWww',
        value: extraParam
    };
}
//End HTTP Referrer
//JS Variable
async function createJsVariable(obj, varName, varValue, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = jsVarParam(varValue);
    const formatVal = jsVarFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'j',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createJsVariable = createJsVariable;
function jsVarFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function jsVarParam(varValue) {
    return [
        {
            "type": "template",
            "key": "name",
            "value": varValue
        }
    ];
}
//End JS Variable
//Google Analytics Setting Variable
async function createSettingVariable(obj, varName, trackingId, cookieDomain, fieldsToSet, dimension, metric, contentGroup, displayAdFeatures, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, functionName, transportUrl, useDebugVersion, enableLinkId) {
    const param = gasParam(trackingId, cookieDomain, fieldsToSet, dimension, metric, contentGroup, displayAdFeatures, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, functionName, transportUrl, useDebugVersion, enableLinkId);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'gas',
            "parameter": param
        }
    });
}
exports.createSettingVariable = createSettingVariable;
function gasParam(trackingId, cookieDomain, fieldsToSet, dimension, metric, contentGroup, displayAdFeatures, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, functionName, transportUrl, useDebugVersion, enableLinkId) {
    return [
        {
            type: 'template',
            key: 'trackingId',
            value: trackingId // Tracking ID
        },
        //Cookie Domain
        {
            type: 'template',
            key: 'cookieDomain',
            value: cookieDomain
        },
        //fields to set
        {
            type: 'list',
            key: 'fieldsToSet',
            list: fieldsToSet //const var in api-gtm file
        },
        //custom dimensions
        {
            type: 'list',
            key: 'dimension',
            list: dimension //const var in api-gtm file
        },
        //custom metrics
        {
            type: 'list',
            key: 'metric',
            list: metric //const var in api-gtm file
        },
        //Content Group
        {
            type: 'list',
            key: 'contentGroup',
            list: contentGroup // create on api-gtm.ts file
        },
        // Enable Display Advertising Features 
        {
            type: 'boolean',
            key: 'doubleClick',
            value: displayAdFeatures
        },
        //Cross Domain Tracking
        {
            type: 'template',
            key: 'autoLinkDomains',
            value: autoLinkDomains //comma separated domains. Example, to track inbox.example.com and send.example.com enter example.com. If you want to track a specific subdomain include the subdomain
        },
        {
            type: 'boolean',
            key: 'useHashAutoLink',
            value: useHashAutoLink // change value
        },
        {
            type: 'boolean',
            key: 'decorateFormsAutoLink',
            value: decorateFormsAutoLink //false
        },
        //Global function name for GTM. Renames the global function used by the Universal Analytics Tag
        {
            type: 'template',
            key: 'functionName',
            value: functionName
        },
        //The transport URL is the base URL where analytics requests will be sent.
        {
            type: 'template',
            key: 'transportUrl',
            value: transportUrl
        },
        //Debug Version
        {
            type: 'boolean',
            key: 'useDebugVersion',
            value: useDebugVersion // Change Value
        },
        //Enable Enhanced Link Attribution
        {
            type: 'boolean',
            key: 'enableLinkId',
            value: enableLinkId
        }
    ];
}
//End Google Analytics Setting Variable
//Lookup Table
async function createLookupTableVariable(obj, varName, inputValue, keyValuePair, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = lookupParam(inputValue, keyValuePair);
    const formatVal = lookupFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'smm',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createLookupTableVariable = createLookupTableVariable;
function lookupFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function lookupParam(inputValue, keyValuePair) {
    return [
        {
            "type": "template",
            "key": "input",
            "value": inputValue //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": keyValuePair // key value pairs
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": "MyDefaultValue"
        }
    ];
}
//End Lookup Table
//Regex Lookup Table
async function createRegexTableVariable(obj, varName, inputValue, keyValuePair, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const param = regexLookupParam(inputValue, keyValuePair);
    const formatVal = regexLookupFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'remm',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createRegexTableVariable = createRegexTableVariable;
function regexLookupFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function regexLookupParam(inputValue, keyValuePair) {
    return [
        {
            "type": "template",
            "key": "input",
            "value": inputValue //value used for lookup
        },
        {
            "type": "list",
            "key": "map",
            "list": keyValuePair // key value pairs
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": "MyDefaultValue"
        }
    ];
}
//End Regex Lookup Table
//URL Variable
async function createUrlVariable(obj, varName, componentType, extraParam, customUrlSource, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    let hostStripWWW = urlVarHost(extraParam);
    let defaultPage = urlVarPath(extraParam);
    let queryKey = urlVarQuery(extraParam);
    const addParam = componentType === 'HOST' ? hostStripWWW
        : componentType === 'PATH' ? defaultPage
            : componentType === 'QUERY' ? queryKey
                : null;
    const param = urlVarParam(componentType, customUrlSource, addParam);
    const formatVal = urlVarFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'u',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createUrlVariable = createUrlVariable;
function urlVarFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function urlVarParam(componentType, customUrlSource, addParam) {
    return [
        {
            "type": "template",
            "key": "component",
            "value": componentType //required value
        },
        {
            "type": "template",
            "key": "customUrlSource",
            "value": customUrlSource //optional value - pick from list or variables
        },
        addParam
    ];
}
function urlVarQuery(extraParam) {
    return {
        type: 'template',
        key: 'queryKey',
        value: extraParam
    };
}
function urlVarPath(extraParam) {
    return {
        type: 'list',
        key: 'defaultPages',
        list: [
            {
                type: 'template',
                value: extraParam
            }
        ]
    };
}
function urlVarHost(extraParam) {
    return {
        type: 'boolean',
        key: 'stripWww',
        value: extraParam
    };
}
//End URL Variable
//Element Visibility Variable
async function createVisibilityVariable(obj, varName, selectorType, elementId, outputMethod, onScreenRatio, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    const visScreenRatio = outputMethod === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': onScreenRatio }
        : null;
    const param = visParam(elementId, outputMethod, selectorType, visScreenRatio);
    const formatVal = visFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue);
    const res = await gtm.accounts.containers.workspaces.variables.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: {
            "name": varName,
            "type": 'vis',
            "parameter": param,
            "formatValue": formatVal
        }
    });
}
exports.createVisibilityVariable = createVisibilityVariable;
function visFormatVal(convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue) {
    return {
        "caseConversionType": 'lowercase',
        "convertNullToValue": {
            type: 'template',
            value: convertNullToValue
        },
        "convertUndefinedToValue": {
            type: 'template',
            value: convertUndefinedToValue
        },
        "convertTrueToValue": {
            type: 'template',
            value: convertTrueToValue
        },
        "convertFalseToValue": {
            type: 'template',
            value: convertFalseToValue
        }
    };
}
function visParam(elementId, outputMethod, selectorType, visScreenRatio) {
    return [
        {
            'type': 'template',
            'key': 'elementId',
            'value': elementId //Element Selector (#id or .class)
        },
        {
            'type': 'template',
            'key': 'outputMethod',
            'value': outputMethod // Value = BOOLEAN or PERCENT (If PERCENT then delete last bracket onScreenRatio)
        },
        {
            'type': 'template',
            'key': 'selectorType',
            'value': selectorType //Selection Method (ID or CSS Selector)
        },
        visScreenRatio
    ];
}
//End Element Visibility Variable
/***************************************************************Delete Variable***************************************************************/
async function deleteVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.delete({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
}
exports.deleteVariable = deleteVariable;
/***************************************************************Get Variable***************************************************************/
async function getVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.get({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
    console.log('***********************************************');
    //console.log(res.data);
    console.log('***********************************************');
    //console.log(res.data.parameter.find((id: any) => id.list));
}
exports.getVariable = getVariable;
/***************************************************************List Variable***************************************************************/
async function listVariables(obj) {
    const res = await gtm.accounts.containers.workspaces.variables.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    //console.log(res.data);
    return res.data.variable;
}
exports.listVariables = listVariables;
/***************************************************************Revert Variable***************************************************************/
async function revertVariable(obj, variableId) {
    const res = await gtm.accounts.containers.workspaces.variables.revert({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
    });
}
exports.revertVariable = revertVariable;
/***************************************************************Update Variable***************************************************************/
async function updateVariable(obj, variableId, varName, varType, varParamFormat, varParam1, varParam2, varParam3, varParam4, varParam5, varParam6, varParam7, varParam8, varParam9, varParam10, varParam11, varParam12, varParam13, varParam14) {
    //Save all gtm variable types as constant variable array objects to be called later
    //1st Party Cookie
    const k = updateFirstPartyCookie(varParam1);
    //Auto Event Variable
    const aev = updateAEV(varParam1, varParam2);
    //Constant String
    const c = updateConstant(varParam1);
    //Custom JS Variable
    const jsm = updateCustomJsVar(varParam1);
    //Data Layer Variable
    const v = updateDLV(varParam1, varParam2);
    //DOM Element
    const d = updateDOM(varParam1, varParam2);
    //HTTP Referrer
    const f = updateHTTP(varParam1);
    //JS Variable
    const j = updateJsVar(varParam1);
    //GA Setting variable
    const gas = updateGas(varParam1, varParam2, varParam3, varParam4, varParam5, varParam6, varParam7, varParam8, varParam9, varParam10, varParam11, varParam12, varParam13, varParam14);
    //Lookup Table
    const smm = updateLookup(varParam1, varParam2);
    //Lookup Regex
    const remm = updateRegexLookup(varParam1, varParam2);
    //URL Variable
    const u = updateURL(varParam1, varParam2);
    //Element Visibility 
    const visScreenRatio = varParam2 === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': varParam4 }
        : null;
    const vis = updateVis(varParam1, varParam2, varParam3, visScreenRatio);
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
    //console.log(res.data);
}
exports.updateVariable = updateVariable;
function updateVis(varParam1, varParam2, varParam3, visScreenRatio) {
    return [
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
}
function updateURL(varParam1, varParam2) {
    return [
        {
            "type": "template",
            "key": "component",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "customUrlSource",
            "value": varParam2
        }
    ];
}
function updateRegexLookup(varParam1, varParam2) {
    return [
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
            "value": "MyDefaultValue"
        }
    ];
}
function updateLookup(varParam1, varParam2) {
    return [
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
            "value": "MyDefaultValue"
        }
    ];
}
function updateGas(varParam1, varParam2, varParam3, varParam4, varParam5, varParam6, varParam7, varParam8, varParam9, varParam10, varParam11, varParam12, varParam13, varParam14) {
    return [
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
        {
            type: 'boolean',
            key: 'enableLinkId',
            value: varParam14
        }
    ];
}
function updateJsVar(varParam1) {
    return [
        {
            "type": "template",
            "key": "name",
            "value": varParam1
        }
    ];
}
function updateHTTP(varParam1) {
    return [
        {
            "type": "template",
            "key": "component",
            "value": varParam1
        }
    ];
}
function updateDOM(varParam1, varParam2) {
    return [
        {
            "type": "template",
            "key": "elementId",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "attributeName",
            "value": varParam2
        }
    ];
}
function updateDLV(varParam1, varParam2) {
    return [
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
}
function updateCustomJsVar(varParam1) {
    return [
        {
            "type": "template",
            "key": "javascript",
            "value": varParam1
        }
    ];
}
function updateConstant(varParam1) {
    return [
        {
            "type": "template",
            "key": "value",
            "value": varParam1
        }
    ];
}
function updateAEV(varParam1, varParam2) {
    return [
        {
            "type": "template",
            "key": "varType",
            "value": varParam1 //required value
        },
        {
            "type": "template",
            "key": "defaultValue",
            "value": varParam2
        }
    ];
}
function updateFirstPartyCookie(varParam1) {
    return [
        {
            "type": "template",
            "key": "name",
            "value": varParam1
        }
    ];
}
