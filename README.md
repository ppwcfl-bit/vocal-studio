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

## The AI coach (free)
Home → **Connect your AI coach** → **Free (Google)**:
1. Open https://aistudio.google.com/apikey, sign in with any Google account and tap **Create API key**. No card needed.
2. Paste the key and tap **Save and test**. The coach says hello.

The key stays on your phone. The free tier has daily limits (plenty for practice), and Google may use what's sent to improve its products. The app sends only text (scores, what you say), never audio. A paid Claude key also works, as does the Cloudflare server in `server/coach-worker.js`.

## Capture My Voice
Practice → **Capture My Voice**. The coach plays notes up and down your range and you hold each one on "ah" for 3 seconds. The app keeps the steadiest part of each, measures its exact pitch, and stores it on your phone. After that, whenever the coach sings a note or a melody (Sing With Your Coach, exercises, song guide melodies), you hear **your own voice**, retuned to the exact note while keeping your tone. Switch between *My voice* and *Coach* any time. It sings vowels, not words.

## Sing along
Song page or Now Playing → **Sing Along**. Paste the words (they stay on your phone), then press play: four clicks, then the lines scroll with the chords above them and a 3-2-1 before each line. Tap **Tap to time the words** once to make the timing exact. Leave **Coach listens** on and the coach talks you through your take afterwards.

## Honest limits
- Songs come with chords and song structure only, not recordings or melody lines (licensing). Your voice is judged on pitch stability, key fit and timing against the chords, not note by note against the original singer.
- The AI teacher sees text measurements of your attempts, never your audio.
- Analysis is tuned on test audio. Real rooms, phones and voices will show where it needs tuning. Use the Log export to report anything that feels wrong.
