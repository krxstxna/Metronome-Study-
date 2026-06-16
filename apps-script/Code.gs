/**
 * Metronome & Memory Study — Google Sheets backend
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Extensions → Apps Script → paste this file
 * 3. Set SHEET_NAME below if your tab is not "Sheet1"
 * 4. Run setupSheet() once from the editor (authorize when prompted)
 * 5. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the /exec URL into index.html → APPS_SCRIPT_URL
 */

const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'timestamp',
  'consent',
  'condition',
  'age',
  'sex',
  'languages',
  'screening',
  'screeningDetail',
  'medication',
  'goldMSI',
  'recalledWords',
  'recallScore',
  'recallTime',
  'digitSpanScore',
  'digitSpanResults',
  'noticedSound',
  'soundDescription',
  'soundHelped',
  'soundNoEffect',
  'soundDistracted',
  'concentrationRating',
  'environmentDistraction',
  'distractionDetail'
];

function setupSheet() {
  const sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST body received');
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.consent || '',
      data.condition || '',
      data.age || '',
      data.sex || '',
      data.languages || '',
      data.screening || '',
      data.screeningDetail || '',
      data.medication || '',
      data.goldMSI || '',
      data.recalledWords || '',
      data.recallScore ?? '',
      data.recallTime ?? '',
      data.digitSpanScore ?? '',
      data.digitSpanResults || '',
      data.noticedSound || '',
      data.soundDescription || '',
      data.soundHelped || '',
      data.soundNoEffect || '',
      data.soundDistracted || '',
      data.concentrationRating || '',
      data.environmentDistraction || '',
      data.distractionDetail || ''
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: 'Metronome study endpoint is live. Submit responses with POST.'
  });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet tab not found: ' + SHEET_NAME);
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
