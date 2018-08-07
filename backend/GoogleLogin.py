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
SCOPES = ['https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/plus.me',
          'https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/drive.metadata.readonly']
API_SERVICE_NAME = 'calendar'
API_VERSION = 'v3'


app = Flask(__name__, static_folder='../frontend/dist', template_folder='../frontend')
CORS(app)

app.secret_key = 'qj5fJViZ5DrW0-ShAnNsihAu'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<path:path>')
def catch_all(path):
    if path == 'matrix':
        return render_template('index.html')
    elif path == 'topics':
        return render_template('index.html')
    else:
        return path


@app.route('/calendar')
def calendar():
    return render_template('app.html')


@app.route('/authorize',  methods=['GET'])
def authorize():
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


@app.route('/getData')
def test_api_request():
    if 'credentials' not in session:
        return redirect('authorize')
    events_result = get_event()
    events = events_result.get('items', {})
    t = getData.getData(events)
    return jsonify(**t)


@app.route('/sendData',  methods=['POST'])
def postdata():
    if 'credentials' not in session:
        return redirect('authorize')
    data = request.form['input']
    eventid = request.form['eventId']
    operation = request.form['operation']
    o = patch_event(data, eventid, operation)
    return jsonify(**o)


@app.route('/matrixCal',  methods=['POST'])
def calculate():
    data = request.form
    m1 = []
    m2 = []
    m = []
    k = []
    n = []
    b = []
    for key in data:
        if key[6:7] == 'A':
            try:
                if int(key[9:10]) == 0:
                    m1 += [n]
                    n = []
                    if len(m) == t:
                        m1 += [m]
                    m = []
                    m += [int(data[key])]
                else:
                    m += [int(data[key])]
            except ValueError:
                n += [int(data[key])]
                t = len(n)
        else:
            try:
                if int(key[9:10]) == 0:
                    m2 += [b]
                    b = []
                    if len(k) == a:
                        m2 += [k]
                    k = []
                    k += [int(data[key])]
                else:
                    k += [int(data[key])]
            except ValueError:
                b += [int(data[key])]
                a = len(b)
    m1 += [m]
    m2 += [k]
    boxes1 = [x for x in m1 if x]
    boxes2 = [x for x in m2 if x]
    u = [[0 for x in range(len(boxes1))] for y in range(len(boxes2[1]))]
    for i in range(0, len(boxes1)):
        for j in range(0, len(boxes2[1])):
            for o in range(0, len(boxes2)):
                u[i][j] += (boxes1[i][o] * boxes2[o][j])
    return jsonify(u)


def credentials_to_dict(credentials):
    return {'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes}


def patch_event(data, eventid, operation):
    if operation == 'summary':
        credentials = google.oauth2.credentials.Credentials(
            **session['credentials'])

        a = client_lib(credentials).events().patch(calendarId='pdpmalware@gmail.com',
                                                   eventId=eventid,
                                                   body={operation: data}).execute()
    else:
        credentials = google.oauth2.credentials.Credentials(
            **session['credentials'])

        a = client_lib(credentials).events().patch(calendarId='pdpmalware@gmail.com',
                                                   eventId=eventid,
                                                   body={operation: {
                                                       "dateTime": data
                                                   }}).execute()
    return a


def get_event():
    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time

    events_result = client_lib(credentials).events().list(calendarId='primary', timeMin=now,
                                                         maxResults=20, singleEvents=True,
                                                         orderBy='startTime').execute()
    session['credentials'] = credentials_to_dict(credentials)
    return events_result


def client_lib(credentials):
    return googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)





if __name__ == '__main__':
    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    app.run('localhost', 8080, debug=True)

