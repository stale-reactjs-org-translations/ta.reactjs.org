---
id: cdn-links
title: CDN Links
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: release-channels.html
---

CDN வழியாக React மற்றும் ReactDOM கிடைக்கப்பெறும்.

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

மேற்கண்ட பதிப்புகள் செயலுருவாக்கத்திற்கானது ( development ), முழுமையுற்ற ( production ) வழங்கிக்கானதல்ல. குறைத்து எளிமையாக்கப்பட்ட முழுமையான பதிப்பு கிடைக்குமிடம்:

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

<<<<<<< HEAD
'react' மற்றும் 'react-dom'-ன் குறிப்பிட்ட பதிப்பை பெற, '16'-க்கு பதிலாக பதிப்பு எண்ணை மாற்றிக் கொள்ளவும்.
=======
To load a specific version of `react` and `react-dom`, replace `17` with the version number.
>>>>>>> b41b1dc35679c01c3252e7d512ce28c5e100d0a4

### எதற்காக `crossorigin` பண்பு? {#why-the-crossorigin-attribute}

நீங்கள் CDN -லிருந்து React ஐ பெற்றால், [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) என்ற பண்பை இருக்குமாறு பார்த்துக் கொள்ள பரிந்துரைக்கிறோம்.

```html
<script crossorigin src="..."></script>
```

நீங்கள் பயன்படுத்தும் CDN `Access-Control-Allow-Origin: *` என்ற HTTP தலைப்பை சேர்த்துள்ளதை உரிது செய்து கொள்ளுமாறு பரிந்துரைக்கிறோம்.

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

இது பதிப்பு 16-ம் அதற்கு பிறகான react-ன் பிழைகளை கையாளும் அனுபவத்தை எளிதாக்கும்.

