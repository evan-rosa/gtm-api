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


//DOM Ready
export async function domReadyTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

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

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

//Window Loaded
export async function windowLoadedTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

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

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

//Click - All Elements
export async function clickAllElementTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

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

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

//Click - Link Click
export async function clickLinkTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string, waitForTagsBool?: string, waitForTagsTimeout?: string, checkValidationBool?: string, autoEventFilterCondition?: string, autoEventFilterKey?: string, autoEventFilterVal?: string ) {

  const reqBodyAll = {
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
    }
   };

  const reqBodySome = {
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
    filter: [ //This trigger fires on
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
    filter: [ //This trigger fires on
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
        type: autoEventFilterCondition, // trigger condition
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
  : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//Element Visibility
export async function elementVisTrigger(obj:triggerAuthDetails, triggerName: string, selectionMethod?: string, elementVal?: string, useOnScreenDuration?: string, domChangeListener?: string, firingFrequency?: string, onScreenRatio?: string, onScreenDuration?: string, FireOnSomeOrAllEvents?: string,triggerCondition?: string, key?: string, val?: string) {

  const selectorType = selectionMethod === 'elementId' ? 'ID' : 'CSS';

  const requestAll = {
    name: triggerName,
    type: 'elementVisibility',
    parameter: [
      { 
        type: 'template', 
        key: selectionMethod, //elementId or elementSelector
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

  const requestSome = {
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
        key: selectionMethod, //elementId or elementSelector
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

  const requestBody = FireOnSomeOrAllEvents === 'all' ? requestAll
  : FireOnSomeOrAllEvents === 'some' ? requestSome : null;


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

//Form Submission
export async function formSubmitTrigger(obj:triggerAuthDetails, triggerName: string, waitForTagsBool?:string, checkValidationBool?: string, waitForTagsTimeout?: string, autoEventFilterCondition?: string, autoEventFilterKey?: string, autoEventFilterVal?: string, triggerCondition?: string, key?: string, val?: string) {

  //All Forms
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

  // Some Forms 
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
  
  //Some Forms with wait for tags or check validation 
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
  : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//Scroll Depth
export async function scrollDepthTrigger(obj:triggerAuthDetails, triggerName: string, triggerFire: string, horizontalOn: string, vertOn: string, units: string, measurementValues: string, triggerCondition?: string, key?: string, val?: string) {

  const vertUnitsMeasure = units === 'PERCENT' ? 'verticalThresholdsPercent': 'verticalThresholdsPixels';
  
  const horizontalUnitsMeasure = units === 'PERCENT' ? 'horizontalThresholdsPercent' :'horizontalThresholdsPixels';
  
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

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll

  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//YouTube Trigger
export async function youTubeTrigger(obj:triggerAuthDetails, triggerName: string, triggerStartOption: string, fixMissingApi: string, captureStart: string, captureComplete:string, capturePause: string, captureProgress: string, progressTimeOrPercent?: string, progressVal?: any, triggerCondition?: string, key?: string, val?: string) {

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
        value: progressTimeOrPercent //TIME or PERCENTAGE
      }, 
      {
        type: 'template',
        key: progressThreshold, //progressThresholdsTimeInSeconds
        value: progressVal // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
      },
      { 
        type: 'boolean', 
        key: 'captureStart', //Capture when video has started
        value: captureStart //String Bool
      },
      { 
        type: 'boolean', 
        key: 'captureComplete', //Capture when video is finished
        value: captureComplete //String Bool
      },
      { 
        type: 'boolean', 
        key: 'capturePause', //Capture video pause, seeking, and buffering
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
        key: progressThreshold, //progressThresholdsTimeInSeconds
        value: progressVal // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
      },
      { 
        type: 'boolean', 
        key: 'captureStart', //Capture when video has started
        value: captureStart //String Bool
      },
      { 
        type: 'boolean', 
        key: 'captureComplete', //Capture when video is finished
        value: captureComplete //String Bool
      },
      { 
        type: 'boolean', 
        key: 'capturePause', //Capture video pause, seeking, and buffering
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

  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger

  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}



//Custom Event
export async function customEventTrigger(obj:triggerAuthDetails, triggerName: string, customEvent: string, useRegexMatching: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = {
    name: triggerName,
    type: 'customEvent',
    customEventFilter: [ 
      {
      type: useRegexMatching, //matchRegex or equals
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

   const reqBodyCondition = {
    name: triggerName,
    type: 'customEvent',
    customEventFilter: [ 
      {
      type: useRegexMatching, //matchRegex or equals
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
  
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}




//History Change
export async function historyChangeTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = {
    name: triggerName,
    type: 'historyChange'
   };

   const reqBodyCondition = {
    name: triggerName,
    type: 'historyChange',
    filter: [ {
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
    } ],
  };
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//JavaScript Error
export async function jsErrTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = {
    name: triggerName,
    type: 'jsError'
   };

   const reqBodyCondition = {
    name: triggerName,
    type: 'jsError',
    filter: [ {
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
    } ],
  };
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
}

//Timer
export async function timerTrigger(obj:triggerAuthDetails, triggerName: string, eventName: string, interval: string, limit:string, autoEventFilterCondition:string, autoEventFilterKey: string, autoEventFilterVal:string, triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = {
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

   const reqBodyCondition = {
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
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//Trigger Group
export async function triggerGroupTrigger(obj:triggerAuthDetails, triggerName: string, triggerReference: any[], triggerCondition?: string, key?: string, val?: string ) {

  const reqBodyAll = {
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

   const reqBodyCondition = {
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
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
}


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
  const pageviewAll = {
    "name": triggerName,
    "type": 'pageview',
   };

  const pageviewSome = {
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
   }

   //DOM Ready
   const domAll = {
    "name": triggerName,
    "type": 'domReady',
   };

   const domSome = {
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

   //Window Loaded
   const windowAll = {
    "name": triggerName,
    "type": 'windowLoaded',
   };

   const windowSome = {
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

   //Element Clicks
   const elementClickAll = {
    "name": triggerName,
    "type": 'click',
   };

   const elementClickSome = {
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

   //Link Click
   const linkClickAll = {
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

  const linkClickSome = {
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
    filter: [ //This trigger fires on
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

   //Element Vis
   const selectorType = param1 === 'elementId' ? 'ID' : 'CSS';

  const visAll = newFunction(triggerName, param1, param2, selectorType, param3, param4, param5, param6, param7);

  const visSome = {
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
        key: param1, //elementId or elementSelector
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
        value: param7 // Set minimum on-screen duration - String Bool
      }
    ]
  };

  //Forms
   //All Forms
   const formAll = {
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

  // Some Forms 
  const formSome = {
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
  
  //Some Forms with wait for tags or check validation 
  const formCondition = {
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

  //Scroll
  const vertUnitsMeasure = param2 === 'PERCENT' ? 'verticalThresholdsPercent': 'verticalThresholdsPixels';
  
  const horizontalUnitsMeasure = param2 === 'PERCENT' ? 'horizontalThresholdsPercent' :'horizontalThresholdsPixels';
  
  const scrollSome = {
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
        value: param6 //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
      }
    ]
  };


  const scrollAll = {
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
        value: param6 //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
      }
    ]
  };


  /////YouTube
  const progressThreshold = param2 === 'PERCENTAGE' ? 'progressThresholdsPercent' : 'progressThresholdsTimeInSeconds';

  const ytAll = {
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
        key: progressThreshold, //progressThresholdsTimeInSeconds
        value: param3 // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
      },
      { 
        type: 'boolean', 
        key: 'captureStart', //Capture when video has started
        value: param4 //String Bool
      },
      { 
        type: 'boolean', 
        key: 'captureComplete', //Capture when video is finished
        value: param5 //String Bool
      },
      { 
        type: 'boolean', 
        key: 'capturePause', //Capture video pause, seeking, and buffering
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
        value: param8 //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
      },
    ]
  };


   const ytSome = {
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
        key: progressThreshold, //progressThresholdsTimeInSeconds
        value: param3 // Percentages (10,25,50,75,90) and Time Thresholds in seconds (10, 15, 60)
      },
      { 
        type: 'boolean', 
        key: 'captureStart', //Capture when video has started
        value: param4 //String Bool
      },
      { 
        type: 'boolean', 
        key: 'captureComplete', //Capture when video is finished
        value: param5 //String Bool
      },
      { 
        type: 'boolean', 
        key: 'capturePause', //Capture video pause, seeking, and buffering
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
        value: param8 //Enable this trigger on WINDOW_LOAD, DOM_READY, or CONTAINER_LOAD
      },
    ]
  };

  //Custom Event
  const customEventAll = {
    name: triggerName,
    type: 'customEvent',
    customEventFilter: [ 
      {
      type: param1, //matchRegex or equals
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

   const customEventSome = {
    name: triggerName,
    type: 'customEvent',
    customEventFilter: [ 
      {
      type: param1, //matchRegex or equals
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
  
  //History
  const historyAll = {
    name: triggerName,
    type: 'historyChange'
   };

   const historySome = {
    name: triggerName,
    type: 'historyChange',
    filter: [ {
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
    } ],
  };

  //JavaScript Error
  const jsAll = {
    name: triggerName,
    type: 'jsError'
   };

   const jsSome = {
    name: triggerName,
    type: 'jsError',
    filter: [ {
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
    } ],
  };


  //Timer
  const timerAll = {
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

   const timerSome = {
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

  //Timer Group
  const timerGroupAll = {
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

   const timerGroupSome = {
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
function newFunction(triggerName: string, param1: string | undefined, param2: string | undefined, selectorType: string, param3: string | undefined, param4: string | undefined, param5: string | undefined, param6: string | undefined, param7: string | undefined) {
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

