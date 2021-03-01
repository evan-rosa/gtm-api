import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;
interface varAuthDetails {
  workspaceNumber: number,
  containerId: number
}


/***************************************************************Create Variable***************************************************************/
//Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference

//First Party Cookie
export async function createFirstPartyCookie(obj:varAuthDetails, varName: string, cookieName: string, decodeCookie?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

  const reqBody = firstPartyCookie(varName, cookieName, decodeCookie, convertNullToValue, convertUndefinedToValue, convertTrueToValue, convertFalseToValue)  

  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: reqBody
      });
}

function firstPartyCookie(varName: string, cookieName: string, decodeCookie: string | undefined, convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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
export async function createAutoEventVariable(obj:varAuthDetails, varName: string, varType: string, urlComponentType?: string, extraParam?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

  let arr = elementUrl(urlComponentType);

  let hostStripWWW = aevHost(extraParam);

  //The last non-directory segment in the path will be stripped if it matches any of the default pages. For instance, if a default page is 'index.html' and the URL is 'http://a.com/x/index.html', the variable's value will be '/x/'.

  let elementAttrName = aevAttrName(urlComponentType);
  
  let defaultPage = aevPath(extraParam);

  let queryKey = aevQuery(extraParam);

  let affiliatedDomains = aevIsOutbound(extraParam);


  const varTypeVal = varType === 'element' ? 'ELEMENT'
    : varType ==='element type' ? 'TAG_NAME'
    : varType === 'element attr' ? 'ATTRIBUTE'
    : varType ==='element classes' ? 'CLASSES'
    : varType ==='element target' ? 'TARGET'
    : varType ==='element text' ? 'TEXT'
    : varType ==='element url' ? 'URL'
    : varType ==='element id' ? 'ID'
    : varType ==='history new url fragment' ? 'HISTORY_NEW_URL_FRAGMENT'
    : varType ==='history old url fragment' ? 'HISTORY_OLD_URL_FRAGMENT'
    : varType ==='history new state' ? 'HISTORY_NEW_STATE'
    : varType ==='history old state' ? 'HISTORY_OLD_STATE'
    : varType ==='history change source' ? 'HISTORY_CHANGE_SOURCE'
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


function requestBody(varName: string, element: ({ type: string; key: string; value: string | undefined; } | { type: string; key: string; list: { type: string; value: string | undefined; }[]; } | { type: string; key: string; value: string | null; } | null)[], convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function paramVal(varTypeVal: string | null, param: { type: string; key: string; value: string | undefined; } | null, addParam: { type: string; key: string; value: string | undefined; } | { type: string; key: string; list: { type: string; value: string | undefined; }[]; } | null) {
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

function aevIsOutbound(extraParam: string | undefined) {
  return {
    type: 'template',
    key: 'affiliatedDomains',
    value: extraParam
  };
}

function aevQuery(extraParam: string | undefined) {
  return {
    type: 'template',
    key: 'queryKey',
    value: extraParam
  };
}

function aevPath(extraParam: string | undefined) {
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

function aevAttrName(urlComponentType: string | undefined) {
  return {
    type: 'template',
    key: 'attribute',
    value: urlComponentType
  };
}

function aevHost(extraParam: string | undefined) {
  return {
    type: 'boolean',
    key: 'stripWww',
    value: extraParam
  };
}

function elementUrl(urlComponentType: string | undefined) {
  return {
    type: 'template',
    key: 'component',
    value: urlComponentType
  };
}
//End Auto Event Variable


//Constant String
export async function createConstantVariable(obj:varAuthDetails, varName: string, constantValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function constantFormalVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function constantParam(constantValue: string) {
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
export async function createCustomJSVariable(obj:varAuthDetails, varName: string, functionValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function customJsFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function customJsParam(functionValue: string) {
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
export async function createDataLayerVariable(obj:varAuthDetails, varName: string, dataLayerValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function dlvFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function dlvParam(dataLayerValue: string) {
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
export async function createDomElementVariable(obj:varAuthDetails, varName: string, elementIdVal: string, attributeNameVal?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function domFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function domParam(elementIdVal: string, attributeNameVal: string | undefined) {
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
export async function createHttpVariable(obj:varAuthDetails, varName: string, urlComponentType: string, extraParam?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

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

function httpQuery(extraParam: string | undefined) {
  return {
    type: 'template',
    key: 'queryKey',
    value: extraParam
  };
}

function httpPath(extraParam: string | undefined) {
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

function httpHost(extraParam: string | undefined) {
  return {
    type: 'boolean',
    key: 'stripWww',
    value: extraParam
  };
}
//End HTTP Referrer

//JS Variable
export async function createJsVariable(obj:varAuthDetails, varName: string, varValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function jsVarFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function jsVarParam(varValue: string) {
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
export async function createSettingVariable(obj:varAuthDetails, varName: string, trackingId?: any, cookieDomain?: any, fieldsToSet?: any, dimension?: any, metric?: any, contentGroup?: any, displayAdFeatures?: any, autoLinkDomains?: any, useHashAutoLink?: any, decorateFormsAutoLink?: any, functionName?: any, transportUrl?: any, useDebugVersion?: any, enableLinkId?: any) {
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

function gasParam(trackingId: any, cookieDomain: any, fieldsToSet: any, dimension: any, metric: any, contentGroup: any, displayAdFeatures: any, autoLinkDomains: any, useHashAutoLink: any, decorateFormsAutoLink: any, functionName: any, transportUrl: any, useDebugVersion: any, enableLinkId: any) {
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
export async function createLookupTableVariable(obj:varAuthDetails, varName: string, inputValue: string, keyValuePair: any[], convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function lookupFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function lookupParam(inputValue: string, keyValuePair: any[]) {
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
export async function createRegexTableVariable(obj:varAuthDetails, varName: string, inputValue: string, keyValuePair: any[], convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function regexLookupFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function regexLookupParam(inputValue: string, keyValuePair: any[]) {
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
export async function createUrlVariable(obj:varAuthDetails, varName: string, componentType: string, extraParam?: string,customUrlSource?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

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

function urlVarFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function urlVarParam(componentType: string, customUrlSource: string | undefined, addParam: { type: string; key: string; value: string | undefined; } | { type: string; key: string; list: { type: string; value: string | undefined; }[]; } | null) {
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

function urlVarQuery(extraParam: string | undefined) {
  return {
    type: 'template',
    key: 'queryKey',
    value: extraParam
  };
}

function urlVarPath(extraParam: string | undefined) {
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

function urlVarHost(extraParam: string | undefined) {
  return {
    type: 'boolean',
    key: 'stripWww',
    value: extraParam
  };
}
//End URL Variable

//Element Visibility Variable
export async function createVisibilityVariable(obj:varAuthDetails, varName: string, selectorType: string, elementId: string, outputMethod: string, onScreenRatio?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
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

function visFormatVal(convertNullToValue: string | undefined, convertUndefinedToValue: string | undefined, convertTrueToValue: string | undefined, convertFalseToValue: string | undefined) {
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

function visParam(elementId: string, outputMethod: string, selectorType: string, visScreenRatio: { type: string; key: string; value: string | undefined; } | null) {
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
export async function deleteVariable(obj: varAuthDetails, variableId: number){
  const res = await gtm.accounts.containers.workspaces.variables.delete({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
  });
 }

/***************************************************************Get Variable***************************************************************/
export async function getVariable(obj: varAuthDetails, variableId: number ){
  const res = await gtm.accounts.containers.workspaces.variables.get({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
  });
  console.log('***********************************************');
  //console.log(res.data);
  console.log('***********************************************');
  //console.log(res.data.parameter.find((id: any) => id.list));

  
}

/***************************************************************List Variable***************************************************************/
export async function listVariables(obj:varAuthDetails){
      const res = await gtm.accounts.containers.workspaces.variables.list({
        parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
      });
      //console.log(res.data);
      
      return res.data.variable
}

/***************************************************************Revert Variable***************************************************************/
export async function revertVariable(obj:varAuthDetails, variableId: number){
     const res = await gtm.accounts.containers.workspaces.variables.revert({
      path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
     });
}

/***************************************************************Update Variable***************************************************************/
export async function updateVariable(obj:varAuthDetails, variableId: number,varName: string, varType: string, varParamFormat?: any, varParam1?: any, varParam2?: any, varParam3?: any, varParam4?: any, varParam5?: any, varParam6?: any, varParam7?: any, varParam8?: any, varParam9?: any, varParam10?: any, varParam11?: any, varParam12?: any, varParam13?: any, varParam14?: any){
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
    : varType ==='aev' ? aev
    : varType ==='c' ? c
    : varType ==='cid' ? null
    : varType ==='ctv' ? null
    : varType ==='e' ? null
    : varType ==='ev' ? null
    : varType ==='gas' ? gas
    : varType ==='jsm' ? jsm
    : varType ==='v' ? v
    : varType ==='dbg' ? null
    : varType ==='d' ? d
    : varType ==='f' ? f
    : varType ==='j' ? j
    : varType ==='remm' ? remm
    : varType ==='smm' ? smm
    : varType ==='r' ? null
    : varType ==='u' ? u
    : varType ==='uv' ? null
    : varType ==='vis' ? vis
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


  
function updateVis(varParam1: any, varParam2: any, varParam3: any, visScreenRatio: { type: string; key: string; value: any; } | null) {
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

function updateURL(varParam1: any, varParam2: any) {
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

function updateRegexLookup(varParam1: any, varParam2: any) {
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

function updateLookup(varParam1: any, varParam2: any) {
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

function updateGas(varParam1: any, varParam2: any, varParam3: any, varParam4: any, varParam5: any, varParam6: any, varParam7: any, varParam8: any, varParam9: any, varParam10: any, varParam11: any, varParam12: any, varParam13: any, varParam14: any) {
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

function updateJsVar(varParam1: any) {
  return [
    {
      "type": "template",
      "key": "name",
      "value": varParam1
    }
  ];
}

function updateHTTP(varParam1: any) {
  return [
    {
      "type": "template",
      "key": "component",
      "value": varParam1
    }
  ];
}

function updateDOM(varParam1: any, varParam2: any) {
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

function updateDLV(varParam1: any, varParam2: any) {
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

function updateCustomJsVar(varParam1: any) {
  return [
    {
      "type": "template",
      "key": "javascript",
      "value": varParam1
    }
  ];
}

function updateConstant(varParam1: any) {
  return [
    {
      "type": "template",
      "key": "value",
      "value": varParam1
    }
  ];
}

function updateAEV(varParam1: any, varParam2: any) {
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

function updateFirstPartyCookie(varParam1: any) {
  return [
    {
      "type": "template",
      "key": "name",
      "value": varParam1
    }
  ];
}

