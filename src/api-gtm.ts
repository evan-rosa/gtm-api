'use strict'

import 'module-alias/register';
import { gtmAuthenticate } from '@gtmComponents/auth';
import { listContainers } from '@gtmComponents/containers';
import { createWorkspace, deleteWorkspace, syncWorkspace, listWorkspace, createVersion, getStatusWorkspace } from '@gtmComponents/workspace';
import {createVariable, deleteVariable, getVariable, listVariables} from '@gtmComponents/variables';
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

     
          
        
        
   
        //createVariable needs to take in the interface of varCreate and the variable type you want to create
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
        
        //need to define gtm variable name to delete (character sensitive)
        const variableName: string = 'lookup';
       // const variableId: number = await gtmVariables.find((id: any) => id.name === variableName).variableId;

        //Delete Variables
        //deleteVariable(varCreate, variableId);
        

        //Get Variable
       // getVariable(varCreate, variableId);
        
    } catch (err){
        console.log(err)
    }
}

runSample();

//version name = branch
//version description = hash + data/timestamp / commit message

