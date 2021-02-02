'use strict'

import 'module-alias/register';
import { gtmAuthenticate } from '@gtmComponents/auth';
import { listContainers } from '@gtmComponents/containers';
import { createWorkspace, deleteWorkspace, syncWorkspace, listWorkspace, createVersion, getStatusWorkspace } from '@gtmComponents/workspace';
import {createVariable, deleteVariable, getVariable, listVariables, revertVariable, updateVariable} from '@gtmComponents/variables';
import * as dotenv from 'dotenv';

dotenv.config();

//If you need to change the gtm account ID, change it in the env file
const gtmAcctID: any = process.env.GTM_ACCOUNT_ID;

async function runSample() {
    try{
        //GTM AUTH
        await gtmAuthenticate();

        //CONTAINER
        // Add GTM Account Number
        const containers = await listContainers(gtmAcctID);

        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId: string = 'GTM-P4DJ4N2';

        //We need to get the private container ID to call the API
        const containerId: number = await containers.find((id: any) => id.publicId === gtmContainerId).containerId;
        
        //WORKSPACE

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

        //VARIABLES
        //Create Variable
        let varCreate = {
            workspaceNumber: workspaceId,
            containerId: containerId,
        };


        const gtmVariables = await listVariables(varCreate); 
        

        //custom function for GTM variable - custom js
        const f: any = "function() {\n return function(target: any, selector: any) {while(!target.matches(selector) && !target.matches(\"body\")){target = target.parentElement;}return target.matches(selector) ? target : undefined};\n}";

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
          
 
        
        //Epic with tickets under it
   
        //Variable Types can be found here: https://developers.google.com/tag-manager/api/v2/variable-dictionary-reference
        //createVariable(varCreate, '1st Party Cookie','k','cookie');
        //createVariable(varCreate, 'y','aev','URL');
        //createVariable(varCreate, 'AEV','aev','HISTORY_NEW_STATE');
        //createVariable(varCreate, 'constant string','c','constant');
        //createVariable(varCreate, 'container version number','ctv');
        //createVariable(varCreate, 'custom event','e');
        //createVariable(varCreate, ' parent','jsm', f);
        //createVariable(varCreate, 'dlv','v', 'event-dlv');
        //createVariable(varCreate, 'DOM Element','d','#id', 'aria-label');
        //createVariable(varCreate, 'http','f', 'PROTOCOL');
        //createVariable(varCreate, 'js var','j', 'document.title');
        //createVariable(varCreate, 'lookup new test 1001','smm','{{Event}}', smmList);
        //createVariable(varCreate, 'lookup test regex','remm','{{Page Hostname}}', smmList);
        //createVariable(varCreate, 'random number','r');
        //createVariable(varCreate, 'url test','u', 'PATH');
        //createVariable(varCreate, 'test vis', 'vis','#test','BOOLEAN','CSS','75');
        //createVariable(varCreate, 'test vis 1023', 'vis','body','PERCENT','CSS');

        //Create GA Setting Variable
        //VarParams List
        /*
         * varParam 1 = Format Values
         * varParam 2 = Tracking ID
         * varParam 3 = Cookie Domain
         * varParam 4 = Fields to Set
         * varParam 5 = Custom Dimensions
         * varParam 6 = Custom Metrics
         * varParam 7 = Content Group
         * varParam 8 = Enable Display Ad Feature (True/False string)
         * varParam 9 = Cross Domain Tracking (comma separated list for domains and subdomains)
         * varParam 10 =  Cross Domain Tracking Hash Auto Link
         * varParam 11 = Cross Domain Tracking Decorate Forms Auto Link
         * varParam 12 = Global function name for GTM. Renames the global function used by the Universal Analytics Tag
         * varParam 13 = The transport URL is the base URL where analytics requests will be sent.
         * varParam 14 = Debug Version (True/False string)
         * varParam 15 =  Enable Enhanced Link Attribution (True/False string)
         */
        //createVariable(varCreate, 'GA Setting Test', 'gas','{{UA - Web Properties}}', 'auto',gasFieldsToSet,gasCustomDimensions, gasCustomMetric, gasContentGroup,'true','','false','false','','', 'true', 'true');
        
        const variableName: string = 'GAS';
        const variableId: number = await gtmVariables.find((id: any) => id.name === variableName).variableId;


        //Delete Variables
        //deleteVariable(varCreate, variableId);
        

        //Get Variable
        getVariable(varCreate, variableId);

        //Update Variable
        //contains more than 14 parameters
        updateVariable(varCreate, variableId, 'test', 'gas', '{{UA - Web Properties}}','auto',gasFieldsToSet, gasCustomDimensions, gasCustomMetric, gasContentGroup,'true','','true','true','','','false','false',varFormatValue)

        //Revert Variable
        //Reverts changes to variable. If no changes occur revert will delete variable.
        //revertVariable(varCreate)
        
    } catch (err){
        console.log(err)
    }
}

runSample();

//version name = branch
//version description = hash + data/timestamp / commit message

