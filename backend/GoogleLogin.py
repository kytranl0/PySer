import os
import requests
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
import datetime
import getData
from flask_cors import CORS
from flask import Flask, redirect, session, request, jsonify, url_for, render_template


CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/calendar']
API_SERVICE_NAME = 'calendar'
API_VERSION = 'v3'


app = Flask(__name__, static_folder='../frontend/dist', template_folder='../frontend')
CORS(app)

app.secret_key = 'qj5fJViZ5DrW0-ShAnNsihAu'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calendar')
def calendar():
    return render_template('app.html')


@app.route('/getData')
def test_api_request():
    if 'credentials' not in session:
        return redirect('authorize')

    # Load credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)

    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time

    events_result = drive.events().list(calendarId='primary', timeMin=now,
                                          maxResults=10, singleEvents=True,
                                          orderBy='startTime').execute()

    events = events_result.get('items', {})
    # files = drive.files().list().execute()

    # Save credentials back to session in case access token was refreshed.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    session['credentials'] = credentials_to_dict(credentials)
    t = getData.getData(events)

    return jsonify(**t)


@app.route('/authorize',  methods=['GET'])
def authorize():
    # Create flow instance to manage the OAuth 2.0 Authorization Grant Flow steps.
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES)

    flow.redirect_uri = url_for('oauth2callback', _external=True)

    authorization_url, state = flow.authorization_url(
        # Enable offline access so that you can refresh an access token without
        # re-prompting the user for permission. Recommended for web server apps.
        access_type='offline',
        # Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes='true')

    # Store the state so the callback can verify the auth server response.
    session['state'] = state

    return authorization_url


@app.route('/oauth2callback')
def oauth2callback():
    # Specify the state when creating the flow in the callback so that it can
    # verified in the authorization server response.
    state = session['state']

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
    flow.redirect_uri = url_for('oauth2callback', _external=True)

    # Use the authorization server's response to fetch the OAuth 2.0 tokens.
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)

    # Store credentials in the session.
    # ACTION ITEM: In a production app, you likely want to save these
    #              credentials in a persistent database instead.
    credentials = flow.credentials
    session['credentials'] = credentials_to_dict(credentials)

    return redirect(url_for('calendar'))


@app.route('/revoke')
def revoke():
    if 'credentials' not in session:
        return ('You need to <a href="/authorize">authorize</a> before ' +
                'testing the code to revoke credentials.')

    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    revoke = requests.post('https://accounts.google.com/o/oauth2/revoke',
                           params={'token': credentials.token},
                           headers = {'content-type': 'application/x-www-form-urlencoded'})

    status_code = getattr(revoke, 'status_code')
    if status_code == 200:
        return('Credentials successfully revoked.')
    else:
        return('An error occurred.')


@app.route('/clear')
def clear_credentials():
    if 'credentials' in session:
        del session['credentials']
    return ('Credentials have been cleared.<br><br>')


def credentials_to_dict(credentials):
    return {'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes}


if __name__ == '__main__':
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run('localhost', 8080, debug=True)

