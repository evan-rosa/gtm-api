'use strict';

const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');
const gtm = google.tagmanager('v2');
import * as dotenv from 'dotenv';
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const scope = ['https://www.googleapis.com/auth/tagmanager.readonly',
'https://www.googleapis.com/auth/tagmanager.manage.accounts',
'https://www.googleapis.com/auth/tagmanager.edit.containers',
'https://www.googleapis.com/auth/tagmanager.delete.containers',
'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
'https://www.googleapis.com/auth/tagmanager.manage.users',
'https://www.googleapis.com/auth/tagmanager.publish',]

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;
const gtmContainerID = process.env.GTM_CONTAINER_ID;

async function runSample() {

    try{
        // Obtain user credentials to use for the request
        const auth = await authenticate({
            keyfilePath: path.join(__dirname, '../client_secret.json'),
            scopes: scope,
        });
        google.options({auth});

        rl.question("Is this an existing workspace?", async function(answer: string) {
            const yes:string = 'yes';
            const no: string = 'no';
            if (answer == no){
                rl.question("Do you want to create a new workspace? ", async function name(answer: string) {
                    if (answer == no){
                        console.log("Ok, we will not create a new GTM workspace. Closing program, Goodbye.");
                        process.exit(0);
                    }
                    if (answer == yes){
                        rl.question("What would you like to name this new workspace?", async function(workspaceName: string) {
                            rl.question("Please provide a description for this new workspace.", async function(description: string) {
                                const gtmNewWorkspaceName = `${workspaceName}`;
                                const gtmWorkspaceDescription = `${description}`;
                                await gtm.accounts.containers.workspaces.create({
                                    // GTM parent Container&#39;s API relative path. Example: accounts/{account_id\}/containers/{container_id\}
                                    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID,
                                    // Request body metadata
                                    requestBody: {
                                    'name': gtmNewWorkspaceName,
                                    'description': gtmWorkspaceDescription
                                    },
                                });
                                // Asking which GTM workspace we need to update
                                rl.question('Which GTM workspace ID do you want to edit?', async function(gtmCurrentWorkspaceId : any) {
        
                                    rl.question("What do you want to name your gtm variable?", async function(gtmNewVarName: any) {
        
                                        rl.close();
                                        const gtmWorkId = `${gtmCurrentWorkspaceId}`;
                                        const gtmNewVar = `${gtmNewVarName}`;
                                    
                                        //Creates a new GTM lookup variable
                                        const gtmVar = await gtm.accounts.containers.workspaces.variables.create({
                                            parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID + '/' + 'workspaces/' + gtmWorkId,
                                            requestBody: {
                                                'name': gtmNewVar,
                                                'type': 'smm',
                                                'parameter': [
                                                    {
                                                    'type': 'template',
                                                    'key': 'input',
                                                    'value': '{{Page Hostname}}'
                                                    },
                                                    {
                                                    'type': 'list',
                                                    'key': 'map',
                                                    'list': [
                                                    {
                                                    'type': 'map',
                                                    'map': [
                                                        {   
                                                            "type": "template",
                                                            "key": "key",
                                                            "value": "localhost"
                                                            },
                                                            {
                                                            "type": "template",
                                                            "key": "value",
                                                            "value": "G-R4QFJ2JKM6"
                                                        }
                                                    ]
                                                    },
                                                    {
                                                        'type': 'map',
                                                        'map': [
                                                        {   
                                                            "type": "template",
                                                            "key": "key",
                                                            "value": "localhost"
                                                            },
                                                            {
                                                            "type": "template",
                                                            "key": "value",
                                                            "value": "null"
                                                        }
                                                        ]
                                                    },
                                                    ]
                                                    },
                                                    {
                                                    'type': 'template',
                                                    'key': 'defaultValue',
                                                    'value': '(not set)'
                                                    }
                                                ]
                                            }
                                        })
                                        });
                            });
                            }); 
                        });
                    }
                })
            } else if (answer == yes) {
                //Lists Workspaces
                const listWorkspaces = await gtm.accounts.containers.workspaces.list({
                    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID,
                });
                
                console.log(listWorkspaces.data);
                // Asking which GTM workspace we need to update
                rl.question('Which GTM workspace ID do you want to edit?', async function(gtmCurrentWorkspaceId : any) {

                    rl.question("What do you want to name your gtm variable?", async function(gtmNewVarName: any) {

                        rl.close();
                        const gtmWorkId = `${gtmCurrentWorkspaceId}`;
                        const gtmNewVar = `${gtmNewVarName}`;
                    
                        //Creates a new GTM lookup variable
                        const gtmVar = await gtm.accounts.containers.workspaces.variables.create({
                            parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID + '/' + 'workspaces/' + gtmWorkId,
                            requestBody: {
                                'name': gtmNewVar,
                                'type': 'smm',
                                'parameter': [
                                    {
                                    'type': 'template',
                                    'key': 'input',
                                    'value': '{{Page Hostname}}'
                                    },
                                    {
                                    'type': 'list',
                                    'key': 'map',
                                    'list': [
                                    {
                                    'type': 'map',
                                    'map': [
                                        {   
                                            "type": "template",
                                            "key": "key",
                                            "value": "localhost"
                                            },
                                            {
                                            "type": "template",
                                            "key": "value",
                                            "value": "G-R4QFJ2JKM6"
                                        }
                                    ]
                                    },
                                    {
                                        'type': 'map',
                                        'map': [
                                        {   
                                            "type": "template",
                                            "key": "key",
                                            "value": "localhost"
                                            },
                                            {
                                            "type": "template",
                                            "key": "value",
                                            "value": "null"
                                        }
                                        ]
                                    },
                                    ]
                                    },
                                    {
                                    'type': 'template',
                                    'key': 'defaultValue',
                                    'value': '(not set)'
                                    }
                                ]
                            }
                        })
                        });
            });
            }
        });

        /*
        //Get GTM Containers
        const getContainers = await gtm.accounts.containers.get({
            path: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID,
        });
        console.log('--------------------------------------');
        
        console.log(getContainers.data);
        console.log(getContainers.data.accountId);
        console.log(getContainers.data.containerId);
        */

        //Create a Workspace called cm-000-ga4
        /*
        const createWorkspace = await gtm.accounts.containers.workspaces.create({
            // GTM parent Container&#39;s API relative path. Example: accounts/{account_id\}/containers/{container_id\}
            parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID,
            // Request body metadata
            requestBody: {
            'name': 'cm-000-ga4',
            'description': 'workspace for GA4 implementation'
            },
        });
        console.log('*****************************');
        
        console.log(createWorkspace.data);
        */


        //Lists Workspaces
        /*
        const listWorkspaces = await gtm.accounts.containers.workspaces.list({
            parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID 
        });
        console.log(listWorkspaces.data);
        */
        
        /*
        //Deletes a Workspace
        const deleteWorkspace = await gtm.accounts.containers.workspaces.delete({
            path: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID + '/' + 'workspaces/61' 
        })

        //list workspaces to console log to verify workspace was deleted
        console.log('-------------------------------------------------');
        console.log(listWorkspaces.data);
        console.log(deleteWorkspace);
        */
        

        // After creating workspace we need to grab to workspace ID and save it as a const variable

       // const gtmWorkspaceID = //createWorkspace.data.workspaceId;
       // console.log(null);
        

        //Creates new GTM workspace variable
        /*
        const gtmVar = await gtm.accounts.containers.workspaces.variables.create({
            //need to get workspace IDs in variable to call on parent 
            parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + gtmContainerID + '/' + 'workspaces/' + gtmWorkspaceID,
        })
        console.log(gtmVar);
        */
        

        //  return null;
    } catch (err){
        console.log(err)
    }
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  runSample();
}
// export functions for testing purposes
module.exports = runSample;