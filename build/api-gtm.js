'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const auth_1 = require("@gtmComponents/auth");
const containers_1 = require("@gtmComponents/containers");
const workspace_1 = require("@gtmComponents/workspace");
async function runSample() {
    try {
        //GTM Authentication
        await auth_1.gtmAuthenticate();
        //Containers
        // Add GTM Account Number
        const gtmAccountId = 3327262173;
        const containers = await containers_1.listContainers(gtmAccountId);
        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId = 'GTM-P4DJ4N2';
        //We need to get a private container ID to call the API
        const containerId = containers.find((id) => id.publicId === gtmContainerId).containerId;
        //Workspaces
        const workspaces = await workspace_1.listWorkspace(containerId);
        //Save workspace name as a const. This name should be standardized to avoid errors.
        const workspaceName = 'test-name';
        const workspaceId = workspaces.find((id) => id.name === workspaceName).workspaceId;
        //Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.
        await workspace_1.syncWorkspace(containerId, workspaceId);
        //Pushes workspace to latest gtm version
        //In order provide: containerID, workspaceID, versionName, versionDescription
        const versionName = 'Test for GTM Workspace Push';
        const versionDescription = 'This is a test with the GTM API';
        await workspace_1.createVersion(containerId, workspaceId, versionName, versionDescription);
    }
    catch (err) {
        console.log(err);
    }
}
runSample();
