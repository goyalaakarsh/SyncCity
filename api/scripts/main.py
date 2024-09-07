import os.path
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar']

def authenticate_google_account():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=39945)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    service = build('calendar', 'v3', credentials=creds)
    return service

def create_event(service):
    # Event details with Google Meet integration
    event = {
        'summary': 'Sample Event with Google Meet',
        'location': '123 Event St, City, Country',
        'description': 'A sample event created using Google Calendar API with Google Meet link',
        'start': {
            'dateTime': '2024-09-06T09:00:00+05:30',  # India timezone offset
            'timeZone': 'Asia/Kolkata',
        },
        'end': {
            'dateTime': '2024-09-06T17:00:00+05:30',
            'timeZone': 'Asia/Kolkata',
        },
        'attendees': [
            {'email': 'manav.22cse@bmu.edu.in'},
            {'email': 'sanskar.gupta.22cse@bmu.edu.in'},
        ],
        'conferenceData': {
            'createRequest': {
                'requestId': 'sample123',  # Random unique ID for the request
                'conferenceSolutionKey': {
                    'type': 'hangoutsMeet'  # Specify Google Meet as the conference solution
                }
            }
        },
        'reminders': {
            'useDefault': False,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},  # Send an email reminder 24 hours before
                {'method': 'popup', 'minutes': 10},      # Popup reminder 10 minutes before
            ],
        },
    }

    event = service.events().insert(calendarId='primary', body=event, conferenceDataVersion=1).execute()
    
    print('Event created: %s' % (event.get('htmlLink')))
    # Extract the Google Meet link from the event data
    meet_link = event['conferenceData']['entryPoints'][0]['uri']
    print('Google Meet Link: %s' % meet_link)
    
    
def main():
    service = authenticate_google_account()
    create_event(service)
    
    
main()
  