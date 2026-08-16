/**
 * XpertPoint Solutions · AI T.H.I.N.K. vote collector
 * 1. Create a Google Sheet and copy its ID into SHEET_ID.
 * 2. In Apps Script, deploy this project as a Web app.
 * 3. Execute as you and allow anonymous access.
 */
const SHEET_ID = '166XOevyJttoQlQbLqqmT3e30nk_2kCIJyxxKP6-9O0U';
const SHEET_NAME = 'Votes';

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:'AI T.H.I.N.K. votes'})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME) || SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(['timestamp','idea','rating','name','email','message','page']);
  const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  sheet.appendRow([new Date(), data.idea || '', data.valor || data.rating || '', data.nombre || '', data.email || '', data.mensaje || '', data.page || '']);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}
