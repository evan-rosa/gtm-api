import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;

interface tagAuthDetails {
  workspaceNumber: number,
  containerId: number
}

/*********************************Create Tags**************************************/


/*********************************List Tags**************************************/

export async function listTags(obj:tagAuthDetails){
  const res = await gtm.accounts.containers.workspaces.tags.list({
    parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
  });
  console.log(res.data);
  return res.data.tag
}


/*********************************Get Tags**************************************/
export async function getTag(obj: tagAuthDetails, tagId: number ){
  const res = await gtm.accounts.containers.workspaces.tags.get({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
  });
  
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
  console.log(res.data.filter.find((id: any) => id.parameter));
  console.log('***********************************************');  
  console.log(res.data.parameter.find((id: any) => id.list));
  console.log('***********************************************'); 
}

/*********************************Delete Tags**************************************/
export async function deleteTag(obj: tagAuthDetails, tagId: number ){
  const res = await gtm.accounts.containers.workspaces.tags.delete({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
  });
  console.log('***********************************************');
  console.log(res.data);
  console.log('***********************************************');
}

/*********************************Revert Tag**************************************/
export async function revertTag(obj:tagAuthDetails, tagId: number){
  const res = await gtm.accounts.containers.workspaces.tags.revert({
   path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
  });
  console.log(res.data);
}