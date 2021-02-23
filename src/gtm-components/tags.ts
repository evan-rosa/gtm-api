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
export async function uaTag(obj:tagAuthDetails, tagName: string, trackType: string, optionType: string, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null,   doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const pageviewParam = [
    { type: 'template', key: 'trackType', value: 'TRACK_PAGEVIEW' },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
    { type: 'boolean', key: 'overrideGaSettings', value: 'false' }
  ];

  const pageviewOverride = [
    { type: 'template', key: 'trackType', value: 'TRACK_PAGEVIEW' },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
    { type: 'boolean', key: 'overrideGaSettings', value: 'true' },
    { type: 'list', key: 'fieldsToSet', list: fieldsToSet },
    { type: 'list', key: 'dimension', list: dimension },
    { type: 'list', key: 'metric', list: metric },
    { type: 'list', key: 'contentGroup', list: contentGroup },
    { type: 'boolean', key: 'doubleClick', value: doubleClick },
    {
      type: 'template',
      key: 'autoLinkDomains',
      value: autoLinkDomains
    },
    { type: 'boolean', key: 'useHashAutoLink', value: useHashAutoLink },
    { type: 'boolean', key: 'decorateFormsAutoLink', value: decorateFormsAutoLink },
    { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion},
    { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
  ];
 
  const param = optionType === 'standard' ? pageviewParam
  : optionType === 'override setting' ? pageviewOverride
  : new TypeError('Must provide optionType string of standard or override setting');

  
  const pageview = {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId, //array of trigger IDs

    blockingTriggerId: blockingTriggerId, //array of trigger IDs
    tagFiringOption: tagFiringOption, //oncePerEvent, unlimited, oncePerLoad
    monitoringMetadata: { type: 'map' }
  };

  const pageviewAdvanced = {
    name: tagName,
    type: 'ua',
    parameter: param,
    priority: { type: 'integer', value: tagFiringPriority },

    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ],
    teardownTag: [
      {
        tagName: teardownTagName,
        stopTeardownOnFailure: teardownTagStop
      }
    ],
    tagFiringOption: 'oncePerEvent',
    monitoringMetadata:  monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  }



  const reqBody = trackType === 'pageview' ? pageview 
  : trackType === 'pageview advanced' ? pageviewAdvanced
  : null


  const res = await gtm.accounts.containers.workspaces.tags.create({
    parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}





















/*********************************List Tags**************************************/

export async function listTags(obj:tagAuthDetails){
  const res = await gtm.accounts.containers.workspaces.tags.list({
    parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
  });
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
  console.log(res.data.monitoringMetadata);
  console.log('***********************************************');

}

/*********************************Delete Tags**************************************/
export async function deleteTag(obj: tagAuthDetails, tagId: number ){
  const res = await gtm.accounts.containers.workspaces.tags.delete({
    path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
  });

}

/*********************************Revert Tag**************************************/
export async function revertTag(obj:tagAuthDetails, tagId: number){
  const res = await gtm.accounts.containers.workspaces.tags.revert({
   path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
  });
}