---
id: components-and-props
title: கூறுகள் மற்றும் பண்புகள்
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

கூறுகள் உங்களை பயனர் இடைமுகத்தை சுயாதீன, மீண்டும் பயன்படுத்தக்கூடிய துண்டுகளாக பிரிக்கவும் மற்றும் ஒவ்வொரு துண்டு பற்றியும் தனித்தனியாக யோசிக்க அனுமதிக்கின்றது. இந்த பக்கம் கூறுகளை பற்றிய முன்னுரை அளிக்கிறது. கூறுகளின்  விரிவான API குறிப்பை நீங்கள் [இங்கே காணலாம்](/docs/react-component.html).

கருத்து ரீதியாக கூறுகளானது JavaScript செயல்பாடுகளை போன்றவை. அவை தன்னிச்சையான உள்ளீடுகளை(“props” ஏன்று அழைக்கப்படும்) ஏற்று, React உறுப்புகளை திரும்ப கொடுக்கின்றது. இந்த  React உறுப்புகளானது திரையில் என்ன தோன்ற வேண்டும் என்பதை விவரிக்கும்.

## செயல்பாட்டு மற்றும் வகுப்பு கூறுகள் {#function-and-class-components}

ஒரு கூறுவை வரையறுக்க எளிய வழி ஒரு JavaScript செயல்பாட்டை எழுத வேண்டும்:

```js
function Welcome(props) {
  return <h1>வணக்கம், {props.name}</h1>;
}
```

இந்த செயல்பாடு ஒரு சரியான React கூறு, ஏனெனில் இது தகவலுடைய ஒர் பொருளை உள்ளிட்டாக பெற்று React உறுப்பை வெளியிடுகிறது. இவ்வகை கூறுகளை நாம் செயல்பாட்டு கூறுகள் என்று அழைக்கின்றோம் ஏனெனில் இவை இலக்கியரீதியாக JavaScript செயல்பாடுகளே.

நீங்கள் [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) பயன்படுத்தியும் ஒரு கூறை வரையறுக்களாம்.

```js
class Welcome extends React.Component {
  render() {
    return <h1>வணக்கம், {this.props.name}</h1>;
  }
}
```

மேலே கூறிய இரு கூறுகளும்  Reactயின் பார்வையில் சமமானவையே.

வகுப்புகள்[Classes] சில கூடுதல் அம்சங்களைக் கொண்டிருக்கின்றன, அவை [அடுத்த பிரிவுகளில்](/docs/state-and-lifecycle.html) விவாதிக்கப்படும். அதுவரை, நாம் சுருக்கமான தகவல்களை கொண்ட செயல்பாட்டு கூறுகளை பயன்படுத்துவோம்.

## கூறு வரைதல் {#rendering-a-component}

முன்னதாக, DOM குறிச்சொற்களை பிரதிநிதித்துவப்படுத்தும் செயல்பாட்டு கூறுகளை மட்டுமே நாம் சந்தித்தோம்:

```js
const element = <div />;
```

இருப்பினும், உறுப்புகளை பயனர் வரையறுக்கப்பட்ட கூறுகளை கொண்டும் பிரதிநிதித்துவப்படுத்தலாம்:

```js
const element = <Welcome name="சாரா" />;
```

React இந்த வகை பயனர் வரையறுக்கப்பட்ட கூறு குறிக்கும் உறுப்பை பார்க்கும் பொழுது, அந்த கூறுக்கு JSX பண்புகளை ஒற்றை பொருளாக கொடுக்கின்றது. நாம் இந்த பண்புகளை "props" என்று அழைக்கின்றோம்.

உதாரணமாக, இந்த குறியீடு "வணக்கம், சாரா" என்று பக்கத்தில் வரையும்:

```js{1,5}
function Welcome(props) {
  return <h1>வணக்கம், {props.name}</h1>;
}

const element = <Welcome name="சாரா" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

இந்த எடுத்துக்காட்டில் என்ன நடக்கிறது என்பதை மீண்டும் பார்க்கலாம்:

1. நாம் `ReactDOM.render()`ஐ `<Welcome name="Sara" />` உறுப்பு பயன்படுத்தி அழைக்கிறோம்.
2. React `Welcome` கூறை `{name: 'Sara'}` பண்புகளை கொண்டு அழைக்கும்.
3. நம்முடைய `Welcome` கூறானது தற்போது `<h1>Hello, Sara</h1>` உறுப்பை முடிவாக திருப்பி கொடுக்கின்றது.
4. React DOM திறமையாக DOMஐ மேம்படுத்தி `<h1>Hello, Sara</h1>`ஐ பொருத்துக்கின்றது.

>**குறிப்பு:** எப்பொழுதும் கூறு பெயர்களைத் capital எழுத்துக்கள் கொண்டு தொடங்குங்கள்.
>
>React lowercase எழுத்துக்கள் கொண்டு தொடங்கும் கூறுகளை DOM குறிச்சொற்கள் என்று கருதுகிறது. உதாரணமாக `<div />` ஆனது HTML div குறிச்சொலை குறிக்கின்றது, ஆனால் `<Welcome />` கூறை குறிக்கின்றது.
>
>இந்த வழக்கத்திற்கு பின்னால் உள்ள காரணங்களைப் பற்றி மேலும் அறிய, தயவு செய்து [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) படிக்கவும்.

## கூறுகளை சேர்த்தல் {#composing-components}

கூறுகள் அவற்றின் வெளியீட்டில் மற்ற கூறுகளை குறிப்பிடலாம். இதன் மூலம் ஒரே கூறின் பொருளை எந்த அளவிற்கும் நம்மால் பயன்படுத்த முடியும். ஓரு button, form, dialog, screen: இவை அனைத்தும் React appகளில் பொதுவாக கூறுகளாக வெளிப்படுத்தப்படுகின்றன.

உதாரணமாக நம்மால் ஒரு `App` கூறை உருவாக்கி அதனை கொண்டு `Welcome` கூறை பலமுறை வரைய செய்ய முடியும்.:

```js{8-10}
function Welcome(props) {
  return <h1>வணக்கம், {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="சாரா" />
      <Welcome name="சாகால்" />
      <Welcome name="எடிட்டி" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

பொதுவாக, புது React app ஆனது ஒரு `App` கூறை உச்சத்தில் கொண்டிருக்கும். ஒரு வேலை நீங்கள் இருக்கும் appயில் Reactஐ ஒருங்கிணைத்தால், நீங்கள் சிறிய கூறாகிய `Button` மூலம் தொடங்கி படிபடியாக மேல் நோக்கி செல்லலாம்.

## கூறுகளை பிரித்தல் {#extracting-components}

சிறிய பாகங்களாக கூறுகளை பிரிப்பதில் பயப்பட வேண்டாம்.

உதாரணத்திற்கு இந்த `Comment` கூறை கருத்தில்  கொள்ளுங்கள்.

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

இது `author` (ஒரு object), `text` (ஒரு string), மற்றும் `date` (ஒரு date) ஆகியவற்றை பண்புகளாக எற்றுக்கொண்டு, ஒரு சமூக ஊடக வலைத்தளத்தின் கருத்துரை விவரிக்கிறது.

இத்தகைய கூடுகளையுடைய இந்த கூறை மாற்றுவது தந்திரமானதாக இருக்கக்கூடும், மேலும் இதை தனிப்பட்ட பாகங்களாக மறுபடியும் மறுபடியும் பயன்படுத்துவது கடினம். இதிலிருந்து சில கூறுகளை பிரிக்கலாம்.

முதலில் நாம் `Avatar`யை பிரிக்கலாம்:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

`Avatar` கூறுக்கு தான் `Comment` கூறுக்கு உள் வரையபடுகிறது என்பது தெரிய வேண்டிய அவசியம் இல்லை. இதனால் தான் நாம் இதன் பண்பிற்க்கு `user` அன்றி பொதுவான் பெயரான `author` என்று கொடுத்துள்ளோம்.

நாங்கள் கூறின் பண்பிற்க்கு பெயரிடும் பொழுது கூறு பயன்படும் இடத்தை கொண்டு பெயரிடுவதற்கு மாறாக கூறின் கண்ணோட்டத்தில் பெயரிடுவதை சிபாரிசு செய்கின்றோம்.

இப்போது நாம் `Comment`யை சிறிது எளிமைபடுத்தலாம்:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

அடுத்து நாம் `Avatar` கூறை பயனர் பெயர்க்கு அடுத்து வரையும் கூறான `UserInfo`யை பிரிக்கலாம்.

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

இது நம்மை `Comment`யை இன்னும் எளிமைபடுத்த உதவுகிறது:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

கூறுகளை பிரித்தல் முதலில் கடினமான வேலை போல தோன்றலாம், ஆனால் மறுபயன்பாட்டுக்கு உகந்த கூறுகளின் ஒரு தட்டு கொண்டிருப்பது பெரிய appsகளில் மிகவும் பயனுள்ளதாக இருக்கின்றது. இதில் நாம் பின்பற்ற வேண்டிய கொள்கையானது, ஒரு பயனர் இடைமுகம் பலமுறை பயன்பட்டாலோ(`Button`, `Panel`, `Avatar`) அல்லது மிகவும் சிக்கலாதாக இருந்தாலோ(`App`, `FeedStory`, `Comment`) அதனை மறுபயன்பாட்டு கூறாக மாற்றுவது சிறந்தது.

## Props ஆனது படிக்க மட்டுமே (Read-Only) {#props-are-read-only}

நீங்கள் ஒரு கூறை [செயல்பாடு அல்லது வகுப்பு](#function-and-class-components) கொண்டு உருவாக்கினாலும் அவை அதன் பண்பை எப்போதும் மாற்ற கூடாது. இந்த `sum` செயல்பாடை கருத்தில் கொள்ளுங்கள்.

```js
function sum(a, b) {
  return a + b;
}
```

இவ்வகை செயல்பாடு ["pure"](https://en.wikipedia.org/wiki/Pure_function) என்று கூறபடுகிறது என்னென்றால் இவை அதன் உள்ளீட்டில் மாற்றம் செய்வது இல்லை மற்றும் எப்போதும் அதே உள்ளீட்டிற்கு அதே முடிவை வெளியிடுகிறது.

மாறாக இந்த செயல்பாடானது impure என்னென்றால் இவை அதன் உள்ளீட்டில் மாற்றம் செய்கிறது:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React ஆனது மிகவும் நெகிழ்வானது, ஆனால் இந்த ஒரு கடுமையான விதி மட்டும் உள்ளது:

**அனைத்து கூறுகளும் அதன் பண்புகளை பொருத்து pure செயல்பாடு போன்று செயல்பட வேண்டும்.**

நிச்சயமாக, applicationனின் பயனர் இடைமுகங்கள் காலப்போக்கில் மாறும் தன்மை கொண்டது. [அடுத்த பகுதியில்](/docs/state-and-lifecycle.html), நாம் "state" என்ற ஒரு புதிய கருத்தை அறிமுக படுத்துவோம். State ஆனது React கூறின் வெளிப்பாட்டை, பயனர் செயல்கள், பிணைய பதில்கள் மற்றும் வேறு செயல்களின் விளைவாக விதி மீறல் இன்றி மாற்ற வழிவகுக்கின்றது.

