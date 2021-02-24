import * as dotenv from 'dotenv';
const {google} = require('googleapis');
const gtm = google.tagmanager('v2');

dotenv.config();

const gtmAcctID = process.env.GTM_ACCOUNT_ID;

interface tagAuthDetails {
  workspaceNumber: number,
  containerId: number
}


/*********************************Create UA Tags**************************************/

//Tag functions only include pageview and event tags. There are also transaction, social, timing decorate link/form track types which have been omitted since we currently do not use these track types.

// PAGEVIEW TAG
export async function uaPageviewTag(obj:tagAuthDetails, tagName: string, trackType: string, optionType: string, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null,   doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

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
    tagFiringOption: tagFiringOption,
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

//EVENT TAG
export async function uaEventTag(obj:tagAuthDetails, tagName: string, trackType: string, optionType: string, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null, doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const eventParam = [
    { type: 'template', key: 'trackType', value: 'TRACK_EVENT' },
    { type: 'template', key: 'eventCategory', value: eventCategory },
    { type: 'template', key: 'eventAction', value: eventAction },
    { type: 'template', key: 'eventLabel', value: eventLabel },
    { type: 'template', key: 'eventValue', value: eventValue },
    { type: 'boolean', key: 'nonInteraction', value: nonInteraction },
    { type: 'boolean', key: 'overrideGaSettings', value: 'false' },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
  ];

  const eventOverride = [
    { type: 'template', key: 'trackType', value: 'TRACK_EVENT' },
    { type: 'template', key: 'eventCategory', value: eventCategory },
    { type: 'template', key: 'eventAction', value: eventAction },
    { type: 'template', key: 'eventLabel', value: eventLabel },
    { type: 'template', key: 'eventValue', value: eventValue },
    { type: 'boolean', key: 'nonInteraction', value: nonInteraction },
    { type: 'boolean', key: 'overrideGaSettings', value: 'true' },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
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
 
  const param = optionType === 'standard' ? eventParam
  : optionType === 'override setting' ? eventOverride
  : new TypeError('Must provide optionType string of standard or override setting');

  
  const event = {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId, //array of trigger IDs

    blockingTriggerId: blockingTriggerId, //array of trigger IDs
    tagFiringOption: tagFiringOption, //oncePerEvent, unlimited, oncePerLoad
    monitoringMetadata: { type: 'map' }
  };

  const eventAdvanced = {
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
    tagFiringOption: tagFiringOption,
    monitoringMetadata:  monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  }

  const reqBody = trackType === 'event' ? event 
  : trackType === 'event advanced' ? eventAdvanced
  : null


  const res = await gtm.accounts.containers.workspaces.tags.create({
    parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}



/*********************************Create GA4 Tags**************************************/

//GA4 Config Tag
export async function ga4ConfigTag(obj:tagAuthDetails, tagName: string, trackType:string, measurementId: any, sendPageView: string, tagFiringOption: string, firingTriggerId: any[], blockingTriggerId?: any[], fieldsToSet?: any[] | null, userProperties?: any[] | null, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const ga4 =  {
    name: tagName,
    type: 'gaawc',
    parameter: [
      { type: 'list', key: 'fieldsToSet', list: fieldsToSet },
      { type: 'list', key: 'userProperties', list: userProperties },
      { type: 'boolean', key: 'sendPageView', value: sendPageView },
      { type: 'template', key: 'measurementId', value: measurementId }
    ],
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption
  }

  const ga4Advanced = {
    name: tagName,
    type: 'gaawc',
    parameter: [
      { type: 'list', key: 'fieldsToSet', list: fieldsToSet },
      { type: 'list', key: 'userProperties', list: userProperties },
      { type: 'boolean', key: 'sendPageView', value: sendPageView },
      { type: 'template', key: 'measurementId', value: measurementId }
    ],
    priority: { type: 'integer', value: priorityValue },
    setupTag: [ 
      { 
        tagName: setupTagName, 
        stopOnSetupFailure: setupTagStop 
      } 
    ],
    teardownTag: [
      {
        tagName: teardownTagName,
        stopTeardownOnFailure: teardownTagStop
      }
    ],
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  }

  const reqBody = trackType === 'standard' ? ga4 
  : trackType === 'advanced' ? ga4Advanced
  : null


  const res = await gtm.accounts.containers.workspaces.tags.create({
    parent:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}

//GA4 Event Tag
export async function ga4EventTag(obj:tagAuthDetails, tagName: string, trackType:string, measurementId: any, eventName: string, eventParameters: any | null, userProperties: any | null, tagFiringOption: string, firingTriggerId: any[], blockingTriggerId?: any[],  setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const ga4 =  {
    name: tagName,
    type: 'gaawe',
    parameter: [
    { type: 'tagReference', key: 'measurementId', value: measurementId },
    { type: 'template', key: 'eventName', value: eventName },
    { type: 'list', key: 'eventParameters', list: eventParameters },
    { type: 'list', key: 'userProperties', list: userProperties }
  ],
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption
  }

  const ga4Advanced = {
    name: tagName,
    type: 'gaawe',
    parameter: [
      { type: 'tagReference', key: 'measurementId', value: measurementId },
      { type: 'template', key: 'eventName', value: eventName },
      { type: 'list', key: 'eventParameters', list: eventParameters },
      { type: 'list', key: 'userProperties', list: userProperties }
    ],
    priority: { type: 'integer', value: priorityValue },
    setupTag: [ 
      { 
        tagName: setupTagName, 
        stopOnSetupFailure: setupTagStop 
      } 
    ],
    teardownTag: [
      {
        tagName: teardownTagName,
        stopTeardownOnFailure: teardownTagStop
      }
    ],
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  }

  const reqBody = trackType === 'standard' ? ga4 
  : trackType === 'advanced' ? ga4Advanced
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
  console.log(res.data.parameter.find((id: any) => id.list).list.find((id: any) => id.map));
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