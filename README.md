# LinkedIn Profile Scraper: Bulk Public Data

Scrape any public LinkedIn profile without login or cookies: full name, headline, location, about section, work experience, education history, skills list, and connection count. Supply a list of profile URLs and get back structured JSON.

**Run it on Apify:** [apify.com/themineworks/linkedin-profile-scraper](https://apify.com/themineworks/linkedin-profile-scraper)
**Docs, FAQ and pricing:** [themineworks.com/actors/linkedin-profile-scraper](https://themineworks.com/actors/linkedin-profile-scraper/)

**Price:** $7.00 per 1,000 profiles on Apify's free plan, down to $4.00 on higher plans, plus a $0.005 start fee per run. Failed and empty results are never charged.

## What it returns

* Experience, education, and skills per profile
* Headline, location, about, and connection count
* Bulk input: list of LinkedIn profile URLs
* No login or cookies required
* Zero charge on private or 404 profiles

## Quick start

You need a free [Apify account](https://console.apify.com/sign-up) and its API token (Settings, API & Integrations).

### Python

```bash
pip install apify-client
```

```python
from apify_client import ApifyClient

client = ApifyClient("YOUR_APIFY_TOKEN")
run = client.actor("themineworks/linkedin-profile-scraper").call(run_input={
    "profileUrls": [
        "https://www.linkedin.com/in/satyanadella"
    ],
    "maxResults": 1
})

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
```

### Node.js

```bash
npm install apify-client
```

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: 'YOUR_APIFY_TOKEN' });
const run = await client.actor('themineworks/linkedin-profile-scraper').call({
    "profileUrls": [
        "https://www.linkedin.com/in/satyanadella"
    ],
    "maxResults": 1
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
console.log(items);
```

### cURL

One request that runs the actor and returns the results in the response (for runs under 5 minutes):

```bash
curl -X POST "https://api.apify.com/v2/acts/themineworks~linkedin-profile-scraper/run-sync-get-dataset-items?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profileUrls": ["https://www.linkedin.com/in/satyanadella"], "maxResults": 1}'
```

### Command line

This repo includes ready-made clients that save results to JSON and CSV:

```bash
python3 linkedin_profile_scraper.py --token YOUR_APIFY_TOKEN --profile-urls "https://www.linkedin.com/in/satyanadella" --max-results "1"
node linkedin_profile_scraper.mjs --token YOUR_APIFY_TOKEN --profile-urls "https://www.linkedin.com/in/satyanadella" --max-results "1"
```

## Input

| Field | Type | Default | Description |
|---|---|---|---|
| `profileUrls` | array |  | List of public LinkedIn profiles to scrape |
| `maxResults` | integer | `10` | Maximum number of profiles to return |

## Output

One row per result, as JSON, CSV, Excel or through the API.

| Field | Type | Description |
|---|---|---|
| `profile_url` | string | Canonical LinkedIn profile URL |
| `name` | string | Full name of the person |
| `headline` | string | LinkedIn headline (current role and company) |
| `location` | string | Location as shown on the profile |
| `about` | string | About / summary section text |
| `connections` | string | Connection count string (for example '500+ connections') |
| `followers` | string | Follower count string |
| `experience` | array | Array of experience entries (title, company, duration, description) |
| `education` | array | Array of education entries (school, degree, field, dates) |
| `skills` | array | List of skills |
| `scraped_at` | string | ISO timestamp when this record was scraped |

## Use it from an AI agent

The actor works as a tool in Claude, Cursor or any MCP client through Apify's MCP server:

```
https://mcp.apify.com/?tools=themineworks/linkedin-profile-scraper
```

## FAQ

### How much does the LinkedIn Profile Scraper cost?

$7.00 per 1,000 profiles on Apify's free plan, down to $4.00 on higher plans, plus a $0.005 start fee per run. Failed and empty results are never charged. You can cap what a single run may spend with the maximum cost setting on Apify.

### Can I export the results to CSV or Excel?

Yes. Every run saves to an Apify dataset you can download as JSON, CSV, Excel or XML, or read through the API. The Python and Node clients in this repo also write the results to local files.

### Can I run it on a schedule?

Yes. Save your input as a task on Apify and attach a schedule, or call the API from your own cron job. Scheduled runs are billed the same way as manual ones.

## Related scrapers

* [B2B Leads Finder](https://themineworks.com/actors/b2b-leads-finder/): Business emails and LinkedIn profiles for target companies
* [LinkedIn Company Scraper](https://themineworks.com/actors/linkedin-company-details/): Company size, industry, website, and followers without login
* [Zillow Rental Listings Scraper](https://themineworks.com/actors/zillow-rental-listings/): Scrape Zillow for-rent listings by city or zip. $1 per 1,000 results

Part of [The Mine Works](https://themineworks.com/): 151 pay-per-result scrapers with no login and no browser setup on your side.

## License

MIT © The Mine Works
