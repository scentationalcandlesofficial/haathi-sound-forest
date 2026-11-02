/**
 * Haathi's Sound Forest: collects anonymous play data and feedback into this Google Sheet.
 * Setup: in the Sheet, Extensions > Apps Script, paste this file, Save,
 * then Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone". Copy the web app URL.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var body = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var type = String(body.type || 'unknown');
    var sheet = ss.getSheetByName(type) || ss.insertSheet(type);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['received_at', 'device', 'sent_at', 'age', 'minutes', 'days', 'chapters', 'letters', 'mastered', 'data_json']);
      sheet.setFrozenRows(1);
    }
    var d = body.data || {};
    var json = JSON.stringify(d);
    if (json.length > 45000) json = json.slice(0, 45000);
    sheet.appendRow([new Date(), String(body.device || '').slice(0, 30), String(body.at || '').slice(0, 30),
      d.age || '', d.minutes || '', d.days || '', d.chapters || '', d.letters || '', d.mastered || '', json]);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error');
  } finally {
    lock.releaseLock();
  }
}
function doGet() { return ContentService.createTextOutput("Haathi feedback endpoint is running."); }
