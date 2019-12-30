---
id: handling-events
title: Handling Events
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

React கூறுகளுடன் நிகழ்வுகளைக் கையாளுதல் DOM கூறுகளுடன் நிகழ்வுகளைக் கையாளுவதற்கு மிகவும் ஒத்திருக்கிறது. சில தொடரியல் வேறுபாடுகள் உள்ளன:

* சிறிய எழுத்துக்களைக் காட்டிலும், ஒட்டக வடிவ எழுத்துக்களைக் பயன்படுத்தி React நிகழ்வுகள் பெயரிடப்பட்டுள்ளன.
* JSX உடன் நீங்கள் ஒரு செயக்கூற்றை விட, செயற்பாடு கையாளுபவராக ஒரு செயல்பாட்டை அனுப்புகிறீர்கள், சொல்லுக்கு மாறாக.

உதாரணத்திற்கு, இந்த HTML: 

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React-ல் சற்று வித்தியாசமானது:

```js{1}
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

மற்றொரு வித்தியாசம் என்னவென்றால், React-ல் இயல்புநிலை நடத்தையைத் தடுக்க நீங்கள் `false`யை தர முடியாது. நீங்கள் `preventDefault`  வெளிப்படையாக அழைக்க வேண்டும். உதாரணத்திற்கு, தெளிவாக HTML உடன், புதிய பக்கத்தைத் திறக்கும் இயல்புநிலை இணைப்பு நடத்தையை தடுக்க, நீங்கள் எழுதலாம்:

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

React-ல் இதற்கு பதிலாக:

```js{2-5,8}
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

இங்கே, `e` ஒரு செயற்கை நிகழ்வு. React இந்த செயற்கை நிகழ்வுகளை [W3C விவரம் ](https://www.w3.org/TR/DOM-Level-3-Events/) விவரக்குறிப்பின் படி வரையறுக்கிறது, எனவே குறுக்கு-உலாவி பொருந்தக்கூடிய தன்மையைப் பற்றி நீங்கள் கவலைப்பட தேவையில்லை. மேலும் அறிய, [`செயற்கைநிகழ்வு`](/docs/events.html) குறிப்பு வழிகாட்டியைப் பார்க்கவும்.

React-ஐ பயன்படுத்தும் போது, ​​பொதுவாக ஒரு DOM கூறு உருவாக்கப்பட்ட பிறகு கவனிப்பவர்களைச் சேர்க்க `addEventListener`-ஐ அழைக்க தேவையில்லை. அதற்கு பதிலாக, கூறு ஆரம்பத்தில் காண்பிக்கப்படும் போது கவனிப்பவருக்கு வழங்கவும்.

[ES6 வகுப்பைப் ](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) பயன்படுத்தி ஒரு கூறுகளை நீங்கள் வரையறுக்கும்போது, ஒரு பொதுவான மாதிரி நிகழ்வு கையாளுபவர் வகுப்பில் ஒரு முறையாக இருப்பது. உதாரணத்திற்கு, இந்த `Toggle` கூறு ஒரு பொத்தானை அளிக்கிறது, இது பயனரை "ஆன்" மற்றும் "ஆஃப்" இடையே மாற்ற அனுமதிக்கிறது: 

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

JSX கால்பேக்குகளில் இதன் பொருள் குறித்து நீங்கள் கவனமாக இருக்க வேண்டும். Javascript-ல், வகுப்பு முறைகள் இயல்பாகவே [பிணைக்க](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)-ப்படவில்லை. `this.handleClick`-ஐ பிணைக்க மற்றும் `onClick`-ஐ அனுப்ப மறந்தால், செயற்பாடு உண்மையில் அழைக்கப்படும் போது `this` என்பது `undefined`-ஆக இருக்கும்.

இது React சார்ந்த நடத்தை அல்ல; இது [JavaScript-ல் செயல்பாடுகள் எவ்வாறு செயல்படுகின்றன.](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/) என்பதின் ஒரு பகுதியாகும். பொதுவாக, `()` இல்லாமல் ஒரு முறையை நீங்கள் குறிப்பிட்டால், `onClick={this.handleClick}` போன்று, நீங்கள் அந்த முறையை பிணைக்க வேண்டும்.

`bind`-பை அழைப்பது எரிச்சலூட்டினால், இதைச் சுற்றி உங்களுக்கு இரண்டு வழிகள் உள்ளன. நீங்கள் சோதனையைப் பயன்படுத்துகிறீர்கள் என்றால் [பொது வகுப்பு புலங்கள் தொடரியல்](https://babeljs.io/docs/plugins/transform-class-properties/), கால்பேக்குகளை சரியாக பிணைக்க நீங்கள் வகுப்பு புலங்களைப் பயன்படுத்தலாம்:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

[Create React App](https://github.com/facebookincubator/create-react-app)-ல் இந்த தொடரியல் இயல்பாகவே இயக்கப்பட்டது.

நீங்கள் வகுப்பு புலங்களின் தொடரியல் பயன்படுத்தவில்லை என்றால், கால்பேக்கில் நீங்கள் ஒரு [அம்பு செயல்பாட்டைப்](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) பயன்படுத்தலாம்:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

இந்த தொடரியல் சிக்கல் என்னவென்றால், ஒவ்வொரு முறையும் `LoggingButton` வழங்கும்போது வேறுபட்ட அழைப்பு உருவாக்கப்படுகிறது. பெரும்பாலான சந்தர்ப்பங்களில், இது நன்று. எனினும், இந்த அழைப்பு குறைந்த கூறுகளுக்கு ஒரு ஆதாரமாக அனுப்பப்பட்டால், அந்த கூறுகள் கூடுதல் மறு-ஒழுங்கமைப்பைச் செய்யலாம். இந்த வகையான செயல்திறன் சிக்கலைத் தவிர்ப்பதற்கு, கட்டமைப்பாளரில் பிணைக்க அல்லது வர்க்க புலங்களின் தொடரியல் பயன்படுத்த பரிந்துரைக்கிறோம்.

## நிகழ்வு கையாளுவதற்கு வாதங்களை அனுப்புதல் {#passing-arguments-to-event-handlers}

ஒரு சுழற்சியின் உள்ளே ஒரு நிகழ்வு அளவுருவுக்கு கூடுதல் அளவுருவை அனுப்ப விரும்புவது பொதுவானது. உதாரணத்திற்கு, வரிசை ID `id` என்றால், பின்வருவனவற்றில் ஒன்று செயல்படும்:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

மேலே உள்ள இரண்டு வரிகள் சமமானவை, மற்றும் முறையே [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) மற்றும் [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)-ஐப் பயன்படுத்தவும்.

இரண்டு நிகழ்வுகளிலும், React நிகழ்வைக் குறிக்கும் `e` வாதம் ID-க்குப் பிறகு இரண்டாவது வாதமாக அனுப்பப்படும். அம்பு செயல்பாட்டுடன் நாம் அதை வெளிப்படையாக அனுப்ப வேண்டும், ஆனால் `பிணைப்பு`-டன் மேலும் வாதங்கள் தானாகவே அனுப்பப்படும்.