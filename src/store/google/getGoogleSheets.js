import {gapi} from 'gapi-script'

export const getGoogleSheets = () => {
  gapi.client.init({
    'apiKey': 'AIzaSyBvDzwZjxog8duOqKqNVe0l33JKkTqmkxY',
    'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  }).then(() => {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1_Nf24YfzlIOc34hiDK9wKCfL0TRC5L3SMCRCLZSc_bc',
      range: 'A1:F16', // for example: List 1!A1:B6
    }).then(res => {
      console.log(res)
    }).catch((err) => {
      console.log(err);
    });
  })
}