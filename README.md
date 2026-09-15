# Vexa Web Prototype V1

**Mr. Hazil's Personal AI Assistant**

## Run it
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Allow microphone permission if the browser asks.
4. Try the quick buttons or type a message.

## What is included
- Futuristic red holographic Vexa interface
- Responsive mobile layout
- Text chat prototype
- Browser speech recognition when supported
- Browser text-to-speech
- English voice input by default
- Local demo responses

## Important
This V1 does **not** contain a real AI API, phone-number calling, call forwarding, or Android app control yet. Those require a secure backend and explicit device/telephony permissions.

## Planned architecture
Web UI -> Vexa backend -> AI model -> voice service -> Android app / telephony agent

Never put a private AI API key directly into `app.js` or any browser-delivered file.
