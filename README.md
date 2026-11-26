# Vocal Studio

A singing and guitar instructor that runs in your browser. It does real pitch, chord and timing analysis from your microphone, teaches through songs you choose, and has a teacher you can talk to.

## Use it
**https://ppwcfl-bit.github.io/vocal-studio/**

Install it on your phone like an app:
- **iPhone (Safari):** Share button → *Add to Home Screen*.
- **Android (Chrome):** ⋮ menu → *Add to Home screen* / *Install app*.
- Allow the microphone when asked. It only works over https, and this address is https.

Your progress is saved in that browser only (a few hundred KB). The app is about 0.75 MB.

## Getting started
The first time you open it, a 4-step walkthrough sets your name and what you're practising, checks your sound and microphone, and shows how a lesson works. Tap **?** on Home to see it again.

- **Today: Singing / Guitar / Both.** The bar at the top switches the whole app. Singing hides the guitar tools, Guitar hides the vocal ones.
- **Instructor:** tap *Start the lesson* once so your phone lets it talk.
- **Play along:** in Now Playing, *Listen* plays the music so you can sing or play along. *Voice* / *Guitar* / *Both* record a take and give feedback. Turn on 🎧 if you wear headphones, so the music also plays while you record.
- **Break down any song** (Songs tab): use a song file you own, or play it out loud. The app works out the tempo, key and one chord per bar, picks a capo for easy shapes, and keeps your recording so you can play and sing along with the real song.
- **Make It Yours** on every song: ideas for your own key, dynamics, phrasing and strumming. The instructor coaches technique, not imitation.

## What works with no setup
- Live pitch tracking, range test, vocal exercises, chord and strum checking, song practice (Sing, Play, Sing + Play), recording your take and playing it back.
- The built-in teacher: spoken lessons, measured feedback after every attempt, and a coaching-cue library.

## Optional: the AI teacher (free hosting, you pay Anthropic per use)
Your API key goes on a small Cloudflare server, never in the app or in this repo. Nothing is stored on your phone or computer.

1. Get an API key at https://console.anthropic.com → *API Keys* → *Create Key*. Add a little credit under *Billing*. Copy the key.
2. Sign in at https://dash.cloudflare.com (the free plan is enough; you can sign in with GitHub).
3. *Workers & Pages* → *Create* → *Create Worker* → name it `vocal-coach` → *Deploy*.
4. *Edit code* → delete everything → paste all of [`server/coach-worker.js`](server/coach-worker.js) → *Deploy*.
5. The worker's *Settings* → *Variables and Secrets* → *Add*:
   | Name | Type | Value |
   |---|---|---|
   | `ANTHROPIC_API_KEY` | Secret | your key from step 1 |
   | `APP_TOKEN` | Secret | any long phrase you make up |
   | `ALLOWED_ORIGIN` | Text | `https://ppwcfl-bit.github.io` |
   
   Then *Deploy*.
6. In the app: **You → Settings → AI coach** → paste the worker address (`https://vocal-coach.<your-subdomain>.workers.dev`) and the same `APP_TOKEN` → *Save*. The status changes to *Coach server set*.
7. Open **Instructor** and say hello. Use the **Log** button to export a lesson transcript if something sounds off.

## Honest limits
- Songs come with chords and song structure only, not recordings or melody lines (licensing). Your voice is judged on pitch stability, key fit and timing against the chords, not note by note against the original singer.
- The AI teacher sees text measurements of your attempts, never your audio.
- Analysis is tuned on test audio. Real rooms, phones and voices will show where it needs tuning. Use the Log export to report anything that feels wrong.
