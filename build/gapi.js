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
    // Obtain user credentials to use for the request
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../client_secret.json'),
        scopes: scope,
    });
    google.options({ auth });
    const res = await gtm.accounts.containers.list({ parent: 'accounts/3327262173' });
    console.log(res.data);
    return res.data;
}
// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
    runSample();
}
// export functions for testing purposes
module.exports = runSample;
