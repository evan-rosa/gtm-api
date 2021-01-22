import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;

export async function createWorkspace(containerId: number, workspaceName: string, description: string){
      await gtm.accounts.containers.workspaces.create({
        parent: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId,
        requestBody: {
          'name': `${workspaceName}`,
          'description': `${description}`
        },
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
  console.log(list.data.workspace);
  return list.data.workspace
}

export async function syncWorkspace(containerId: number, workspaceNumber: number){
  const sync = await gtm.accounts.containers.workspaces.sync({
    path: 'accounts/' + gtmAcctID + '/' + 'containers/' + containerId + '/' + 'workspaces/' + `${workspaceNumber}`
  });
  console.log(sync.data);
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
  console.log(res.data);
}
