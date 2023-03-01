import { google } from 'googleapis';
import config from '../../config';
import { OAuth2Client } from 'google-auth-library';

let oauth2ClientInstance : OAuth2Client ;

const oauth2Client = () => {
  if (!oauth2ClientInstance) {
    oauth2ClientInstance = new google.auth.OAuth2(
      config.GOOGLE_CLIENT_ID,
      config.GOOGLE_CLIENT_SECRET,
      config.GOOGLE_REDIRECT_URL
    );
  }

  return oauth2ClientInstance;
};

const scopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'];

const authorizationUrl = oauth2Client().generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

const generateGoogleAuthorizationUrl = () => {
  return authorizationUrl;
};

export default Object.freeze({
  generateGoogleAuthorizationUrl,
  oauth2Client,
});
