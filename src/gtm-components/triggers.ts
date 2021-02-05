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
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/' + 'workspaces/' + `${obj.workspaceNumber}`,
            requestBody: requestBody
          });
  
}


//Click - Link Click
export async function clickLinkTrigger(obj:triggerAuthDetails, triggerName: string, triggerCondition?: string, key?: string, val?: string ) {

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
            type: 'contains',
            parameter: [
              {
                type: 'template',
                key: 'arg0',
                value: '{{AEV - Element URL Hostname}}' //
              },
              { type: 'template', key: 'arg1', value: 'ddddd' }
            ]
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
        type: 'contains', // trigger condition
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
  //console.log(res.data.parameter.find((id: any) => id.list));

}