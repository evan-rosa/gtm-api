"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listContainers = void 0;
const { google } = require('googleapis');
const gtm = google.tagmanager('v2');
async function listContainers(accountId) {
    const list = await gtm.accounts.containers.list({
        parent: 'accounts/' + accountId
    });
    return list.data.container;
}
exports.listContainers = listContainers;
