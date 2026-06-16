# Metronome & Memory Study

Survey website that saves participant responses to **Google Sheets**, with a **CSV backup download** on the thank-you screen.

**Live site:** https://krxstxna.github.io/Metronome-Memory-Study/ *(after GitHub Pages is enabled)*

**Repo access:** owned by `krxstxna`, with `rheashiremath` added as a collaborator.

## Files

| File | Purpose |
|---|---|
| `index.html` | The survey (host on GitHub Pages or any static host) |
| `apps-script/Code.gs` | Backend that writes rows to Google Sheets |

---

## Setup (one time)

### 1. Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name it something like **Metronome Study Responses**.

### 2. Apps Script

1. In the sheet: **Extensions → Apps Script**
2. Delete any default code and paste everything from `apps-script/Code.gs`
3. If your tab is not named `Sheet1`, change `SHEET_NAME` at the top of the script
4. Click **Run** on `setupSheet` once and authorize the script
5. You should see column headers appear in row 1

### 3. Deploy the web app

1. **Deploy → New deployment**
2. Click the gear icon → choose **Web app**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** **Anyone**
4. Click **Deploy**
5. Copy the URL ending in `/exec`

### 4. Connect the survey

1. Open `index.html`
2. Replace this line:

```javascript
const APPS_SCRIPT_URL = "PASTE_YOUR_NEW_EXEC_URL_HERE";
```

with your copied `/exec` URL.

### 5. Publish the site

Push to GitHub and enable **GitHub Pages** (Settings → Pages → deploy from `main` branch, root or `/docs`).

---

## Test that saving works

Run this in Terminal (replace the URL):

```bash
curl -L -X POST "YOUR_EXEC_URL" \
  -H "Content-Type: application/json" \
  -d '{"timestamp":"2026-01-01T00:00:00.000Z","consent":"yes","condition":"silence","recallScore":5}'
```

A new row should appear in your Google Sheet.

---

## CSV backup

If Google Sheets fails (wrong URL, permissions, etc.), participants still see a **Download CSV backup** button on the thank-you screen. You can open CSV files in Excel or Google Sheets.

---

## Columns saved

`timestamp`, `consent`, `condition`, `age`, `sex`, `languages`, `screening`, `screeningDetail`, `medication`, `goldMSI`, `recalledWords`, `recallScore`, `recallTime`, `digitSpanScore`, `digitSpanResults`, `noticedSound`, `soundDescription`, `soundHelped`, `soundNoEffect`, `soundDistracted`, `concentrationRating`, `environmentDistraction`, `distractionDetail`

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Sheet stays empty | Redeploy Apps Script with **Anyone** access |
| Sign-in page when testing URL | Deployment access is wrong — use **Anyone** |
| "URL not configured" message | Paste your `/exec` URL into `index.html` |
| Old URL in repo | Your previous URL was broken (401). Use a **new** deployment URL |

### 6. Share with both researchers

**GitHub:** In the repo on GitHub → **Settings → Collaborators** → add `rheashiremath` with **Write** access.

**Google Sheet:** In the spreadsheet → **Share** → add both Google accounts (e.g. rheashiremath@gmail.com and the Google email tied to krxstxna) as **Editors**.

Contact: rheashiremath@gmail.com
