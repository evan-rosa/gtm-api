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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revertTag = exports.deleteTag = exports.getTag = exports.listTags = exports.ga4UpdateEventTag = exports.ga4UpdateConfigTag = exports.uaUpdateEventTag = exports.uaUpdatePageviewTag = exports.ga4EventTag = exports.ga4ConfigTag = exports.uaEventTag = exports.uaPageviewTag = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create UA Tags**************************************/
//Tag functions only include pageview and event tags. There are also transaction, social, timing decorate link/form track types which have been omitted since we currently do not use these track types.
// PAGEVIEW TAG
async function uaPageviewTag(obj, tagName, trackType, optionType, firingTriggerId, blockingTriggerId, tagFiringOption, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId, tagFiringPriority, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, monitoringMetadataTagNameKey, monitoringMetadata) {
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
        { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
        { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
    ];
    const param = optionType === 'standard' ? pageviewParam
        : optionType === 'override setting' ? pageviewOverride
            : new TypeError('Must provide optionType string of standard or override setting');
    const pageview = {
        name: tagName,
        type: 'ua',
        parameter: param,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId,
        tagFiringOption: tagFiringOption,
        monitoringMetadata: { type: 'map' }
    };
    const pageviewAdvanced = {
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
    setupBool === true ? Object.assign(pageviewAdvanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(pageviewAdvanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = trackType === 'pageview' ? pageview
        : trackType === 'pageview advanced' ? pageviewAdvanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.uaPageviewTag = uaPageviewTag;
//EVENT TAG
async function uaEventTag(obj, tagName, trackType, optionType, firingTriggerId, blockingTriggerId, tagFiringOption, eventCategory, eventAction, eventLabel, eventValue, nonInteraction, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId, tagFiringPriority, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, monitoringMetadataTagNameKey, monitoringMetadata) {
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
        { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
        { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
    ];
    const param = optionType === 'standard' ? eventParam
        : optionType === 'override setting' ? eventOverride
            : new TypeError('Must provide optionType string of standard or override setting');
    const event = {
        name: tagName,
        type: 'ua',
        parameter: param,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId,
        tagFiringOption: tagFiringOption,
        monitoringMetadata: { type: 'map' }
    };
    const eventAdvanced = {
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
    setupBool === true ? Object.assign(eventAdvanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(eventAdvanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = trackType === 'event' ? event
        : trackType === 'event advanced' ? eventAdvanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.uaEventTag = uaEventTag;
/*********************************Create GA4 Tags**************************************/
//GA4 Config Tag
async function ga4ConfigTag(obj, tagName, trackType, measurementId, sendPageView, tagFiringOption, firingTriggerId, blockingTriggerId, fieldsToSet, userProperties, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, priorityValue, monitoringMetadataTagNameKey, monitoringMetadata) {
    const ga4 = {
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
        tagFiringOption: tagFiringOption,
        monitoringMetadata: monitoringMetadata,
        monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId
    };
    setupBool === true ? Object.assign(ga4Advanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(ga4Advanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = trackType === 'standard' ? ga4
        : trackType === 'advanced' ? ga4Advanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.ga4ConfigTag = ga4ConfigTag;
//GA4 Event Tag
async function ga4EventTag(obj, tagName, trackType, measurementId, eventName, eventParameters, userProperties, tagFiringOption, firingTriggerId, blockingTriggerId, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, priorityValue, monitoringMetadataTagNameKey, monitoringMetadata) {
    const ga4 = {
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
        tagFiringOption: tagFiringOption,
        monitoringMetadata: monitoringMetadata,
        monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId
    };
    setupBool === true ? Object.assign(ga4Advanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(ga4Advanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = trackType === 'standard' ? ga4
        : trackType === 'advanced' ? ga4Advanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.create({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.ga4EventTag = ga4EventTag;
/*********************************Update Tags**************************************/
async function uaUpdatePageviewTag(obj, tagId, tagName, advancedSetting, overrideSetting, firingTriggerId, blockingTriggerId, tagFiringOption, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId, tagFiringPriority, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, monitoringMetadataTagNameKey, monitoringMetadata) {
    const pageviewParam = [
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
    const pageviewOverride = [
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
    const param = overrideSetting === false ? pageviewParam
        : overrideSetting === true ? pageviewOverride
            : new TypeError('Must provide optionType string of standard or override setting');
    const pageview = {
        name: tagName,
        type: 'ua',
        parameter: param,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId,
        tagFiringOption: tagFiringOption,
        monitoringMetadata: { type: 'map' }
    };
    const pageviewAdvanced = {
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
    setupBool === true ? Object.assign(pageviewAdvanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(pageviewAdvanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = advancedSetting === false ? pageview
        : advancedSetting === true ? pageviewAdvanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.update({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.uaUpdatePageviewTag = uaUpdatePageviewTag;
//Update Event Tags
async function uaUpdateEventTag(obj, tagId, tagName, advancedSetting, overrideSetting, eventCategory, eventAction, eventLabel, eventValue, nonInteraction, firingTriggerId, blockingTriggerId, tagFiringOption, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId, tagFiringPriority, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, monitoringMetadataTagNameKey, monitoringMetadata) {
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
        { type: 'boolean', key: 'useDebugVersion', value: useDebugVersion },
        { type: 'boolean', key: 'enableLinkId', value: enableLinkId }
    ];
    const param = overrideSetting === false ? eventParam
        : overrideSetting === true ? eventOverride
            : new TypeError('Must provide optionType string of standard or override setting');
    const event = {
        name: tagName,
        type: 'ua',
        parameter: param,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId,
        tagFiringOption: tagFiringOption,
        monitoringMetadata: { type: 'map' }
    };
    const eventAdvanced = {
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
    setupBool === true ? Object.assign(eventAdvanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(eventAdvanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = advancedSetting === false ? event
        : advancedSetting === true ? eventAdvanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.update({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.uaUpdateEventTag = uaUpdateEventTag;
/*********************************Create GA4 Tags**************************************/
//GA4 Config Tag
async function ga4UpdateConfigTag(obj, tagId, tagName, advancedSetting, measurementId, sendPageView, firingTriggerId, blockingTriggerId, tagFiringOption, fieldsToSet, userProperties, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, priorityValue, monitoringMetadataTagNameKey, monitoringMetadata) {
    const ga4 = {
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
        tagFiringOption: tagFiringOption,
        monitoringMetadata: monitoringMetadata,
        monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId
    };
    setupBool === true ? Object.assign(ga4Advanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(ga4Advanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = advancedSetting === 'standard' ? ga4
        : advancedSetting === 'advanced' ? ga4Advanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.update({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.ga4UpdateConfigTag = ga4UpdateConfigTag;
//GA4 Event Tag
async function ga4UpdateEventTag(obj, tagId, tagName, advancedSetting, measurementId, eventName, eventParameters, userProperties, firingTriggerId, blockingTriggerId, tagFiringOption, setupBool, teardownBool, setupTagName, setupTagStop, teardownTagName, teardownTagStop, priorityValue, monitoringMetadataTagNameKey, monitoringMetadata) {
    const ga4 = {
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
        tagFiringOption: tagFiringOption,
        monitoringMetadata: monitoringMetadata,
        monitoringMetadataTagNameKey: monitoringMetadataTagNameKey,
        firingTriggerId: firingTriggerId,
        blockingTriggerId: blockingTriggerId
    };
    setupBool === true ? Object.assign(ga4Advanced, { setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }] }) : null;
    teardownBool === true ? Object.assign(ga4Advanced, { teardownTag: [{ tagName: teardownTagName, stopTeardownOnFailure: teardownTagStop }] }) : null;
    const reqBody = advancedSetting === false ? ga4
        : advancedSetting === true ? ga4Advanced
            : null;
    const res = await gtm.accounts.containers.workspaces.tags.update({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
        requestBody: reqBody
    });
    console.log(res.data);
    return res.data.tag;
}
exports.ga4UpdateEventTag = ga4UpdateEventTag;
/*********************************List Tags**************************************/
async function listTags(obj) {
    const res = await gtm.accounts.containers.workspaces.tags.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    return res.data.tag;
}
exports.listTags = listTags;
/*********************************Get Tags**************************************/
async function getTag(obj, tagId) {
    const res = await gtm.accounts.containers.workspaces.tags.get({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
    });
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
    /*  console.log(res.data.parameter.find((id: any) => id.list).list.find((id: any) => id.map));
     console.log('***********************************************'); */
}
exports.getTag = getTag;
/*********************************Delete Tags**************************************/
async function deleteTag(obj, tagId) {
    const res = await gtm.accounts.containers.workspaces.tags.delete({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
    });
}
exports.deleteTag = deleteTag;
/*********************************Revert Tag**************************************/
async function revertTag(obj, tagId) {
    const res = await gtm.accounts.containers.workspaces.tags.revert({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
    });
}
exports.revertTag = revertTag;