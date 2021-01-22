"use strict";
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
exports.createVersion = exports.syncWorkspace = exports.listWorkspace = exports.updateWorkspace = exports.deleteWorkspace = exports.createWorkspace = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
async function createWorkspace(containerId, workspaceName, description) {
    await gtm.accounts.containers.workspaces.create({
        // GTM parent Container&#39;s API relative path. Example: accounts/{account_id\}/containers/{container_id\}
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId,
        // Request body metadata
        requestBody: {
            'name': `${workspaceName}`,
            'description': `${description}`
        },
    });
}
exports.createWorkspace = createWorkspace;
async function deleteWorkspace(containerId, workspaceNumber) {
    await gtm.accounts.containers.workspaces.delete({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
    });
}
exports.deleteWorkspace = deleteWorkspace;
async function updateWorkspace(containerId, workspaceNumber) {
    await gtm.accounts.containers.workspaces.update({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
    });
}
exports.updateWorkspace = updateWorkspace;
async function listWorkspace(containerId) {
    const list = await gtm.accounts.containers.workspaces.list({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId
    });
    return list.data.workspace;
}
exports.listWorkspace = listWorkspace;
async function syncWorkspace(containerId, workspaceNumber) {
    const sync = await gtm.accounts.containers.workspaces.sync({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
    });
    console.log(sync.data);
    return sync;
}
exports.syncWorkspace = syncWorkspace;
async function createVersion(containerId, workspaceNumber, versionName, versionDescription) {
    const res = await gtm.accounts.containers.workspaces.create_version({
        path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`,
        requestBody: {
            'name': versionName,
            'notes': versionDescription
        }
    });
    console.log(res.data);
}
exports.createVersion = createVersion;
