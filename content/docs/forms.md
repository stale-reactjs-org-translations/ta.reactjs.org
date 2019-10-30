---
id: forms
title: வடிவம்
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

React இல் HTML படிவ உறுப்புகள் வேறு DOM உறுப்புகளில் இருந்து வேறுபடுகின்றன, ஏனெனில் படிவக் கூறுகள் இயற்கையாக சில உள் நிலைகளை வைத்திருக்கின்றன. உதாரணமாக, எளிய HTML இல் கீழ்கண்ட படிவம் ஒரு ஒற்றைப் பெயரை ஏற்றுக்கொள்கிறது:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

பயனர் இந்தப் படிவத்தை சமர்ப்பிக்கும் போது ஒரு புதிய பக்கத்திற்கு உலாவுதல் இயல்புநிலை HTML படிவத்தின் செயல்பாடு உள்ளது. இந்த செயல்பாட்டை நீங்கள் React இல் பிரதிபலிக்க விரும்பினால், ௮தை செய்யமுடியும். ஆனால் பெரும்பாலான சந்தர்ப்பங்களில், படிவத்தின் சமர்ப்பிப்பை கையாளுவது மற்றும் படிவத்தில் பயனர் தரவிற்கான அணுகல் ஆகியவற்றை JavaScript செயல்பாடு மூலம் செய்வது வசதியாக இருக்கிறது. இதை அடைவதற்கான நிலையான நுட்ப வழி "கட்டுப்படுத்தப்பட்ட கூறுகள்" என்று அழைக்கப்படுகிறது.

## கட்டுப்படுத்தப்பட்ட கூறுகள் {#controlled-components}

HTML இல்,`<input>`, `<textarea>`, மற்றும் `<select>` போன்ற வடிவம் உறுப்புகள் பொதுவாக தங்கள் சொந்த நிலைகளை பராமரித்து பயனர் உள்ளீட்டை அடிப்படையாகப் புதுப்பிக்கின்றன. React இல் மாறக்கூடிய நிலைகளை பொதுவாக கூறுகளின் நிலை உடைமையாக கொண்டு, [`setState()`](/docs/react-component.html#setstate) மூலம் மட்டுமே புதுப்பிக்கின்றன.

React நிலையின் "உண்மை ஒற்றை ஆதாரமாக" கொண்டு இவை இறண்டையிம் ஒன்றிணைக்க முடியும். பிறகு படிவத்தை அளிக்கும் React கூறுகள் அந்த படிவத்தில் அடுத்த பயனர் உள்ளீடில் என்ன நடக்கிறது என்பதை கட்டுப்படுத்துகிறது. ஒரு உள்ளீட்டு படிவத்தின் உறுப்பு, இதன் மதிப்பு, React ஆல் கட்டுப்படுத்தப்படும் செயல்பாடு என்பதை "கட்டுப்படுத்தப்பட்ட கூறு" ஆகும்.

உதாரணத்திற்கு,நாம் முந்தைய முன்மாதிரியை ௪மர்பிக்கும் போது  பெயர் பதிவு செய்ய விரும்பிநால், அதை கட்டுப்படுத்தப்பட்ட கூறுகள் மூலம் எழுத முடியும்:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

மதிப்பு பண்பு வடிவ உறுப்பில் பொருத்தப்பட்டிள்ளதால், React நிலையின் "உண்மை ஒற்றை ஆதாரமாக" கொண்டு எப்போதும் காட்டப்படும் மதிப்பு `this.state.value` ஆகிறது. `handleChange` ஒவ்வொரு முறை அழுத்துவதன் மூலம் React நிலை புதுப்பிக்கிறது மற்றும் காட்டப்படும் மதிப்பு பயனர் வகைகளாக புதுப்பிக்கிறது.

கட்டுப்படுத்தப்பட்ட கூறுகள், ஒவ்வொரு நிலையின் மாற்றத்திற்கும் தொடர்புடைய கையாளுதல் செயல்பாடு வேண்டும். இது பயனர் உள்ளீடை நேரடியாக மாற்ற அல்லது சரிபார்க்க செய்கிறது. உதாரணத்திற்கு, பெயர்கள் அனைத்தும் பெரிய எழுத்துக்களுடன் எழுதப்பட்டிருக்க வேண்டும் எனில், `handleChange` செயல்பாட்டை கீழ்கண்டவாறு எழுதவும்:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## textarea குறிச்சொல் {#the-textarea-tag}

HTML இல், `<textarea>` உறுப்பின் அதன் உரைகளை அதன் குழந்தைகள் வரையறுக்கிறது:

```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

React இல்,  `<textarea>` `மதிப்பு` பண்பாக பயன்படுத்துகிறது,இந்த வழி ,ஒரு படிவத்தை பயன்படுத்தும் `<textarea>` ஒரு ஒற்றை வரி உள்ளீடு பயன்படுத்தும் ஒரு படிவதை இதேபோல் எழுத முடியும்:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

கவனித்ததால் `this.state.value` கன்ஸ்ட்ரக்டரில் துவக்கப்பட்டுள்ளது, அதனால் text area உரைகளுடன் தொடங்குகிறது.

## select குறிச்சொல் {#the-select-tag}

HTML இல், `<select>`ஒரு கீழ்தோன்றும் பட்டியல் உருவாக்குகிறது.உதாரணத்திற்கு, HTML சுவைகளின் பட்டியல் கீழே பட்டியலிடுகிறது:

```html
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

இங்கே `<select>` பண்புக்கூறு மூலம் தேங்காய் விருப்பத்தை ஆரம்பத்தில் தேர்ந்தெடுத்தது என்பதைக் கவனியுங்கள் React இல், 'select' டேக்'`selected` பண்பு பயன்படுத்துவதற்கு பதிலாக 'value' பண்பு பயன்படுத்த படுகிறது. கட்டுப்பாட்டு கூறுகளில் இது மிகவும் வசதியானது ஏனெனில் நீங்கள் அதை ஒரே இடத்தில் புதுப்பிக்க வேண்டும். உதாரணத்திற்கு:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

ஒட்டுமொத்தமாக, `<input type="text">`, `<textarea>`, மற்றும் `<select>` அனைத்தும் இதேபோல் வேலை செய்யும் - கட்டுப்பாட்டு கூறுகளை செயல்படுத்தும் `மதிப்பு` பண்பை ஏற்றுக்கொள்கிறார்கள்.

> குறிப்பு
>
> நீங்கள் பல விருப்பங்களை தேர்ந்தெடுக்க `மதிப்பு` பண்புக்கு ஒரு array அனுப்ப அனுமதிக்கிறது:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## கோப்பு உள்ளீடு குறிச்சொல் {#the-file-input-tag}

HTML இல், `<input type="file">` மூலம் பயனர் ஒன்று அல்லது அதற்கு மேற்பட்ட கோப்புகளை தேர்வு செய்ய தங்கள் சாதனத்தின் சேமிப்பகத்திலிருந்து சேவையகத்திற்கு பதிவேற்றப்படும் அல்லது  கையாள Javascript [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) பயன்படுத்தப்படும்.

```html
<input type="file" />
```

React இல், அதன் மதிப்பு வாசிக்க மட்டுமே-ஏனெனில், அது **கட்டுப்பாடற்ற** கூறு ஆகும். இது மற்ற கட்டுப்பாடற்ற கூறுபாடுகளுடன் கலந்துரையாடப்பட்டது
[பின்னர் ஆவணத்தில்](/docs/uncontrolled-components.html#the-file-input-tag).

## பல உள்ளீட்டைக் கையாளுதல் {#handling-multiple-inputs}

நீங்கள் பல கட்டுப்படுத்தப்பட்ட `input` கூறுகளை கையாள வேண்டும் எனில், நீங்கள் ஒவ்வொரு உறுப்புக்கும் `name` பண்புக்கூறு செய்து மற்றும் கையாளுதல் செயல்பாடு மதிப்பு அடிப்படையில் `event.target.name` மூலம் தேர்வு செய்யலாம்.

உதாரணத்திற்கு:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

ES6 ஐ எப்படிப் பயன்படுத்துகிறோம் என்பதைக் கவனியுங்கள் [கணக்கிடப்பட்ட பண்பு பெயர்](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) கொடுக்கப்பட்ட உள்ளீட்டு பெயருடன் தொடர்புடைய நிலை விசையை மேம்படுத்த, தொடரியல்:

```js{2}
this.setState({
  [name]: value
});
```

இது ES5 குறியீட்டுக்கு சமமானது:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

மேலும், `setState ()` தானாகவே [பகுதி நிலையை தற்போதைய நிலையுடன் இணைக்கிறது](/docs/state-and-lifecycle.html#state-updates-are-merged), மாற்றியமைக்கப்பட்ட பகுதிகளுடன்  அதை அழைக்க வேண்டும்.

## கட்டுப்படுத்தப்பட்ட உள்ளீடு Null மதிப்பு {#controlled-input-null-value}

பண்புகள் மதிப்பை குறிப்பிடும்போது [கட்டுப்படுத்தப்பட்ட கூறுகள்](/docs/forms.html#controlled-components) நீங்கள் விரும்பும் வரை பயனர் உள்ளீட்டை மாற்றுவதைத் தடுக்கிறது. நீங்கள் `value` என்று குறிப்பிட்டிருந்தால், உள்ளீடு இன்னமும் திருத்தத்தக்கதாக இருந்தால் , நீங்கள் தற்செயலாக `value`வை `undefined` அல்லது `null` என அமைத்திருக்கலாம்.

பின்வரும் குறியீடு இதை நிரூபிக்கிறது. (உள்ளீடு முதலில் பூட்டப்பட்டுள்ளது, ஆனால் சிறிது தாமதத்திற்குப் பிறகு திருத்த முடியும்.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## கட்டுப்படுத்தப்பட்ட கூறுகளுக்கு மாற்று {#alternatives-to-controlled-components}

சில நேரங்களில் கட்டுப்படுத்தப்பட்ட கூறுகளை பயன்படுத்த கடினமாக இருக்கும், ஏனெனில் React கூறு மூலம் அனைத்து வகை தரவு மாற்றம் மற்றும் உள்ளீடு நிலை மாற்றங்களுக்கு நிகழ்வு கையாளுதல் எழுத வேண்டும். நீங்கள் ஒரு முன்னோடி குறியீட்டை React க்கு மாற்றும்போது அல்லது ஒரு React நூலகத்துடன் ஒரு non-React பயன்பாட்டை ஒருங்கிணைத்தலின் போது, எரிச்சலூட்ட முடியும்.இந்த சூழ்நிலைகளில், நீங்கள் [கட்டுப்பாடற்ற கூறுகளை](/docs/uncontrolled-components.html), உள்ளீடு வடிவங்களை செயல்படுத்துவதற்கு ஒரு மாற்று நுட்பத்தை பயன்படுத்துங்கள்.

## முழுமையாக ஏற்ற தீர்வுகள் {#fully-fledged-solutions}

முழுமையாக ஏற்ற தீர்வுகள் சரிபார்ப்பு, விஜயமான துறைகள் கண்காணிக மற்றும் படிவத்தை சமர்ப்பித்தல் உள்ளிட்ட முழுமையான தீர்வை தேடுகிறீர்கள் என்றால், [Formik](https://jaredpalmer.com/formik) பிரபலமான தேர்வுகளில் ஒன்றாகும். இருப்பினும், இது கட்டுப்படுத்தப்பட்ட கூறுகளின் மற்றும் மாநில நிர்வகித்தல்  கொள்கைகளால் கட்டப்பட்டுள்ளது- எனவே அவற்றை கற்று புறக்கணிக்க வேண்டாம்.
