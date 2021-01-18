'use strict';
const { google } = require('googleapis');
const path = require('path');
const { authenticate } = require('@google-cloud/local-auth');
const gtm = google.tagmanager('v2');
const scope = ['https://www.googleapis.com/auth/tagmanager.readonly',
    'https://www.googleapis.com/auth/tagmanager.manage.accounts',
    'https://www.googleapis.com/auth/tagmanager.edit.containers',
    'https://www.googleapis.com/auth/tagmanager.delete.containers',
    'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
    'https://www.googleapis.com/auth/tagmanager.manage.users',
    'https://www.googleapis.com/auth/tagmanager.publish',];
async function runSample() {
    try {
        // Obtain user credentials to use for the request
        const auth = await authenticate({
            keyfilePath: path.join(__dirname, '../client_secret.json'),
            scopes: scope,
        });
        google.options({ auth });
        const listAccounts = await gtm.accounts.list();
        console.log(listAccounts.data.account);
        const getAccounts = await gtm.accounts.get({
            path: 'accounts/3327262173',
        });
        console.log(getAccounts.data);
        //List GTM Containers
        /*
        const listContainers = await gtm.accounts.containers.list({parent: 'accounts/3327262173'});
        console.log(listContainers.data);
//      const res =          await gtm.accounts.containers.versions.get({
        const listVersions = await gtm.accounts.containers.versions.get({
            containerVersionId: 'published',
            path:'accounts/3327262173/containers/11829158/versions/26'
        });
       console.log(listVersions.data);
         */
        //Sets latest version by creating a new version ID and restoring requested version to new version ID.
        /*
        const setLatest = await gtm.accounts.containers.versions.set_latest({
            path:'accounts/3327262173/containers/11829158/versions/26'
         });
        console.log('Set lastest GTM version to:');
        console.log(setLatest.data);
        */
        /*
                const res = await gtm.accounts.containers.workspaces.create({
                 // GTM parent Container&#39;s API relative path. Example: accounts/{account_id\}/containers/{container_id\}
                 parent: 'accounts/my-account/containers/my-container',
                 // Request body metadata
                 requestBody: {
                   'accountId': 'my_accountId',
                   'containerId': 'my_containerId',
                   'description': 'my_description',
                   'fingerprint': 'my_fingerprint',
                   'name': 'cm-000-test',
                   'path': 'my_path',
                   'tagManagerUrl': 'my_tagManagerUrl',
                   'workspaceId': 'my_workspaceId'
                 },
        });
        console.log(res.data);
        */
        // Deletes Workspace
        /*
        const resDelete = await gtm.accounts.containers.workspaces.delete({
                // GTM Workspace&#39;s API relative path. Example: accounts/{account_id\}/containers/{container_id\}/workspaces/{workspace_id\}
                path: 'accounts/3327262173/containers/11829158/workspaces/58',
            });
            console.log(resDelete.data);
            */
        //  return null;
    }
    catch (err) {
        console.log(err);
    }
}
// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
    runSample();
}
// export functions for testing purposes
module.exports = runSample;
