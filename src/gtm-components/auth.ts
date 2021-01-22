'use strict'

const {google} = require('googleapis');
const path = require('path');
const {authenticate} = require('@google-cloud/local-auth');


const scope = [
    'https://www.googleapis.com/auth/tagmanager.readonly',
    'https://www.googleapis.com/auth/tagmanager.manage.accounts',
    'https://www.googleapis.com/auth/tagmanager.edit.containers',
    'https://www.googleapis.com/auth/tagmanager.delete.containers',
    'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
    'https://www.googleapis.com/auth/tagmanager.manage.users',
    'https://www.googleapis.com/auth/tagmanager.publish'
]

export async function gtmAuthenticate() {
  try{
      // Obtain user credentials to use for the request
      const auth = await authenticate({
          keyfilePath: path.join(__dirname, '../../client_secret.json'),
          scopes: scope,
      });
      google.options({auth});
      

  } catch (err){
      console.log(err)
  }
}

