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

  const reqBody = {
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
          value: decodeCookie  //optional value - string true/false (If enabled, the cookie value will be URI-decoded, e.g., the cookie 'xxx%3Dyyy' would become 'xxx=yyy'.)
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
  }  
  
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: reqBody
      });
}

//Auto Event Variable
export async function createAutoEventVariable(obj:varAuthDetails, varName: string, varType: string, urlComponentType?: string, extraParam?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

  let arr = { 
    type: 'template', 
    key: 'component', 
    value: urlComponentType 
  };

  let hostStripWWW = { 
    type: 'boolean', 
    key: 'stripWww', 
    value: extraParam 
  };

  //The last non-directory segment in the path will be stripped if it matches any of the default pages. For instance, if a default page is 'index.html' and the URL is 'http://a.com/x/index.html', the variable's value will be '/x/'.

  let elementAttrName = { 
    type: 'template', 
    key: 'attribute', 
    value: urlComponentType
  };
  
  let defaultPage = {
    type: 'list',
    key: 'defaultPages',
    list: [ 
      { 
        type: 'template', 
        value: extraParam 
      } 
    ]
  };

  let queryKey = {
    type: 'template', 
    key: 'queryKey', 
    value: extraParam
  };

  let affiliatedDomains = { 
    type: 'template', 
    key: 'affiliatedDomains', 
    value: extraParam 
  };


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

  const element = [
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


  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'aev',
            "parameter": element,
            "formatValue": {
              "caseConversionType": 'lowercase', //Would we ever have uppercase?????
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
            }   
         });
}


//Constant String
export async function createConstantVariable(obj:varAuthDetails, varName: string, constantValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'c',
            "parameter": [
                {
                  "type": "template",
                  "key": "value",
                  "value": constantValue //required value
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
            }   
         });
}

//Custom JS Variable
export async function createCustomJSVariable(obj:varAuthDetails, varName: string, functionValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'jsm',
            "parameter": [
                {
                  "type": "template",
                  "key": "javascript",
                  "value": functionValue //required value
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
            }   
         });
}


//Data Layer Variable
export async function createDataLayerVariable(obj:varAuthDetails, varName: string, dataLayerValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'v',
            "parameter": [
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
            }   
         });
}

//DOM Element
export async function createDomElementVariable(obj:varAuthDetails, varName: string, elementIdVal: string, attributeNameVal?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'd',
            "parameter": [
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
            }   
         });
}

//HTTP Referrer
export async function createHttpVariable(obj:varAuthDetails, varName: string, urlComponentType: string, extraParam?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {


  let hostStripWWW = { 
    type: 'boolean', 
    key: 'stripWww', 
    value: extraParam 
  };

  let defaultPage = {
    type: 'list',
    key: 'defaultPages',
    list: [ 
      { 
        type: 'template', 
        value: extraParam 
      } 
    ]
  };

  let queryKey = {
    type: 'template', 
    key: 'queryKey', 
    value: extraParam
  };

  const addParam = urlComponentType === 'HOST' ? hostStripWWW
  : urlComponentType === 'PATH' ? defaultPage
  : urlComponentType === 'QUERY' ? queryKey
  : null;


  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'f',
            "parameter": [
                {
                  "type": "template",
                  "key": "component", 
                  "value": urlComponentType //required value
                },
                addParam
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
            }   
         });
}

//JS Variable
export async function createJsVariable(obj:varAuthDetails, varName: string, varValue: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'j',
            "parameter": [
                {
                  "type": "template",
                  "key": "name",
                  "value": varValue //required value
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
            }   
         });
}

//Google Analytics Setting Variable
export async function createSettingVariable(obj:varAuthDetails, varName: string, trackingId?: any, cookieDomain?: any, fieldsToSet?: any, dimension?: any, metric?: any, contentGroup?: any, displayAdFeatures?: any, autoLinkDomains?: any, useHashAutoLink?: any, decorateFormsAutoLink?: any, functionName?: any, transportUrl?: any, useDebugVersion?: any, enableLinkId?: any) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'gas',
            "parameter": [
                  //tracking id
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
                  { type: 'boolean', 
                    key: 'enableLinkId', 
                    value: enableLinkId //Boolean
                  }
              ]
            }   
         });
}

//Lookup Table
export async function createLookupTableVariable(obj:varAuthDetails, varName: string, inputValue: string, keyValuePair: any[], convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'smm',
            "parameter": [
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
                  "value": "MyDefaultValue" // Optional Value
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
            }   
         });
}

//Regex Lookup Table
export async function createRegexTableVariable(obj:varAuthDetails, varName: string, inputValue: string, keyValuePair: any[], convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'remm',
            "parameter": [
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
                  "value": "MyDefaultValue" // Optional Value
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
            }   
         });
}

//URL Variable
export async function createUrlVariable(obj:varAuthDetails, varName: string, componentType: string, extraParam?: string,customUrlSource?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {

  let hostStripWWW = { 
    type: 'boolean', 
    key: 'stripWww', 
    value: extraParam 
  };

  let defaultPage = {
    type: 'list',
    key: 'defaultPages',
    list: [ 
      { 
        type: 'template', 
        value: extraParam 
      } 
    ]
  };

  let queryKey = {
    type: 'template', 
    key: 'queryKey', 
    value: extraParam
  };

  const addParam = componentType === 'HOST' ? hostStripWWW
  : componentType === 'PATH' ? defaultPage
  : componentType === 'QUERY' ? queryKey
  : null;

  
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'u',
            "parameter": [
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
            }   
         });
}

//Element Visibility Variable
export async function createVisibilityVariable(obj:varAuthDetails, varName: string, selectorType: string, elementId: string, outputMethod: string, onScreenRatio?: string, convertNullToValue?: string, convertUndefinedToValue?: string, convertTrueToValue?: string, convertFalseToValue?: string) {
  const visScreenRatio = outputMethod === "BOOLEAN" ? { 'type': 'template', 'key': 'onScreenRatio', 'value': onScreenRatio }
  : null;
  const res = await gtm.accounts.containers.workspaces.variables.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
           requestBody: {
            "name": varName,
            "type": 'vis',
            "parameter": [
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
            }   
         });
}


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
   const vis =[
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


  
