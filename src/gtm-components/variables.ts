import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;
interface varCreateDetails {
  workspaceNumber: number,
  containerId: number
}
//Create Variable
//Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference

//export function for creating a variable in GTM
export async function createVariable(obj:varCreateDetails, varName: string, varType: string, reqVal?: any, optVal?: any){
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

   //Save the request body params as a const variable - if statement calling the appropriate array object based on the input of the gtm variable type
   const params = varType === 'k' ? k
    : varType ==='aev' ? aev
    : varType ==='c' ? c
    : varType ==='ctv' ? null
    : varType ==='e' ? null
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

//Delete GTM Variable
export async function deleteVariable(obj: varCreateDetails, variableId: number){
  const res = await gtm.accounts.containers.workspaces.variables.delete({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
  });
 }

// Get GTM Variable
export async function getVariable(obj: varCreateDetails, variableId: number ){
  const res = await gtm.accounts.containers.workspaces.variables.get({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/variables/' + variableId,
  });
  console.log(res.data);
  
}
 

//List Variables
export async function listVariables(obj:varCreateDetails){
      const res = await gtm.accounts.containers.workspaces.variables.list({
        parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
      });
      return res.data.variable
}

