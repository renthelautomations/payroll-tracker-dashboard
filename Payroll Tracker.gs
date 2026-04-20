/**
 * Chasm Opportunities - Executive Payroll Cockpit (2026-2027)
 * Features: Auto-period detection, Bulk Pre-loading, and Status Sync.
 */

const STAFF_DATA = {
  "Monica": { tag: "@monicag", rate: 1.25 },
  "Chelsea": { tag: "@chealseah", rate: 1.50 },
  "Noelle": { tag: "@noellabella", rate: 2.00 },
  "Mecka": { tag: "@meckaared", rate: 1.50 },
  "Ren": { tag: "@renthelreyesc", rate: 1.25 },
  "Rexamy": { tag: "@rexsabio", rate: 1.50 },
  "Francis": { tag: "@francisdv", rate: 1.25 }
};

// Full Bi-Weekly Schedule (Mar 2026 - Dec 2027)
const PAYROLL_SCHEDULE = [
  {start: 'Mar 28', end: 'Apr 4', w1: '3/28/2026', w2: '4/4/2026'}, {start: 'Apr 11', end: 'Apr 18', w1: '4/11/2026', w2: '4/18/2026'},
  {start: 'Apr 25', end: 'May 2', w1: '4/25/2026', w2: '5/2/2026'}, {start: 'May 9', end: 'May 16', w1: '5/9/2026', w2: '5/16/2026'},
  {start: 'May 23', end: 'May 30', w1: '5/23/2026', w2: '5/30/2026'}, {start: 'Jun 6', end: 'Jun 13', w1: '6/6/2026', w2: '6/13/2026'},
  {start: 'Jun 20', end: 'Jun 27', w1: '6/20/2026', w2: '6/27/2026'}, {start: 'Jul 4', end: 'Jul 11', w1: '7/4/2026', w2: '7/11/2026'},
  {start: 'Jul 18', end: 'Jul 25', w1: '7/18/2026', w2: '7/25/2026'}, {start: 'Aug 1', end: 'Aug 8', w1: '8/1/2026', w2: '8/8/2026'},
  {start: 'Aug 15', end: 'Aug 22', w1: '8/15/2026', w2: '8/22/2026'}, {start: 'Aug 29', end: 'Sep 5', w1: '8/29/2026', w2: '9/5/2026'},
  {start: 'Sep 12', end: 'Sep 19', w1: '9/12/2026', w2: '9/19/2026'}, {start: 'Sep 26', end: 'Oct 3', w1: '9/26/2026', w2: '10/3/2026'},
  {start: 'Oct 10', end: 'Oct 17', w1: '10/10/2026', w2: '10/17/2026'}, {start: 'Oct 24', end: 'Oct 31', w1: '10/24/2026', w2: '10/31/2026'},
  {start: 'Nov 7', end: 'Nov 14', w1: '11/7/2026', w2: '11/14/2026'}, {start: 'Nov 21', end: 'Nov 28', w1: '11/21/2026', w2: '11/28/2026'},
  {start: 'Dec 5', end: 'Dec 12', w1: '12/5/2026', w2: '12/12/2026'}, {start: 'Dec 19', end: 'Dec 26', w1: '12/19/2026', w2: '12/26/2026'},
  {start: 'Jan 2', end: 'Jan 9', w1: '1/2/2027', w2: '1/9/2027'}, {start: 'Jan 16', end: 'Jan 23', w1: '1/16/2027', w2: '1/23/2027'},
  {start: 'Jan 30', end: 'Feb 6', w1: '1/30/2027', w2: '2/6/2027'}, {start: 'Feb 13', end: 'Feb 20', w1: '2/13/2027', w2: '2/20/2027'},
  {start: 'Feb 27', end: 'Mar 6', w1: '2/27/2027', w2: '3/6/2027'}, {start: 'Mar 13', end: 'Mar 20', w1: '3/13/2027', w2: '3/20/2027'},
  {start: 'Mar 27', end: 'Apr 3', w1: '3/27/2027', w2: '4/3/2027'}, {start: 'Apr 10', end: 'Apr 17', w1: '4/10/2027', w2: '4/17/2027'},
  {start: 'Apr 24', end: 'May 1', w1: '4/24/2027', w2: '5/1/2027'}, {start: 'May 8', end: 'May 15', w1: '5/8/2027', w2: '5/15/2027'},
  {start: 'May 22', end: 'May 29', w1: '5/22/2027', w2: '5/29/2027'}, {start: 'Jun 5', end: 'Jun 12', w1: '6/5/2027', w2: '6/12/2027'},
  {start: 'Jun 19', end: 'Jun 26', w1: '6/19/2027', w2: '6/26/2027'}, {start: 'Jul 3', end: 'Jul 10', w1: '7/3/2027', w2: '7/10/2027'},
  {start: 'Jul 17', end: 'Jul 24', w1: '7/17/2027', w2: '7/24/2027'}, {start: 'Jul 31', end: 'Aug 7', w1: '7/31/2027', w2: '8/7/2027'},
  {start: 'Aug 14', end: 'Aug 21', w1: '8/14/2027', w2: '8/21/2027'}, {start: 'Aug 28', end: 'Sep 4', w1: '8/28/2027', w2: '9/4/2027'},
  {start: 'Sep 11', end: 'Sep 18', w1: '9/11/2027', w2: '9/18/2027'}, {start: 'Sep 25', end: 'Oct 2', w1: '9/25/2027', w2: '10/2/2027'},
  {start: 'Oct 9', end: 'Oct 16', w1: '10/9/2027', w2: '10/16/2027'}, {start: 'Oct 23', end: 'Oct 30', w1: '10/23/2027', w2: '10/30/2027'},
  {start: 'Nov 6', end: 'Nov 13', w1: '11/6/2027', w2: '11/13/2027'}, {start: 'Nov 20', end: 'Nov 27', w1: '11/20/2027', w2: '11/27/2027'},
  {start: 'Dec 4', end: 'Dec 11', w1: '12/4/2027', w2: '12/11/2027'}, {start: 'Dec 18', end: 'Dec 25', w1: '12/18/2027', w2: '12/25/2027'}
];

function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Payroll Cockpit — Chasm Opportunities')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getInitialData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = {
    weekly: ss.getSheetByName('Weekly Amount').getDataRange().getValues(),
    biweekly: ss.getSheetByName('Bi-Weekly Payment').getDataRange().getValues(),
    status: ss.getSheetByName('Payment Status').getDataRange().getValues()
  };

  const headers = {
    weekly: sheets.weekly[0].map(h => h instanceof Date ? Utilities.formatDate(h, "GMT+8", "M/d/yyyy") : String(h)),
    biweekly: sheets.biweekly[0].map(h => String(h).trim()),
    status: sheets.status[0].map(h => String(h).trim())
  };

  const allCyclesData = PAYROLL_SCHEDULE.map((period, pIndex) => {
    const periodLabel = `${period.start} + ${period.end}`;
    const colW1 = headers.weekly.indexOf(period.w1);
    const colW2 = headers.weekly.indexOf(period.w2);
    const colTotal = headers.biweekly.indexOf(periodLabel);
    const colStatus = headers.status.indexOf(periodLabel);

    let cycleTotal = 0;
    const employees = Object.keys(STAFF_DATA).map(name => {
      const wRow = sheets.weekly.find(r => r[0] === name) || [];
      const bRow = sheets.biweekly.find(r => r[0] === name) || [];
      const sRow = sheets.status.find(r => r[0] === name) || [];
      const total = colTotal > -1 ? (parseFloat(bRow[colTotal]) || 0) : 0;
      cycleTotal += total;
      return {
        name, rate: STAFF_DATA[name].rate, wiseTag: STAFF_DATA[name].tag,
        week1: colW1 > -1 ? (parseFloat(wRow[colW1]) || 0) : 0,
        week2: colW2 > -1 ? (parseFloat(wRow[colW2]) || 0) : 0,
        biTotal: total,
        status: (colStatus > -1 && sRow[colStatus]) ? sRow[colStatus] : "Not Paid"
      };
    });
    return { periodLabel, w1Label: period.start, w2Label: period.end, w1Date: period.w1, employees, cycleTotal };
  });

  // Auto-detect current period: Find the latest cycle where Week 1 has already passed
  const today = new Date();
  let todayIndex = allCyclesData.findIndex(p => today < new Date(p.w1Date)) - 1;
  if (todayIndex < 0) todayIndex = 0;

  return { allCyclesData, todayIndex };
}

function updateStatus(name, periodLabel, newStatus) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Payment Status');
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => String(h).trim());
  const colIndex = headers.indexOf(periodLabel.trim());
  const rowIndex = data.findIndex(r => r[0] === name);
  
  if (rowIndex > -1 && colIndex > -1) {
    sheet.getRange(rowIndex + 1, colIndex + 1).setValue(newStatus);
    return true;
  }
  return false;
}
