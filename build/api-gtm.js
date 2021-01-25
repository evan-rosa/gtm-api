'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const auth_1 = require("@gtmComponents/auth");
const containers_1 = require("@gtmComponents/containers");
const workspace_1 = require("@gtmComponents/workspace");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//If you need to change the gtm account ID, change it in the env file
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
async function runSample() {
    try {
        //GTM Authentication
        await auth_1.gtmAuthenticate();
        //Containers
        // Add GTM Account Number
        const containers = await containers_1.listContainers(gtmAcctID);
        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId = 'GTM-P4DJ4N2';
        //We need to get a private container ID to call the API
        const containerId = containers.find((id) => id.publicId === gtmContainerId).containerId;
        //Workspaces
        //Create gtm workspace
        const workspaceName = 'test workspace create';
        const workspaceDescription = 'test workspace create';
        await workspace_1.createWorkspace(containerId, workspaceName, workspaceDescription);
        const workspaces = await workspace_1.listWorkspace(containerId);
        //Delete Workspace
        //await deleteWorkspace(containerId, 68);
        const workspaceId = await workspaces.find((id) => id.name === workspaceName).workspaceId;
        //Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.
        await workspace_1.syncWorkspace(containerId, workspaceId);
        //if status is bad do x otherwise do y
        await workspace_1.getStatusWorkspace(containerId, workspaceId);
        //Pushes workspace to latest gtm version
        //In order provide: containerID, workspaceID, versionName, versionDescription
        const versionName = 'Test for GTM Workspace Push';
        const versionDescription = 'This is a test with the GTM API';
        //await createVersion(containerId, workspaceId, versionName, versionDescription);
    }
    catch (err) {
        console.log(err);
    }
}
runSample();
