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
const variables_1 = require("@gtmComponents/variables");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//If you need to change the gtm account ID, change it in the env file
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
async function runSample() {
    try {
        //GTM AUTH
        await auth_1.gtmAuthenticate();
        //CONTAINER
        // Add GTM Account Number
        const containers = await containers_1.listContainers(gtmAcctID);
        //Save GTM container ID as const. See GTM GUI to get ID
        const gtmContainerId = 'GTM-P4DJ4N2';
        //We need to get the private container ID to call the API
        const containerId = await containers.find((id) => id.publicId === gtmContainerId).containerId;
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
        const workspaces = await workspace_1.listWorkspace(containerId);
        //Delete Workspace
        //await deleteWorkspace(containerId, 70); 52
        const workspaceId = await workspaces.find((id) => id.name === detailsWorkspace.workspaceName).workspaceId;
        //Syncs a workspace to the latest container version by updating all unmodified workspace entities and displaying conflicts for modified entities.
        await workspace_1.syncWorkspace(containerId, workspaceId);
        //if status is bad do x otherwise do y
        await workspace_1.getStatusWorkspace(containerId, workspaceId);
        //Pushes workspace to latest gtm version
        //In order provide: containerID, workspaceID, versionName, versionDescription
        const versionName = 'Test for GTM Workspace Push';
        const versionDescription = 'This is a test with the GTM API';
        //await createVersion(containerId, workspaceId, versionName, versionDescription);
        //VARIABLES
        //Create Variable
        let varCreate = {
            workspaceNumber: workspaceId,
            containerId: containerId,
        };
        const gtmVariables = await variables_1.listVariables(varCreate);
        gtmVariables;
        //custom function for GTM variable - custom js
        const f = "function() {\n return function(target: any, selector: any) {while(!target.matches(selector) && !target.matches(\"body\")){target = target.parentElement;}return target.matches(selector) ? target : undefined};\n}";
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
        //createVariable(varCreate, 'test vis', 'vis','#test','BOOLEAN','CSS','75');
        //createVariable(varCreate, 'test vis 1023', 'vis','body','PERCENT','CSS');
        //need to define gtm variable name to delete (character sensitive)
        const variableName = 'UA - Settings - All - Generic';
        const variableId = await gtmVariables.find((id) => id.name === variableName).variableId;
        //Delete Variables
        //deleteVariable(varCreate, variableId);
        //Get Variable
        variables_1.getVariable(varCreate, variableId);
        //Revert Variable
        //Reverts changes to variable. If no changes occur revert will delete variable.
        //revertVariable(varCreate, variableId)
    }
    catch (err) {
        console.log(err);
    }
}
runSample();
