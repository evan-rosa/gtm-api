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

//Pageview
export async function pageviewTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

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
  const requestBody = triggerCondition ? reqBodyCondition : reqBodyAll
  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

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
export async function elementVisTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string, selectionMethod?: string, elementVal?: string, useOnScreenDuration?: string, domChangeListener?: string, firingFrequency?: string, onScreenRatio?: string, onScreenDuration?: string) {

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


  // Create trigger
  const res = await gtm.accounts.containers.workspaces.triggers.create({
    parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}

//Form Submission
export async function formSubmitTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string, waitForTagsBool?:string, checkValidationBool?: string, waitForTagsTimeout?: string, autoEventFilterCondition?: string, autoEventFilterKey?: string, autoEventFilterVal?: string) {

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
export async function youTubeTrigger(obj:triggerAuthDetails, triggerName: string, captureStart: string, captureComplete:string, capturePause: string, captureProgress: string, progressTimeOrPercent?: string, progressVal?: any, fixMissingApi?: string, triggerStartOption?: string, triggerCondition?: string, key?: string, val?: string) {

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


































/*********************************List Triggers**************************************/
export async function listTriggers(obj:triggerAuthDetails) {
     const res = await gtm.accounts.containers.workspaces.triggers.list({
         parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
       });
       //console.log('******************************************************************');
       //console.log(res.data);
       return res.data.trigger
}


/*********************************Get Trigger**************************************/
export async function getTrigger(obj: triggerAuthDetails, triggerId: number ){
  const res = await gtm.accounts.containers.workspaces.triggers.get({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
  });
  /** */
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
  console.log(res.data.filter.find((id: any) => id.parameter));
  console.log('***********************************************');  
  //console.log(res.data.autoEventFilter.find((id: any) => id.parameter));
}
