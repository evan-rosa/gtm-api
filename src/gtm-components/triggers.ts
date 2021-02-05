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
//export function for creating a trigger in GTM
export async function createTrigger(obj:triggerAuthDetails, triggerName: string, triggerType: string, triggerCondition: string ,triggerParam1?: string, triggerParam2?: string, triggerParam3?: string, triggerParam4?: any){
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
        type: triggerParam1, //contains, equal, regex, more than, less than etc.
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
        type: 'triggerParam1', //contains, equal, regex, more than, less than etc.
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









/*********************************List Triggers**************************************/
export async function listTriggers(obj:triggerAuthDetails) {
     const res = await gtm.accounts.containers.workspaces.triggers.list({
         parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
       });
       console.log('******************************************************************');
       //console.log(res.data);
       return res.data.trigger
}


/*********************************Get Trigger**************************************/
export async function getTrigger(obj: triggerAuthDetails, triggerId: number ){
  const res = await gtm.accounts.containers.workspaces.triggers.get({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/triggers/' + triggerId,
  });
  /** */
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
  console.log(res.data.filter.find((id: any) => id.parameter));
  console.log('***********************************************');  
  console.log(res.data.parameter.find((id: any) => id.list));

}