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
export async function uaPageviewTag(obj:tagAuthDetails, tagName: string, trackType: string, optionType: string, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null, doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const pageviewParam = uaPageviewParam();

  const pageviewOverride = uaPageviewOverrideSetting(fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId);
 
  const param = optionType === 'standard' ? pageviewParam
  : optionType === 'override setting' ? pageviewOverride
  : new TypeError('Must provide optionType string of standard or override setting');

  const pageview = uaPageviewStandard(tagName, param, firingTriggerId, blockingTriggerId, tagFiringOption);

  const pageviewAdvanced = uaPageviewAdvancedSetting(tagName, param, tagFiringPriority, firingTriggerId, blockingTriggerId, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey)

  setupBool === true ? Object.assign(pageviewAdvanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(pageviewAdvanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

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

function uaPageviewAdvancedSetting(tagName: string, param: { type: string; key: string; value: string; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, tagFiringPriority: string | undefined, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    priority: { type: 'integer', value: tagFiringPriority },

    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,

    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  };
}

function uaPageviewStandard(tagName: string, param: { type: string; key: string; value: string; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId,

    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: { type: 'map' }
  };
}

function uaPageviewOverrideSetting(fieldsToSet: any[] | null | undefined, dimension: any[] | null | undefined, metric: any[] | null | undefined, contentGroup: any[] | null | undefined, doubleClick: string | null | undefined, autoLinkDomains: string | null | undefined, useHashAutoLink: string | null | undefined, decorateFormsAutoLink: string | null | undefined, useDebugVersion: string | null | undefined, enableLinkId: string | null | undefined) {
  return [
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
    { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
    { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
  ];
}

function uaPageviewParam() {
  return [
    { type: 'template', key: 'trackType', value: 'TRACK_PAGEVIEW' },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
    { type: 'boolean', key: 'overrideGaSettings', value: 'false' }
  ];
}
//END PAGEVIEW TAG

//EVENT TAG
export async function uaEventTag(obj:tagAuthDetails, tagName: string, trackType: string, optionType: string, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null, doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const eventParam = uaEventParam(eventCategory, eventAction, eventLabel, eventValue, nonInteraction);

  const eventOverride = uaEventOverrideSetting(eventCategory, eventAction, eventLabel, eventValue, nonInteraction, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId);
 
  const param = optionType === 'standard' ? eventParam
  : optionType === 'override setting' ? eventOverride
  : new TypeError('Must provide optionType string of standard or override setting');
  
  const event = uaEventStandard(tagName, param, firingTriggerId, blockingTriggerId, tagFiringOption);

  const eventAdvanced = uaEventAdvancedSetting(tagName, param, tagFiringPriority, firingTriggerId, blockingTriggerId, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey)

  setupBool === true ? Object.assign(eventAdvanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(eventAdvanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

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



function uaEventAdvancedSetting(tagName: string, param: TypeError | { type: string; key: string; value: string | null; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[], tagFiringPriority: string | undefined, firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    priority: { type: 'integer', value: tagFiringPriority },

    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  };
}

function uaEventStandard(tagName: string, param: TypeError | { type: string; key: string; value: string | null; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[], firingTriggerId: any[], blockingTriggerId: any[], tagFiringOption: string) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId,

    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: { type: 'map' }
  };
}

function uaEventOverrideSetting(eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string, fieldsToSet: any[] | null | undefined, dimension: any[] | null | undefined, metric: any[] | null | undefined, contentGroup: any[] | null | undefined, doubleClick: string | null | undefined, autoLinkDomains: string | null | undefined, useHashAutoLink: string | null | undefined, decorateFormsAutoLink: string | null | undefined, useDebugVersion: string | null | undefined, enableLinkId: string | null | undefined) {
  return [
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
    { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
    { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
  ];
}

function uaEventParam(eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string) {
  return [
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
}
//END EVENT TAG

/*********************************Create GA4 Tags**************************************/

//GA4 Config Tag
export async function ga4ConfigTag(obj:tagAuthDetails, tagName: string, trackType:string, measurementId: any, sendPageView: string, tagFiringOption: string, firingTriggerId: any[], blockingTriggerId?: any[], fieldsToSet?: any[] | null, userProperties?: any[] | null, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const ga4 =  ga4ConfigStandard(tagName, fieldsToSet, userProperties, sendPageView, measurementId, firingTriggerId, blockingTriggerId, tagFiringOption)

  const ga4Advanced = ga4ConfigAdvancedSetting(tagName, fieldsToSet, userProperties, sendPageView, measurementId, priorityValue, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey, firingTriggerId, blockingTriggerId)

  setupBool === true ? Object.assign(ga4Advanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(ga4Advanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

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

function ga4ConfigAdvancedSetting(tagName: string, fieldsToSet: any[] | null | undefined, userProperties: any[] | null | undefined, sendPageView: string, measurementId: any, priorityValue: string | undefined, tagFiringOption: string, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined, firingTriggerId: any[], blockingTriggerId: any[] | undefined) {
  return {
    name: tagName,
    type: 'gaawc',
    parameter: [
      { type: 'list', key: 'fieldsToSet', list: fieldsToSet },
      { type: 'list', key: 'userProperties', list: userProperties },
      { type: 'boolean', key: 'sendPageView', value: sendPageView },
      { type: 'template', key: 'measurementId', value: measurementId }
    ],
    priority: { type: 'integer', value: priorityValue },
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  };
}

function ga4ConfigStandard(tagName: string, fieldsToSet: any[] | null | undefined, userProperties: any[] | null | undefined, sendPageView: string, measurementId: any, firingTriggerId: any[], blockingTriggerId: any[] | undefined, tagFiringOption: string) {
  return {
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
  };
}
//End GA4 Config Tag

//GA4 Event Tag
export async function ga4EventTag(obj:tagAuthDetails, tagName: string, trackType:string, measurementId: any, eventName: string, eventParameters: any | null, userProperties: any | null, tagFiringOption: string, firingTriggerId: any[], blockingTriggerId?: any[], setupBool?: boolean, teardownBool?: boolean, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const ga4 =  ga4EventStandard(tagName, measurementId, eventName, eventParameters, userProperties, firingTriggerId, blockingTriggerId, tagFiringOption)

  const ga4Advanced = ga4EventAdvancedSetting(tagName, measurementId, eventName, eventParameters, userProperties, priorityValue, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey, firingTriggerId, blockingTriggerId)

  setupBool === true ? Object.assign(ga4Advanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(ga4Advanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

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

function ga4EventAdvancedSetting(tagName: string, measurementId: any, eventName: string, eventParameters: any, userProperties: any, priorityValue: string | undefined, tagFiringOption: string, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined, firingTriggerId: any[], blockingTriggerId: any[] | undefined) {
  return {
    name: tagName,
    type: 'gaawe',
    parameter: [
      { type: 'tagReference', key: 'measurementId', value: measurementId },
      { type: 'template', key: 'eventName', value: eventName },
      { type: 'list', key: 'eventParameters', list: eventParameters },
      { type: 'list', key: 'userProperties', list: userProperties }
    ],
    priority: { type: 'integer', value: priorityValue },
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  };
}

function ga4EventStandard(tagName: string, measurementId: any, eventName: string, eventParameters: any, userProperties: any, firingTriggerId: any[], blockingTriggerId: any[] | undefined, tagFiringOption: string) {
  return {
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
  };
}
//END GA4 Event Tag

/*********************************Update Tags**************************************/

//Update UA Pageview
export async function uaUpdatePageviewTag(obj:tagAuthDetails, tagId: number, tagName: string, advancedSetting: boolean, overrideSetting: boolean, firingTriggerId: any[], blockingTriggerId?: any[] | null, tagFiringOption?: string, fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null, doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupBool?: any, teardownBool?: any, setupTagName?: string | null, setupTagStop?: boolean, teardownTagName?: string | null, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string | null,monitoringMetadata?: any){

  const pageviewParam = updatePageviewParam();

  const pageviewOverride = updatePageviewOverrideSetting(fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId);
 
  const param = overrideSetting === false ? pageviewParam
  : overrideSetting === true ? pageviewOverride
  : new TypeError('Must provide optionType string of standard or override setting');

  
  const pageview = updatePageviewStandard(tagName, param, firingTriggerId, blockingTriggerId, tagFiringOption);

  const pageviewAdvanced = updatePageviewAdvancedSetting(tagName, param, tagFiringPriority, firingTriggerId, blockingTriggerId, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey)

  setupBool === true ? Object.assign(pageviewAdvanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(pageviewAdvanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

  const reqBody = advancedSetting === false ? pageview 
  : advancedSetting === true ? pageviewAdvanced
  : null

  const res = await gtm.accounts.containers.workspaces.tags.update({
    path:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`  + '/tags/' + tagId,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}

function updatePageviewAdvancedSetting(tagName: string, param: { type: string; key: string; value: string; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, tagFiringPriority: string | undefined, firingTriggerId: any[], blockingTriggerId: any[] | null | undefined, tagFiringOption: string | undefined, monitoringMetadata: any, monitoringMetadataTagNameKey: string | null | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    priority: { type: 'integer', value: tagFiringPriority },

    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  };
}

function updatePageviewStandard(tagName: string, param: { type: string; key: string; value: string; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, firingTriggerId: any[], blockingTriggerId: any[] | null | undefined, tagFiringOption: string | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: { type: 'map' }
  };
}

function updatePageviewOverrideSetting(fieldsToSet: any[] | null | undefined, dimension: any[] | null | undefined, metric: any[] | null | undefined, contentGroup: any[] | null | undefined, doubleClick: string | null | undefined, autoLinkDomains: string | null | undefined, useHashAutoLink: string | null | undefined, decorateFormsAutoLink: string | null | undefined, useDebugVersion: string | null | undefined, enableLinkId: string | null | undefined) {
  return [
    {
      type: 'template',
      key: 'trackType',
      value: 'TRACK_PAGEVIEW'
    },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
    {
      type: 'boolean',
      key: 'overrideGaSettings',
      value: 'true'
    },
    {
      type: 'list',
      key: 'fieldsToSet',
      list: fieldsToSet
    },
    {
      type: 'list',
      key: 'dimension',
      list: dimension
    },
    {
      type: 'list',
      key: 'metric',
      list: metric
    },
    {
      type: 'list',
      key: 'contentGroup',
      list: contentGroup
    },
    {
      type: 'boolean',
      key: 'doubleClick',
      value: doubleClick
    },
    {
      type: 'template',
      key: 'autoLinkDomains',
      value: autoLinkDomains
    },
    {
      type: 'boolean',
      key: 'useHashAutoLink',
      value: useHashAutoLink
    },
    {
      type: 'boolean',
      key: 'decorateFormsAutoLink',
      value: decorateFormsAutoLink
    },
    {
      type: 'boolean',
      key: 'useDebugVersion',
      value: useDebugVersion
    },
    {
      type: 'boolean',
      key: 'enableLinkId',
      value: enableLinkId
    }
  ];
}

function updatePageviewParam() {
  return [
    {
      type: 'template',
      key: 'trackType',
      value: 'TRACK_PAGEVIEW'
    },
    {
      type: 'template',
      key: 'gaSettings',
      value: '{{UA - Settings - All - Generic}}'
    },
    {
      type: 'boolean',
      key: 'overrideGaSettings',
      value: 'false'
    }
  ];
}
//END Update UA Pageview


//Update Event Tags
export async function uaUpdateEventTag(obj:tagAuthDetails, tagId: number, tagName: string, advancedSetting: boolean, overrideSetting: boolean, eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string, firingTriggerId: any[], blockingTriggerId?: any[], tagFiringOption?: string,fieldsToSet?: any[] | null, dimension?: any[] | null, metric?: any[] | null, contentGroup?: any[] | null, doubleClick?: string | null, autoLinkDomains?: string | null, useHashAutoLink?: string | null, decorateFormsAutoLink?: string | null, useDebugVersion?: string | null, enableLinkId?: string | null, tagFiringPriority?: string, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string, setupTagStop?: boolean, teardownTagName?: string, teardownTagStop?: boolean,  monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const eventParam = updateEventParam(eventCategory, eventAction, eventLabel, eventValue, nonInteraction);

  const eventOverride = updateEventOverrideSetting(eventCategory, eventAction, eventLabel, eventValue, nonInteraction, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId);
 
  const param = overrideSetting === false ? eventParam
  : overrideSetting === true ? eventOverride
  : new TypeError('Must provide optionType string of standard or override setting');

  const event = updateEventStandard(tagName, param, firingTriggerId, blockingTriggerId, tagFiringOption);

  const eventAdvanced = updateEventAdvancedSetting(tagName, param, tagFiringPriority, firingTriggerId, blockingTriggerId, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey)

  setupBool === true ? Object.assign(eventAdvanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(eventAdvanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

  const reqBody = advancedSetting === false ? event 
  : advancedSetting === true ? eventAdvanced
  : null


  const res = await gtm.accounts.containers.workspaces.tags.update({
    path:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`  + '/tags/' + tagId,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}


function updateEventAdvancedSetting(tagName: string, param: { type: string; key: string; value: string | null; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, tagFiringPriority: string | undefined, firingTriggerId: any[], blockingTriggerId: any[] | undefined, tagFiringOption: string | undefined, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    priority: { type: 'integer', value: tagFiringPriority },

    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId,

    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
  };
}

function updateEventStandard(tagName: string, param: { type: string; key: string; value: string | null; }[] | ({ type: string; key: string; list: any[] | null | undefined; value?: undefined; } | { type: string; key: string; value: string | null | undefined; list?: undefined; })[] | TypeError, firingTriggerId: any[], blockingTriggerId: any[] | undefined, tagFiringOption: string | undefined) {
  return {
    name: tagName,
    type: 'ua',
    parameter: param,
    firingTriggerId: firingTriggerId,

    blockingTriggerId: blockingTriggerId,
    tagFiringOption: tagFiringOption,
    monitoringMetadata: { type: 'map' }
  };
}

function updateEventOverrideSetting(eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string, fieldsToSet: any[] | null | undefined, dimension: any[] | null | undefined, metric: any[] | null | undefined, contentGroup: any[] | null | undefined, doubleClick: string | null | undefined, autoLinkDomains: string | null | undefined, useHashAutoLink: string | null | undefined, decorateFormsAutoLink: string | null | undefined, useDebugVersion: string | null | undefined, enableLinkId: string | null | undefined) {
  return [
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
    { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
    { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
  ];
}

function updateEventParam(eventCategory: string, eventAction: string, eventLabel: string, eventValue: string | null, nonInteraction: string) {
  return [
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
}
//End Update Event Tags

/*********************************Create GA4 Tags**************************************/

//GA4 Config Tag
export async function ga4UpdateConfigTag(obj:tagAuthDetails, tagId: number, tagName: string, advancedSetting:string, measurementId: any, sendPageView: string, firingTriggerId: any[], blockingTriggerId?: any[] | null, tagFiringOption?: string, fieldsToSet?: any[] | null, userProperties?: any[] | null, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string | null, setupTagStop?: boolean, teardownTagName?: string | null, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string | null,monitoringMetadata?: any | null){

  const ga4 =  updateGA4Config(tagName, fieldsToSet, userProperties, sendPageView, measurementId, firingTriggerId, blockingTriggerId, tagFiringOption)

  const ga4Advanced = updateGA4ConfigAdvancedSetting(tagName, fieldsToSet, userProperties, sendPageView, measurementId, priorityValue, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey, firingTriggerId, blockingTriggerId)

  setupBool === true ? Object.assign(ga4Advanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(ga4Advanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

  const reqBody = advancedSetting === 'standard' ? ga4 
  : advancedSetting === 'advanced' ? ga4Advanced
  : null

  const res = await gtm.accounts.containers.workspaces.tags.update({
    path:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`  + '/tags/' + tagId,
    requestBody: reqBody
  });
  console.log(res.data);
  return res.data.tag
}

function updateGA4ConfigAdvancedSetting(tagName: string, fieldsToSet: any[] | null | undefined, userProperties: any[] | null | undefined, sendPageView: string, measurementId: any, priorityValue: string | undefined, tagFiringOption: string | undefined, monitoringMetadata: any, monitoringMetadataTagNameKey: string | null | undefined, firingTriggerId: any[], blockingTriggerId: any[] | null | undefined) {
  return {
    name: tagName,
    type: 'gaawc',
    parameter: [
      { type: 'list', key: 'fieldsToSet', list: fieldsToSet },
      { type: 'list', key: 'userProperties', list: userProperties },
      { type: 'boolean', key: 'sendPageView', value: sendPageView },
      { type: 'template', key: 'measurementId', value: measurementId }
    ],
    priority: { type: 'integer', value: priorityValue },
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  };
}

function updateGA4Config(tagName: string, fieldsToSet: any[] | null | undefined, userProperties: any[] | null | undefined, sendPageView: string, measurementId: any, firingTriggerId: any[], blockingTriggerId: any[] | null | undefined, tagFiringOption: string | undefined) {
  return {
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
  };
}
//END GA4 Config Tag

//GA4 Event Tag
export async function ga4UpdateEventTag(obj:tagAuthDetails, tagId: number, tagName: string, advancedSetting:boolean, measurementId: any, eventName: string, eventParameters: any | null, userProperties: any | null, firingTriggerId: any[], blockingTriggerId?: any[], tagFiringOption?: string, setupBool?: boolean, teardownBool?: boolean, setupTagName?: string | null, setupTagStop?: boolean, teardownTagName?: string | null, teardownTagStop?: boolean, priorityValue?: string, monitoringMetadataTagNameKey?: string,monitoringMetadata?: any){

  const ga4 =  updateGA4Event(tagName, measurementId, eventName, eventParameters, userProperties, firingTriggerId, blockingTriggerId, tagFiringOption)

  const ga4Advanced = updateGA4AdvancedSetting(tagName, measurementId, eventName, eventParameters, userProperties, priorityValue, tagFiringOption, monitoringMetadata, monitoringMetadataTagNameKey, firingTriggerId, blockingTriggerId)

  setupBool === true ? Object.assign(ga4Advanced, {setupTag: [ { tagName: setupTagName, stopOnSetupFailure: setupTagStop } ]}): null;

  teardownBool === true ? Object.assign(ga4Advanced,{teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop}]}) : null;

  const reqBody = advancedSetting === false ? ga4 
  : advancedSetting === true ? ga4Advanced
  : null

  const res = await gtm.accounts.containers.workspaces.tags.update({
    path:'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`  + '/tags/' + tagId,
    requestBody: reqBody
  });

  console.log(res.data);
  return res.data.tag
}

function updateGA4AdvancedSetting(tagName: string, measurementId: any, eventName: string, eventParameters: any, userProperties: any, priorityValue: string | undefined, tagFiringOption: string | undefined, monitoringMetadata: any, monitoringMetadataTagNameKey: string | undefined, firingTriggerId: any[], blockingTriggerId: any[] | undefined) {
  return {
    name: tagName,
    type: 'gaawe',
    parameter: [
      { type: 'tagReference', key: 'measurementId', value: measurementId },
      { type: 'template', key: 'eventName', value: eventName },
      { type: 'list', key: 'eventParameters', list: eventParameters },
      { type: 'list', key: 'userProperties', list: userProperties }
    ],
    priority: { type: 'integer', value: priorityValue },
    tagFiringOption: tagFiringOption,
    monitoringMetadata: monitoringMetadata,
    monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
    firingTriggerId: firingTriggerId,
    blockingTriggerId: blockingTriggerId
  };
}

function updateGA4Event(tagName: string, measurementId: any, eventName: string, eventParameters: any, userProperties: any, firingTriggerId: any[], blockingTriggerId: any[] | undefined, tagFiringOption: string | undefined) {
  return {
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
  };
}
//END GA4 Event Tag

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
 /*  console.log(res.data.parameter.find((id: any) => id.list).list.find((id: any) => id.map));
  console.log('***********************************************'); */

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