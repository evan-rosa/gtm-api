import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;
interface triggerAuthDetails {
  workspaceNumber: number,
  containerId: number
}

/*********************************Create Triggers**************************************/

//Start Pageview
export async function pageviewTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = pageviewAll(triggerName);

  const reqBodyCondition = pageviewSome(triggerName, triggerCondition, key, val);
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function pageviewSome(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

export async function pageviewAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'pageview',
  };
}
//End Pageview


//Start DOM Ready
export async function domReadyTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = domBodyAll(triggerName);

   const reqBodyCondition = domBodyCondition(triggerName, triggerCondition, key, val);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}
function domBodyCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function domBodyAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'domReady',
  };
}
//End DOM Ready


//Window Loaded
export async function windowLoadedTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = windowBodyAll(triggerName);

   const reqBodyCondition = windowBodyCondition(triggerName, triggerCondition, key, val);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function windowBodyCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function windowBodyAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'windowLoaded',
  };
}
//End Window Loaded

//Click - All Elements
export async function clickAllElementTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = clickElementBodyAll(triggerName);

  const reqBodyCondition = clickElementBodyCondition(triggerName, triggerCondition, key, val);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function clickElementBodyCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function clickElementBodyAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'click',
  };
}
//End Click - All Elements


//Click - Link Click
export async function clickLinkTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string, waitForTagsBool?: string, waitForTagsTimeout?: string, checkValidationBool?: string, autoEventFilterCondition?: string, autoEventFilterKey?: string, autoEventFilterVal?: string ) {

  const reqBodyAll = clickLinkBodyAll(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool);

  const reqBodySome = clickLinkBodySome(triggerName, waitForTagsBool, waitForTagsTimeout, checkValidationBool, triggerCondition, key, val);

  const reqBodyCondition = clickLinkBodyCondition(triggerName, triggerCondition, key, val, waitForTagsBool, waitForTagsTimeout, checkValidationBool, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal);

  const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySome
  : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function clickLinkBodyCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined, waitForTagsBool: string | undefined, waitForTagsTimeout: string | undefined, checkValidationBool: string | undefined, autoEventFilterCondition: string | undefined, autoEventFilterKey: string | undefined, autoEventFilterVal: string | undefined) {
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

function clickLinkBodySome(triggerName: string, waitForTagsBool: string | undefined, waitForTagsTimeout: string | undefined, checkValidationBool: string | undefined, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function clickLinkBodyAll(triggerName: string, waitForTagsBool: string | undefined, waitForTagsTimeout: string | undefined, checkValidationBool: string | undefined) {
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
export async function elementVisTrigger(obj:triggerAuthDetails, triggerName: string, selectionMethod?: string, elementVal?: string, useOnScreenDuration?: string, domChangeListener?: string, firingFrequency?: string, onScreenRatio?: string, onScreenDuration?: string, FireOnSomeOrAllEvents?: string,triggerCondition?: string, key?: string, val?: string) {

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

function elementVisReqSome(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined, selectionMethod: string | undefined, elementVal: string | undefined, selectorType: string, useOnScreenDuration: string | undefined, domChangeListener: string | undefined, firingFrequency: string | undefined, onScreenRatio: string | undefined, onScreenDuration: string | undefined) {
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

function elementVisReqAll(triggerName: string, selectionMethod: string | undefined, elementVal: string | undefined, selectorType: string, useOnScreenDuration: string | undefined, domChangeListener: string | undefined, firingFrequency: string | undefined, onScreenRatio: string | undefined, onScreenDuration: string | undefined) {
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
export async function formSubmitTrigger(obj:triggerAuthDetails, triggerName: string, waitForTagsBool?:string, checkValidationBool?: string, waitForTagsTimeout?: string, autoEventFilterCondition?: string, autoEventFilterKey?: string, autoEventFilterVal?: string, triggerCondition?: string, key?: string, val?: string) {

  //All Forms
  const reqBodyAll = formSubmitAll(triggerName);

  // Some Forms 
  const reqBodySomeForms = formSubmitSome(triggerName, triggerCondition, key, val);
  
  //Some Forms with wait for tags or check validation 
  const reqBodyCondition = formSubmitReqCondition(triggerName, triggerCondition, key, val, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, waitForTagsBool, checkValidationBool, waitForTagsTimeout);

  const requestBody = waitForTagsBool && waitForTagsTimeout || checkValidationBool ? reqBodyCondition : triggerCondition ? reqBodySomeForms
  : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function formSubmitReqCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined, autoEventFilterCondition: string | undefined, autoEventFilterKey: string | undefined, autoEventFilterVal: string | undefined, waitForTagsBool: string | undefined, checkValidationBool: string | undefined, waitForTagsTimeout: string | undefined) {
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

function formSubmitSome(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function formSubmitAll(triggerName: string) {
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
export async function scrollDepthTrigger(obj:triggerAuthDetails, triggerName: string, triggerFire: string, horizontalOn: string, vertOn: string, units: string, measurementValues: string, triggerCondition?: string, key?: string, val?: string) {

  const vertUnitsMeasure = units === 'PERCENT' ? 'verticalThresholdsPercent': 'verticalThresholdsPixels';
  
  const horizontalUnitsMeasure = units === 'PERCENT' ? 'horizontalThresholdsPercent' :'horizontalThresholdsPixels';
  
  const reqBodyCondition = scrollDepthCondition(triggerName, triggerCondition, key, val, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire);


  const reqBodyAll = scrollDepthAll(triggerName, vertOn, units, vertUnitsMeasure, measurementValues, horizontalOn, horizontalUnitsMeasure, triggerFire);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


function scrollDepthAll(triggerName: string, vertOn: string, units: string, vertUnitsMeasure: string, measurementValues: string, horizontalOn: string, horizontalUnitsMeasure: string, triggerFire: string) {
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

function scrollDepthCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined, vertOn: string, units: string, vertUnitsMeasure: string, measurementValues: string, horizontalOn: string, horizontalUnitsMeasure: string, triggerFire: string) {
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
export async function youTubeTrigger(obj:triggerAuthDetails, triggerName: string, triggerStartOption: string, fixMissingApi: string, captureStart: string, captureComplete:string, capturePause: string, captureProgress: string, progressTimeOrPercent?: string, progressVal?: any, triggerCondition?: string, key?: string, val?: string) {

  const progressThreshold = progressTimeOrPercent === 'PERCENTAGE' ? 'progressThresholdsPercent' : 'progressThresholdsTimeInSeconds';

  const reqBodyAll = ytAll(triggerName, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption);


   const reqBodyCondition = ytCondition(triggerName, triggerCondition, key, val, captureProgress, progressTimeOrPercent, progressThreshold, progressVal, captureStart, captureComplete, capturePause, fixMissingApi, triggerStartOption);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger

  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


function ytCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined, captureProgress: string, progressTimeOrPercent: string | undefined, progressThreshold: string, progressVal: any, captureStart: string, captureComplete: string, capturePause: string, fixMissingApi: string, triggerStartOption: string) {
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

function ytAll(triggerName: string, captureProgress: string, progressTimeOrPercent: string | undefined, progressThreshold: string, progressVal: any, captureStart: string, captureComplete: string, capturePause: string, fixMissingApi: string, triggerStartOption: string) {
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
export async function customEventTrigger(obj:triggerAuthDetails, triggerName: string, customEvent: string, useRegexMatching: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = customEventAll(triggerName, useRegexMatching, customEvent);

   const reqBodyCondition = customEventCondition(triggerName, useRegexMatching, customEvent, triggerCondition, key, val);
  
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function customEventCondition(triggerName: string, useRegexMatching: string, customEvent: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function customEventAll(triggerName: string, useRegexMatching: string, customEvent: string) {
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
export async function historyChangeTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = historyAll(triggerName);

  const reqBodyCondition = historyCondition(triggerName, triggerCondition, key, val);
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


function historyCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function historyAll(triggerName: string) {
  return {
    name: triggerName,
    type: 'historyChange'
  };
}
//End History Change


//JavaScript Error
export async function jsErrTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = jsErrAll(triggerName);

   const reqBodyCondition = jsErrCondition(triggerName, triggerCondition, key, val);
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
}

function jsErrCondition(triggerName: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function jsErrAll(triggerName: string) {
  return {
    name: triggerName,
    type: 'jsError'
  };
}
//End JavaScript Error

//Timer
export async function timerTrigger(obj:triggerAuthDetails, triggerName: string, eventName: string, interval: string, limit:string, autoEventFilterCondition:string, autoEventFilterKey: string, autoEventFilterVal:string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = timerAll(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal);

   const reqBodyCondition = timerCondition(triggerName, eventName, interval, limit, autoEventFilterCondition, autoEventFilterKey, autoEventFilterVal, triggerCondition, key, val);
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

function timerCondition(triggerName: string, eventName: string, interval: string, limit: string, autoEventFilterCondition: string, autoEventFilterKey: string, autoEventFilterVal: string, triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function timerAll(triggerName: string, eventName: string, interval: string, limit: string, autoEventFilterCondition: string, autoEventFilterKey: string, autoEventFilterVal: string) {
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
export async function triggerGroupTrigger(obj:triggerAuthDetails, triggerName: string, triggerReference: any[], triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = triggerGroupAll(triggerName, triggerReference);

  const reqBodyCondition = triggerGroupCondition(triggerName, triggerReference, triggerCondition, key, val);

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
}

function triggerGroupCondition(triggerName: string, triggerReference: any[], triggerCondition: string | undefined, key: string | undefined, val: string | undefined) {
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

function triggerGroupAll(triggerName: string, triggerReference: any[]) {
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
export async function deleteTrigger(obj: triggerAuthDetails, triggerId: number ){
  const res = await gtm.accounts.containers.workspaces.triggers.delete({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
  });
  /** */
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
}


/*********************************List Triggers**************************************/
export async function listTriggers(obj:triggerAuthDetails) {
     const res = await gtm.accounts.containers.workspaces.triggers.list({
         parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
       });
       console.log('******************************************************************');
       console.log(res.data);
       return res.data.trigger
}

/*********************************Revert Triggers**************************************/
export async function revertTriggers(obj:triggerAuthDetails, triggerId: number){
  const res = await gtm.accounts.containers.workspaces.variables.revert({
   path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
  });
  console.log(res.data);
}

/*********************************Get Trigger**************************************/
export async function getTrigger(obj: triggerAuthDetails, triggerId: number ){
  const res = await gtm.accounts.containers.workspaces.triggers.get({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
  });
  
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
  console.log(res.data.filter.find((id: any) => id.parameter));
  console.log('***********************************************');  
  console.log(res.data.parameter.find((id: any) => id.list));
  console.log('***********************************************');  
   



  //console.log(res.data.autoEventFilter.find((id: any) => id.parameter));
}


/*********************************Update Trigger**************************************/

export async function updateTrigger(obj: triggerAuthDetails, triggerId: number, triggerName: string, triggerType: string, triggerFiresOn: string, triggerCondition?: any, key?: any, val?: any, param1?: string, param2?: string, param3?: string, param4?: string, param5?: string, param6?: string, param7?: string, param8?: string){

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
  const vertUnitsMeasure = param2 === 'PERCENT' ? 'verticalThresholdsPercent': 'verticalThresholdsPixels';
  
  const horizontalUnitsMeasure = param2 === 'PERCENT' ? 'horizontalThresholdsPercent' :'horizontalThresholdsPixels';
  
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
  :null

  const domFrequency = triggerFiresOn === 'all' ? domAll
  : triggerFiresOn === 'some' ? domSome
  :null

  const windowFrequency = triggerFiresOn === 'all' ? windowAll
  : triggerFiresOn === 'some' ? windowSome
  :null

  const elementClickFrequency = triggerFiresOn === 'all' ? elementClickAll
  : triggerFiresOn === 'some' ? elementClickSome
  :null

  const linkClickFrequency = triggerFiresOn === 'all' ? linkClickAll
  : triggerFiresOn === 'some' ? linkClickSome
  :null

  const visibilityFrequency = triggerFiresOn === 'all' ? visAll
  : triggerFiresOn === 'some' ? visSome : null;

  const formFrequency = param4 && param6 || param5 ? formCondition : triggerCondition ? formSome
  : formAll

  const scrollFrequency = triggerCondition ? scrollSome : scrollAll;

  const ytFrequency = triggerCondition ? ytSome : ytAll

  const customEventFrequency = triggerCondition ? customEventSome : customEventAll

  const historyFrequency = triggerCondition ? historySome : historyAll

  const jsFrequency = triggerCondition ? jsSome : jsAll

  const timerFrequency = triggerCondition ? timerSome : timerAll

  const timerGroupFrequency = triggerCondition ? timerGroupSome : timerGroupAll


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

function updateTimeGroupSome(triggerName: string, param1: string | undefined, triggerCondition: any, key: any, val: any) {
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

function updateTimeGroupAll(triggerName: string, param1: string | undefined) {
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

function updateTimerSome(triggerName: string, param1: string | undefined, param2: string | undefined, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, triggerCondition: any, key: any, val: any) {
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

function updateTimerAll(triggerName: string, param1: string | undefined, param2: string | undefined, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined) {
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

function updateJsSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateJsAll(triggerName: string) {
  return {
    name: triggerName,
    type: 'jsError'
  };
}

function updateHistorySome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateHistoryAll(triggerName: string) {
  return {
    name: triggerName,
    type: 'historyChange'
  };
}

function updateCustomEventSome(triggerName: string, param1: string | undefined, param2: string | undefined, triggerCondition: any, key: any, val: any) {
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

function updateCustomEventAll(triggerName: string, param1: string | undefined, param2: string | undefined) {
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

function updateYouTubeSome(triggerName: string, triggerCondition: any, key: any, val: any, param1: string | undefined, param2: string | undefined, progressThreshold: string, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, param7: string | undefined, param8: string | undefined) {
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

function updateYouTubeAll(triggerName: string, param1: string | undefined, param2: string | undefined, progressThreshold: string, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, param7: string | undefined, param8: string | undefined) {
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

function updateScrollAll(triggerName: string, param1: string | undefined, param2: string | undefined, vertUnitsMeasure: string, param3: string | undefined, param4: string | undefined, horizontalUnitsMeasure: string, param5: string | undefined, param6: string | undefined) {
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

function updateScrollSome(triggerName: string, triggerCondition: any, key: any, val: any, param1: string | undefined, param2: string | undefined, vertUnitsMeasure: string, param3: string | undefined, param4: string | undefined, horizontalUnitsMeasure: string, param5: string | undefined, param6: string | undefined) {
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

function updateFormCondition(triggerName: string, triggerCondition: any, key: any, val: any, param1: string | undefined, param2: string | undefined, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined) {
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

function updateFormsSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateFormsAll(triggerName: string) {
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

function updateVisSome(triggerName: string, triggerCondition: any, key: any, val: any, param1: string | undefined, param2: string | undefined, selectorType: string, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, param7: string | undefined) {
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

function updateLinkClickSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateLinkClickAll(triggerName: string) {
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

function updateElementClickSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateElementClickAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'click',
  };
}

function updateWindowSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateWindowAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'windowLoaded',
  };
}

function updateDomSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updateDomAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'domReady',
  };
}

function updatePageviewSome(triggerName: string, triggerCondition: any, key: any, val: any) {
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

function updatePageviewAll(triggerName: string) {
  return {
    "name": triggerName,
    "type": 'pageview',
  };
}

function updateVisAll(triggerName: string, param1: string | undefined, param2: string | undefined, selectorType: string, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, param7: string | undefined) {
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

