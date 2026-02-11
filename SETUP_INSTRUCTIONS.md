# JutaDhundo - Multi-District Dynamic Setup

## Overview
This application has been upgraded from a single-district static website to a dynamic multi-district system supporting all 38 districts of Bihar.

## Features Implemented

### 1. ✅ Dynamic District Selection
- District dropdown with search functionality
- Data fetched dynamically from GitHub private repo
- Selected district saved in Chrome localStorage
- Supports all 38 Bihar districts

### 2. ✅ Circle-Based Filtering
- "View All Villages by Circle" button
- Modal showing all circles in selected district
- Filter villages by circle
- Sort options: Name A-Z or Thana Number A-Z

### 3. ✅ One-Time Sign-Up System
- Shows modal on first visit
- Collects: Name, Email, Phone, City
- Auto-fills city using IP geolocation (no permissions needed)
- Stores data in localStorage
- Sends data to GitHub repo as JSON

### 4. ✅ Ad System
- Fetches ad HTML from GitHub repo
- Shows popup 3 seconds after page load
- Unskippable for duration set in ad HTML (default 20 seconds)
- Progress bar showing countdown
- Repeats every 2 hours
- Skips if no ad file exists
- **IP Blacklist**: Doesn't show ads to IPs listed in `ip.txt`

### 5. ✅ User Location Detection
- Gets city/state/region using IP geolocation
- No browser permissions required
- Uses ipapi.co free API

## Environment Variables

Set these in Netlify:

```
GITHUB_TOKEN=your_github_personal_access_token
```

## GitHub Repositories

### 1. District Data
- **Repo**: `https://github.com/Sumanradhadas/allcirclesbih`
- **Format**: `{DistrictName}.json` (e.g., `Araria.json`, `Patna.json`)
- **Structure**:
```json
[
  {
    "DISTRICT": "Araria",
    "CIRCLE": "Araria (Araria Sadar)",
    "village_en": "Ajmat Pur (215/1) (Thana No -215 )",
    "village_ll": "अजमतपुर (थाना नं -215 )",
    "othana_no": "215"
  }
]
```

### 2. User Data & Ads
- **Repo**: `https://github.com/Sumanradhadas/DB-INFO-JUTADHUNDO`

#### Files:
1. **user-singup.json**: Stores user sign-up data
```json
[
  {
    "name": "User Name",
    "email": "user@example.com",
    "phone": "1234567890",
    "city": "Patna",
    "ip": "123.45.67.89",
    "region": "Bihar",
    "country": "India",
    "timestamp": "2025-02-10T12:00:00.000Z"
  }
]
```

2. **ad.html**: Ad HTML content
- Add comment `<!-- DURATION:30 -->` to set custom duration in seconds
- If file doesn't exist, no ad will be shown

3. **ip.txt**: IP blacklist (one IP per line)
```
192.168.1.1
10.0.0.1
# Comments start with #
```

## API Endpoints

### 1. Fetch District Data
```
GET /api/fetch-district?district=Araria
```

### 2. Get User IP & Location
```
GET /api/get-user-ip
```

### 3. Fetch Ad Data
```
GET /api/fetch-ad
```

### 4. Save User Data
```
POST /api/save-user
Content-Type: application/json

{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "1234567890",
  "city": "Patna"
}
```

## localStorage Keys

- `selectedDistrict`: Currently selected district
- `userData`: User sign-up information
- `lastAdShown`: Timestamp of last ad display

## How It Works

### First Visit
1. User lands on homepage
2. Sign-up modal appears (one-time)
3. City auto-filled using IP geolocation
4. User fills form → data saved to localStorage + GitHub
5. After 3 seconds, ad popup appears (if ad exists and IP not blacklisted)
6. Ad shows for configured duration (default 20 seconds)

### Subsequent Visits
1. User data loaded from localStorage (no sign-up needed)
2. Last selected district loaded automatically
3. Ad shown only if 2+ hours have passed since last view
4. User can change district anytime

### District Search Flow
1. Select district from dropdown
2. District data fetched from GitHub
3. Search by village name or thana number
4. Click "View All Villages by Circle" for circle-based filtering
5. Sort and filter as needed

## Development

```bash
# Install dependencies
yarn install

# Build for Netlify
yarn build:netlify

# Files generated in dist/public and netlify/functions
```

## Deployment to Netlify

1. Push code to your repository
2. Connect repo to Netlify
3. Set environment variables:
   - `GITHUB_TOKEN`: Your GitHub Personal Access Token with repo access
4. Deploy!

## Notes

- District JSON files must match exact district names (case-sensitive)
- GitHub token needs read/write access to both repositories
- Ad duration can be customized via HTML comment
- IP blacklist supports comments (lines starting with #)
- All 38 districts supported as per Bihar's administrative divisions

## Support

For issues or questions, please check:
- Netlify function logs for API errors
- Browser console for client-side errors
- GitHub repo permissions and file names
