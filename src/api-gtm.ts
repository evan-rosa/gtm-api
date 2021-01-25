'use strict'

import 'module-alias/register';
import { gtmAuthenticate } from '@gtmComponents/auth';
import { listContainers } from '@gtmComponents/containers';
import { createWorkspace, deleteWorkspace, syncWorkspace, listWorkspace, createVersion, getStatusWorkspace } from '@gtmComponents/workspace';
import * as dotenv from 'dotenv';

dotenv.config();

//If you need to change the gtm account ID, change it in the env file
const gtmAcctID: any = process.env.GTM_ACCOUNT_ID;

async function runSample() {
    try{
        //GTM Authentication
        await gtmAuthenticate();

        //Containers
        // Add GTM Account Number
        const containers = await listContainers(gtmAcctID);

        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId: string = 'GTM-P4DJ4N2';

        //We need to get a private container ID to call the API
        const containerId: number = containers.find((id: any) => id.publicId === gtmContainerId).containerId;
        
        //Workspaces

        //Create gtm workspace
        
        const workspaceName = 'test workspace create';
        const workspaceDescription = 'test workspace create';
        await createWorkspace(containerId, workspaceName, workspaceDescription);

        const workspaces = await listWorkspace(containerId);

        //Delete Workspace
        //await deleteWorkspace(containerId, 68);

        const workspaceId: number = await workspaces.find((id: any) => id.name === workspaceName).workspaceId;

        //Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.
        await syncWorkspace(containerId, workspaceId);

        //if status is bad do x otherwise do y
        await getStatusWorkspace(containerId, workspaceId);

        //Pushes workspace to latest gtm version
        //In order provide: containerID, workspaceID, versionName, versionDescription
        const versionName: string = 'Test for GTM Workspace Push';
        const versionDescription: string = 'This is a test with the GTM API';
        //await createVersion(containerId, workspaceId, versionName, versionDescription);

    } catch (err){
        console.log(err)
    }
}

runSample();

//version name = branch
//version description = hash + data/timestamp / commit message

