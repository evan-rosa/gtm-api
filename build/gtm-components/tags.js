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
exports.revertTag = exports.deleteTag = exports.getTag = exports.listTags = exports.uaTag = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create Tags**************************************/
async function uaTag(obj, tagName, trackType, optionType, firingTriggerId, blockingTriggerId, tagFiringOption, fieldsToSet, dimension, metric, contentGroup, doubleClick, autoLinkDomains, useHashAutoLink, decorateFormsAutoLink, useDebugVersion, enableLinkId, tagFiringPriority, setupTagName, setupTagStop, teardownTagName, teardownTagStop, monitoringMetadataTagNameKey, monitoringMetadata) {
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
        setupTag: [{ tagName: setupTagName, stopOnSetupFailure: setupTagStop }],
        teardownTag: [
            {
                tagName: teardownTagName,
                stopTeardownOnFailure: teardownTagStop
            }
        ],
        tagFiringOption: 'oncePerEvent',
        monitoringMetadata: monitoringMetadata,
        monitoringMetadataTagNameKey: monitoringMetadataTagNameKey
    };
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
exports.uaTag = uaTag;
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
    console.log(res.data.monitoringMetadata);
    console.log('***********************************************');
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
