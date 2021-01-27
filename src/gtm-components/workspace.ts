import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;

interface workspaceDetails {
  workspaceName: string,
  description: string,
  containerId: number
}

export async function createWorkspace(obj:workspaceDetails){
      await gtm.accounts.containers.workspaces.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + obj.containerId,
        requestBody: {
          'name': `${obj.workspaceName}`,
          'description': `${obj.description}`
        },
      });
  }

export async function getStatusWorkspace(containerId: number, workspaceNumber: number){
     const res = await gtm.accounts.containers.workspaces.getStatus({
      path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`,
     });
}

export async function deleteWorkspace(containerId: number, workspaceNumber: number){
    await gtm.accounts.containers.workspaces.delete({
      path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
  })
}

export async function updateWorkspace(containerId: number, workspaceNumber: number){
  await gtm.accounts.containers.workspaces.update({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
})
}

export async function listWorkspace(containerId: number){
  const list = await gtm.accounts.containers.workspaces.list({
    parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId 
  });
  return list.data.workspace
}

export async function syncWorkspace(containerId: number, workspaceNumber: number){
  const sync = await gtm.accounts.containers.workspaces.sync({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
  });
  return sync
}

export async function createVersion(containerId: number, workspaceNumber: number, versionName: string, versionDescription: string){
  const res = await gtm.accounts.containers.workspaces.create_version({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`,
    requestBody: {
          'name': versionName,
          'notes': versionDescription
    }
  });
}
