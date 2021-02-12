const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

export async function listContainers(accountId: number){
  const list = await gtm.accounts.containers.list({
    parent: 'accounts/' + accountId 
  });
 
  return list.data.container
}
