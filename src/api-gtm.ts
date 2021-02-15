'use strict'

import 'module-alias/register';
import { gtmAuthenticate } from '@gtmComponents/auth';
import { listContainers } from '@gtmComponents/containers';
import { createWorkspace, deleteWorkspace, syncWorkspace, listWorkspace, createVersion, getStatusWorkspace } from '@gtmComponents/workspace';
import {
    deleteVariable, 
    getVariable, 
    listVariables, 
    revertVariable, 
    updateVariable, 
    createAutoEventVariable, 
    createConstantVariable, 
    createFirstPartyCookie,
    createCustomJSVariable,
    createDataLayerVariable,
    createDomElementVariable,
    createHttpVariable,
    createJsVariable,
    createSettingVariable,
    createLookupTableVariable,
    createRegexTableVariable,
    createUrlVariable,
    createVisibilityVariable
} from '@gtmComponents/variables';

import { 
    getTrigger, 
    listTriggers,
    pageviewTrigger,
    domReadyTrigger,
    windowLoadedTrigger,
    clickAllElementTrigger,
    clickLinkTrigger,
    elementVisTrigger,
    formSubmitTrigger,
    scrollDepthTrigger,
    youTubeTrigger,
    customEventTrigger,
    historyChangeTrigger,
    jsErrTrigger,
    timerTrigger,
    triggerGroupTrigger,
    deleteTrigger,
    revertTriggers,
    updateTrigger
} from '@gtmComponents/triggers';

import * as dotenv from 'dotenv';

dotenv.config();

//If you need to change the gtm account ID, change it in the env file
const gtmAcctID: any = process.env.GTM_ACCOUNT_ID;

async function runSample() {
    try{
        /*********************GTM AUTH***********************/
        await gtmAuthenticate();

        /*********************CONTAINER***********************/
        // Add GTM Account Number
        const containers = await listContainers(gtmAcctID);

        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId: string = 'GTM-P4DJ4N2';

        //We need to get the private container ID to call the API
        const containerId: number = await containers.find((id: any) => id.publicId === gtmContainerId).containerId;
        
        /*********************WORKSPACE***********************/      
        //Create gtm workspace
        //Uses interface
        
        let detailsWorkspace = {
            workspaceName: 'ga4-test',
            description: 'test workspace create',
            containerId: containerId
        };
        /*
        await createWorkspace(detailsWorkspace);
        */

        const workspaces = await listWorkspace(containerId);

        //Delete Workspace
        //await deleteWorkspace(containerId, 70); 52

        const workspaceId: number = await workspaces.find((id: any) => id.name === detailsWorkspace.workspaceName).workspaceId;

        //Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.
        await syncWorkspace(containerId, workspaceId);

        //if status is bad do x otherwise do y
        await getStatusWorkspace(containerId, workspaceId);

        //Pushes workspace to latest gtm version
        //In order provide: containerID, workspaceID, versionName, versionDescription
        const versionName: string = 'Test for GTM Workspace Push';
        const versionDescription: string = 'This is a test with the GTM API';
        //await createVersion(containerId, workspaceId, versionName, versionDescription);

        /*********************VARIABLES***********************/
        //Create Variable
        let initialCred = {
            workspaceNumber: workspaceId,
            containerId: containerId,
        };


        const gtmVariables = await listVariables(initialCred); 
        //gtmVariables
        

        //custom function for GTM variable - custom js
        const customJsVarFunction: any = "function() {\n return function(target: any, selector: any) {while(!target.matches(selector) && !target.matches(\"body\")){target = target.parentElement;}return target.matches(selector) ? target : undefined};\n}";

        //define rows and values for lookup table here.

        const smmList = [
            {
             "type": "map",
             "map": [
              {
               "type": "template",
               "key": "key",
               "value": '1001' //required value (value coming in)
              },
              {
               "type": "template",
               "key": "value",
               "value": '1001' //required value (value going out)
              }
             ]
            },

            {
              "type": "map",
              "map": [
               {
                "type": "template",
                "key": "key",
                "value": 't' //required value (value coming in)
               },
               {
                "type": "template",
                "key": "value",
                "value": 'e' //required value (value going out)
               }
              ]
             },
             {
                "type": "map",
                "map": [
                 {
                  "type": "template",
                  "key": "key",
                  "value": 'g' //required value (value coming in)
                 },
                 {
                  "type": "template",
                  "key": "value",
                  "value": 'w' //required value (value going out)
                 }
                ]
               }
           ];

        //GOOGLE ANALYTICS SETTING VARIABLE Key/Value Pairs
        //GA Setting Fields to Set
        const gasFieldsToSet = [{
            'type': 'map', 
            'map': 
            [
                {
                    'type': 'template', 
                    'key': 'fieldName', 
                    'value': 'checkProtocolTask' 
                },
                {
                    'type': 'template',
                    'key': 'value',
                    'value': '{{JS - Empty Variable Function}}'
                }
            ]
          }];
        //GA Setting Custom Dimensions
        const gasCustomDimensions = [
            {
             "type": "map",
             "map": [
                        { 
                            'type': 'template', 
                            'key': 'index', 
                            'value': '1' 
                        },
                        {
                            'type': 'template',
                            'key': 'dimension',
                            'value': '{{Custom JS - Random Session ID}}'
                        }
                    ]
            }
        ];


        //GA Setting Content Group
        const gasContentGroup = [
            {
             "type": "map",
             "map": [
                        { 
                            'type': 'template', 
                            'key': 'index', 
                            'value': '0' 
                        },
                        { 
                            'type': 'template', 
                            'key': 'group', 
                            'value': 'Team 1' 
                        }
                    ]
            }
        ];

        //GA Setting Custom Metric
        const gasCustomMetric = [
            {
                "type": "map",
                "map": [
                        { 
                            type: 'template', 
                            key: 'index', 
                            value: '0' 
                        },
                        { 
                            type: 'template', 
                            key: 'metric', 
                            value: '456' 
                        }
                    ]
            }
        ];

        //Default Formatting for Variables
        const varFormatValue = {
            caseConversionType: 'lowercase',
            convertNullToValue: 
                { 
                    type: 'template', 
                    value: 'evan' 
                },
            convertUndefinedToValue: 
                { 
                    type: 'template', 
                    value: 'null' 
                },
            convertTrueToValue: 
                { 
                    type: 'template', 
                    value: 'false' 
                },
            convertFalseToValue: 
                { 
                    type: 'template', 
                    value: 'false' 
                }
          };
         
        
             
        //Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference
        //createVariable(initialCred, '1st Party Cookie','k','cookie');
        //createVariable(initialCred, 'y','aev','URL');
        //createVariable(initialCred, 'AEV','aev','HISTORY_NEW_STATE');
        //createVariable(initialCred, 'constant string','c','constant');
        //createVariable(initialCred, 'container version number','ctv');
        //createVariable(initialCred, 'custom event','e');
        //createVariable(initialCred, ' parent','jsm', f);
        //createVariable(initialCred, 'dlv','v', 'event-dlv');
        //createVariable(initialCred, 'DOM Element','d','#id', 'aria-label');
        //createVariable(initialCred, 'http','f', 'PROTOCOL');
        //createVariable(initialCred, 'js var','j', 'document.title');
        //createVariable(initialCred, 'lookup new test 1001','smm','{{Event}}', smmList);
        //createVariable(initialCred, 'lookup test regex','remm','{{Page Hostname}}', smmList);
        //createVariable(initialCred, 'random number','r');
        //createVariable(initialCred, 'url test','u', 'PATH');
        //createVariable(initialCred, 'test vis', 'vis','#test','BOOLEAN','CSS','75');
        //createVariable(initialCred, 'test vis 1023', 'vis','body','PERCENT','CSS');

        //Create GA Setting Variable
        //VarParams List
        /*
         * varParam 1 = Tracking ID
         * varParam 2 = Cookie Domain
         * varParam 3 = Fields to Set
         * varParam 4 = Custom Dimensions
         * varParam 5 = Custom Metrics
         * varParam 6 = Content Group
         * varParam 7 = Enable Display Ad Feature (True/False string)
         * varParam 8 = Cross Domain Tracking (comma separated list for domains and subdomains)
         * varParam 9 =  Cross Domain Tracking Hash Auto Link
         * varParam 10 = Cross Domain Tracking Decorate Forms Auto Link
         * varParam 11 = Global function name for GTM. Renames the global function used by the Universal Analytics Tag
         * varParam 12 = The transport URL is the base URL where analytics requests will be sent.
         * varParam 13 = Debug Version (True/False string)
         * varParam 14 =  Enable Enhanced Link Attribution (True/False string)
         * varParamFormat = array
         */
        //createVariable(initialCred, 'GA Setting Test', 'gas','{{UA - Web Properties}}', 'auto',gasFieldsToSet,gasCustomDimensions, gasCustomMetric, gasContentGroup,'true','','false','false','','', 'true', 'true');
        
        //const variableName: string = 'test';
        //const variableId: number = await gtmVariables.find((id: any) => id.name === variableName).variableId;
        

         //Get Variable
         //getVariable(initialCred, variableId);

        //AEV Types
        //element, element type, element attr, element classes, element target, element text, element url, element id, history new url fragment, history old url fragment, history new state, history old state, and history change source
        
        //First Party Cookie
        //Parameters = initialCred, The name of the variable, the cookie name, and true/false string to decode cookie
        //createFirstPartyCookie(initialCred,'cookie test','mpid', 'false');

        //Element URL Component Types
        //URL, PROTOCOL, HOST, PORT, PATH, EXTENSION, QUERY, FRAGMENT, IS_OUTBOUND
        //createAutoEventVariable(initialCred,'aev-test','history new url fragment');


        //Constant String
        //params = initialCred, gtm variable name, and constant value
        //createConstantVariable(initialCred,'constant','string')

        //Custom JS Var
        //params = initialCred, gtm variable name, and function
        //createCustomJSVariable(initialCred,'js var',customJsVarFunction)

        //DLV
        // params = initialCred, name of gtm variable, and name of the DLV (i.e. event or custom_event etc)
        //createDataLayerVariable(initialCred,'dlv','name of DLV');
        
        //DOM Element Variable
        //params = initialCred, var name, id value (i.e. #id or .class)
        //createDomElementVariable(initialCred,'test','#id','aria-label');

        //HTTP
        //params = initialCred, Variable Name, Component Type (URL, PROTOCOL, HOST, PORT, PATH, QUERY, FRAGMENT)
        //createHttpVariable(initialCred, 'http test','FRAGMENT');

        //JS var
        //params = initialCred, name, value
        //createJsVariable(initialCred,'test js var','ere');


        //GA Setting
        //createSettingVariable(initialCred,'test GA setting','{{UA - Web Properties}}','auto',gasFieldsToSet, gasCustomDimensions,gasCustomMetric,gasContentGroup,'true',null,'false','false',null,null,'true','true');

        //Lookup Table
        //createLookupTableVariable(initialCred,'test lookup','{{Page Hostname}}',smmList);

        //Regex Lookup
        //createRegexTableVariable(initialCred, 'test regex','{{Page Path}}', smmList);

        //URL
        //createUrlVariable(initialCred,'test url','QUERY','12341234')

        //Vis Var
        //createVisibilityVariable(initialCred,'vis','ID','#test','PERCENT' );

        


        //Delete Variables
        //deleteVariable(initialCred, variableId);
        

       

        //Update Variable
        //contains more than 14 parameters
        //updateVariable(initialCred, variableId, 'test', 'gas',varFormatValue, '{{UA - Web Properties}}','auto',gasFieldsToSet, gasCustomDimensions, gasCustomMetric, gasContentGroup,'false','','false','false','','','true','true')

        //Revert Variable
        //Reverts changes to variable. If no changes occur revert will delete variable.
        //revertVariable(initialCred)





        /*********************TRIGGERS***********************/
        
        const gtmTriggers = await listTriggers(initialCred);
        const triggerName: string = 'test';
        const triggerId: number = await gtmTriggers.find((id: any) => id.name === triggerName).triggerId;

        updateTrigger(initialCred, triggerId, 'test','link click','some','contains','{{DLV - Button}}','12');

        //getTrigger(initialCred,triggerId)
 
        //const gtmTriggers = await listTriggers(initialCred);
        //const triggerName: string = 't';
        //const triggerId: number = await gtmTriggers.find((id: any) => id.name === triggerName).triggerId;
        
        //getTrigger(initialCred,triggerId)

        //formSubmitTrigger(initialCred,'test',)

        //deleteTrigger(initialCred,triggerId);
        
        //updateTrigger(initialCred,triggerId,'test','pageview','contains','{{DLV Button}}', '123123');

        //this function should only have one scroll type, either vertical or horizontal but not both. If both are applied then the values to measure engagement will persist across scroll types. In the example below, pixel measurements of 1000 and 2000 pixels will be applied to both horizontal and vertical scroll depths.
        //scrollDepthTrigger(initialCred, 'test','DOM_READY','true','true','PIXELS', '2000, 1000');
        
        //Array of objects that call variable Ids for trigger group
        /**
         * const triggerRef =  [
            { type: 'triggerReference', value: '34' },
            { type: 'triggerReference', value: '23' }
          ];

        triggerGroupTrigger(initialCred, 'test', triggerRef, 'contains', '{{DLV - Button}}', '123123');
         */



          /**
           * 
           * 
       //Equals
       const triggerNameEquals: string = 'test pageview - equals';
       const triggerNameEqualsId: number = await gtmTriggers.find((id: any) => id.name === triggerNameEquals).triggerId;
       getTrigger(initialCred,triggerNameEqualsId)

       //contains
       const triggerNameContains: string = 'test pageview - contains';
       const triggerNameContiainsId: number = await gtmTriggers.find((id: any) => id.name === triggerNameContains).triggerId;
       getTrigger(initialCred,triggerNameContiainsId)

       //starts with
       const startsWith: string = 'test pageview - startsWith';
       const startsWithId: number = await gtmTriggers.find((id: any) => id.name === startsWith).triggerId;
       getTrigger(initialCred,startsWithId)


       //ends with
       const endsWith: string = 'test pageview - endsWith';
       const endsWithId: number = await gtmTriggers.find((id: any) => id.name === endsWith).triggerId;
       getTrigger(initialCred,endsWithId)   

       //css 
       const css: string = 'test pageview - CSS Selector';
       const cssId: number = await gtmTriggers.find((id: any) => id.name === css).triggerId;
       getTrigger(initialCred,cssId)

       //regex
       const regex: string = 'test pageview - regex';
       const regexId: number = await gtmTriggers.find((id: any) => id.name === regex).triggerId;
       getTrigger(initialCred,regexId)  

        //does not equal
        const dne: string = 'test pageview - does not equal';
        const dneId: number = await gtmTriggers.find((id: any) => id.name === dne).triggerId;
        getTrigger(initialCred,dneId)  

       //regex ignore case
       const regexIgnore: string = 'test pageview - regex ignore case';
       const regexIgnoreId: number = await gtmTriggers.find((id: any) => id.name === regexIgnore).triggerId;
       getTrigger(initialCred,regexIgnoreId) 

        //does not contain
        const dnc: string = 'test pageview - does not contain';
        const dncId: number = await gtmTriggers.find((id: any) => id.name === dnc).triggerId;
        getTrigger(initialCred,dncId) 

                //does not start with
                const dsw: string = 'test pageview - does not start with';
                const dswId: number = await gtmTriggers.find((id: any) => id.name === dsw).triggerId;
                getTrigger(initialCred,dswId) 
        
                //does not END with
        const dew: string = 'test pageview - does not end with';
        const dewId: number = await gtmTriggers.find((id: any) => id.name === dew).triggerId;
        getTrigger(initialCred,dewId) 


        //does not match css selector
        const dnmCss: string = 'test pageview - does not match css selector';
        const dnmCssId: number = await gtmTriggers.find((id: any) => id.name === dnmCss).triggerId;
        getTrigger(initialCred,dnmCssId) 

        //does not match regex
        const dnmRegex: string = 'test pageview - does not match regex';
        const dnmRegexId: number = await gtmTriggers.find((id: any) => id.name === dnmRegex).triggerId;
        getTrigger(initialCred,dnmRegexId) 

        //does not match regex ignore case
        const dnmRegexIg: string = 'test pageview - does not match regex ignore case';
        const dnmRegexIgId: number = await gtmTriggers.find((id: any) => id.name === dnmRegexIg).triggerId;
        getTrigger(initialCred,dnmRegexIgId) 

        //less than
        const less: string = 'test pageview - less than';
        const lessId: number = await gtmTriggers.find((id: any) => id.name === less).triggerId;
        getTrigger(initialCred,lessId) 

        //less than or Eqaul to
        const lessEq: string = 'test pageview - less than or equal to';
        const lessEqId: number = await gtmTriggers.find((id: any) => id.name === lessEq).triggerId;
        getTrigger(initialCred,lessEqId) 

        //greater than
        const g: string = 'test pageview - greater than';
        const gId: number = await gtmTriggers.find((id: any) => id.name === g).triggerId;
        getTrigger(initialCred,gId) 

        //greater than or Eqaul to
        const gEq: string = 'test pageview - greater than or equal to';
        const gEqId: number = await gtmTriggers.find((id: any) => id.name === gEq).triggerId;
        getTrigger(initialCred,gEqId) 
           */






      //createTrigger(initialCred, 'test rrr','trigger group','some','contains','{{HTML ID}}','test');
      //createTrigger(initialCred, 'test rr33 rosa','trigger group','all');

        
        
    } catch (err){
        console.log(err)
    }
}

runSample();

//version name = branch
//version description = hash + data/timestamp / commit message

