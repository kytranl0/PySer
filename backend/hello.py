import random
import requests
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery
from flask import Flask, render_template
import flask

CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
API_SERVICE_NAME = 'drive'
API_VERSION = 'v2'


app = Flask(__name__, static_folder='../frontend/dist', template_folder='../frontend')

app.secret_key = 'qj5fJViZ5DrW0-ShAnNsihAu'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return get_hello()


@app.route('/test')
def test():
    return get_test()


def get_test():
    if 'credentials' not in flask.session:
        return flask.redirect('authorize')



def get_hello():
    greeting_list = ['Hi', 'Hello', 'Ciao', 'Salut', 'Hola']
    return random.choice(greeting_list)


if __name__ == '__main__':
    app.run()

