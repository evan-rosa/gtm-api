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
exports.revertTag = exports.deleteTag = exports.getTag = exports.listTags = void 0;
const dotenv = __importStar(require("dotenv"));
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
dotenv.config();
const gtmAcctID = process.env.GTM_ACCOUNT_ID;
/*********************************Create Tags**************************************/
/*********************************List Tags**************************************/
async function listTags(obj) {
    const res = await gtm.accounts.containers.workspaces.tags.list({
        parent: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}`,
    });
    console.log(res.data);
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
    console.log(res.data.filter.find((id) => id.parameter));
    console.log('***********************************************');
    console.log(res.data.parameter.find((id) => id.list));
    console.log('***********************************************');
}
exports.getTag = getTag;
/*********************************Delete Tags**************************************/
async function deleteTag(obj, tagId) {
    const res = await gtm.accounts.containers.workspaces.tags.delete({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
    });
    console.log('***********************************************');
    console.log(res.data);
    console.log('***********************************************');
}
exports.deleteTag = deleteTag;
/*********************************Revert Tag**************************************/
async function revertTag(obj, tagId) {
    const res = await gtm.accounts.containers.workspaces.tags.revert({
        path: 'accounts/' + gtmAcctID + '/containers/' + obj.containerId + '/workspaces/' + `${obj.workspaceNumber}` + '/tags/' + tagId,
    });
    console.log(res.data);
}
exports.revertTag = revertTag;
