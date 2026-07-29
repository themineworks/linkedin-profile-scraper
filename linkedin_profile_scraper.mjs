#!/usr/bin/env node
// linkedin-profile-scraper — Apify actor client.
// Node.js client for the themineworks/linkedin-profile-scraper Apify actor: runs it, waits, saves results.json.
// Free Apify account + API token: https://console.apify.com/sign-up
import { ApifyClient } from 'apify-client';
import { writeFileSync } from 'node:fs';

const ACTOR = 'themineworks/linkedin-profile-scraper';

// Flags map 1:1 to the actor's input schema. Run: node linkedin_profile_scraper.mjs --token YOUR_TOKEN --profile-urls "https://www.linkedin.com/in/satyanadella"
function parseArgs(argv) {
    const out = {};
    for (let i = 0; i < argv.length; i++) {
        if (!argv[i].startsWith('--')) continue;
        const key = argv[i].slice(2);
        const val = (argv[i + 1] && !argv[i + 1].startsWith('--')) ? argv[++i] : true;
        out[key] = val;
    }
    return out;
}

const args = parseArgs(process.argv.slice(2));
const token = args.token || process.env.APIFY_TOKEN;
if (!token) {
    console.error('Provide --token or set APIFY_TOKEN — free token at https://console.apify.com/sign-up');
    process.exit(1);
}

const runInput = {};
if (args['profile-urls'] !== undefined) runInput.profileUrls = String(args['profile-urls']).split(',').map(s => s.trim());
if (args['max-results'] !== undefined) runInput.maxResults = parseInt(args['max-results'], 10);

const client = new ApifyClient({ token });
console.log(`Running ${ACTOR} ...`);
const run = await client.actor(ACTOR).call(runInput);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
writeFileSync('results.json', JSON.stringify(items, null, 2));
console.log(`Saved ${items.length} results to results.json`);
