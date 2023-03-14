import { google } from 'googleapis';
import config from '../../config';
import { OAuth2Client } from 'google-auth-library';
import fetch from 'cross-fetch';
import { GoogleProfile, GoogleRegistration, UserView } from './definition';
import registrationService from '../registration/registration-service';
import auth from '../../util/auth';

let oauth2ClientInstance: OAuth2Client;

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

const scopes = 'https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile';

const authorizationUrl = oauth2Client().generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  include_granted_scopes: true,
});

const generateGoogleAuthorizationUrl = () => {
  return authorizationUrl;
};

const handleGoogleProfile = async (googleProfile: GoogleProfile) => {
  const result = await registrationService.registerWithGoogle(new GoogleRegistration(googleProfile));

  return { token: auth.signJWT({ id: result.id, ...new UserView(result) }) };
};

const getGoogleProfile = async (accessToken: string): Promise<GoogleProfile> => {
  const headers = { Authorization: `Bearer ${accessToken}` };
  const scopesAsString = scopes;

  const result = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?scope=${scopesAsString}`, { headers });

  if (result.status >= 400) {
    throw Error('Error Retrieving Google Profile');
  }

  return result.json();
};

export default Object.freeze({
  generateGoogleAuthorizationUrl,
  oauth2Client,
  handleGoogleProfile,
  getGoogleProfile,
});
