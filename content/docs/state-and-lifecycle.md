---
id: state-and-lifecycle
title: State and Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

இந்தப் பக்கம் React கூறுகளில் உள்ள நிலை(state) மற்றும் வாழ்க்கை சுழற்சி (lifecycle) குறித்து முன்னுரை அளிக்கிறது. கூறுகளின்  விரிவான API குறிப்பை நீங்கள் [இங்கே காணலாம்](/docs/react-component.html).

[முந்தைய பிரிவு ஒன்றில்](/docs/rendering-elements.html#updating-the-rendered-element) குறிப்பிடப்பட்டுள்ள சுழலும் கடிகார எடுத்துக்காட்டை எடுத்துக்கொள்க. [வரையும் உறுப்புகளில்](/docs/rendering-elements.html#rendering-an-element-into-the-dom), UI-ல் மாற்றம் செய்யும் ஒரே வழியை அறிந்தோம். வரையப்பட்ட வெளியீட்டை மாற்ற நாம் `ReactDOM.render()`யை அழைக்கிறோம்:

```js{8-11}
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

`Clock` கூறை முழுமையாக மறுபயனாக்குதல் மற்றும் உறைபொதியாக்குதல் குறித்து, இந்த பிரிவில் நாம் அறிய உள்ளோம்.

நாம் கடிகாரத்தின் தோற்றத்தை உறைபொதியாக்குதலிருந்து தொடங்கலாம்:


```js{3-6,12}
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

இருப்பினும், முக்கிய தேவையை இது பூர்த்தி செய்யவில்லை: `Clock` ஒர் கடிகையை அமைத்து, UI-ஐ ஒவ்வொரு நொடியும் புதுப்பிப்பதே `Clock`-ன் செயற்படுத்துகை விளக்கமாக இருக்க வேண்டும்.

பொதுவாக, இதை ஒரு முறை எழுதிவிட்டு, `Clock`-ஐ தானாகவே புதுப்பிக்க வைப்பதையே நாம் விரும்புவோம்:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

இதனை செயல்படுத்த, நாம் "state(நிலை)"-ஐ `Clock`-இனுல் சேர்க்க வேண்டும்.

நிலையும் உள்ளீடைப் போன்றதே, ஆனால் இது கூறின் தனிப்பட்டதாகவும் மற்றும் முழுமையான கட்டுப்பாட்டிலும் இருக்கும்.

## ஓர் செயக்கூற்றை வகுப்பாக மாற்றுதல் {#converting-a-function-to-a-class}

நீங்கள் `Clock` போன்ற ஓர் செயற்கூறு கூறை ஐந்து படிகளில் வகுப்பாக மாற்றலாம்:

1. அதே பெயரில், ஓர் [ES6 வகுப்பு](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) `React.Component`-ஐ நீட்டிக்குமாறு உருவாக்குக.

2. அதில் `render()` எனும் ஓர் வெற்று செயற்கூறை சேர்க்கவும்.

3. செயற்கூறின் உடலை `render()`-க்கு மாற்றவும்.

4. `render()` உடலில் `props`-ஐ `this.props`-ஆக மாற்றவும்.

5. மீதமுள்ள வெற்று செயற்கூறு அறிவிப்பை நீக்கவும்.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` இப்போது செயற்கூறாக இல்லாமல் வகுப்பாக வரையறுக்கப்பட்டுள்ளது.

ஒவ்வொரு முறை புதுப்பிப்பத்தல் நடக்கும்போதும் `render` செயற்கூறு அழைக்கப்படும், ஆனால் `<Clock />`-ஐ அதே DOM கணுவினுல் வரையும் வரை, ஒரே ஒரு `Clock` வகுப்பின் சான்று மட்டுமே பயன்படுத்தப்படும். இது மேலும் சில அம்சங்களான உள் நிலை மற்றும் வாழ்க்கை சுழற்சி செயற்கூறுகளை நாம் பயன்படுத்த உதவுகின்றது.

## ஓர் வகுப்பில் உள் நிலை(state)-ஐ சேர்த்தல்

நாம் `date`-ஐ பண்புகளிலிருந்து உள் நிலைக்கு மூன்று படிகளில் மாற்றுவோம்:

1) `render()` செயற்கூறில் உள்ள `this.props.date`-ஐ `this.state.date`-க்கு மாற்றவும்:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2) தொடக்க `this.state`-ஐ ஒதுக்கும் [ஓர் வகுப்பு ஆக்கி](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)-ஐ சேர்க்கவும்.

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

நாம் `props`-ஐ அடிப்படை ஆக்கிக்கு அனுப்புவதை கவனிக்கவும்:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

வகுப்பு கூறுகள் எப்போதும் அடிப்படை ஆக்கியை `props` வைத்தே அழைக்கவேண்டும்.

3) `date` பண்பை `<Clock />`-லிருந்து நீக்கவும்:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

நாம் கடிகை நிரலை கூறினுள்ளேயே பின்பு சேர்க்க உள்ளோம்.

அதன் முடிவு இவ்வாறு இருக்கும்:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

அடுத்து, நாம் `Clock` தானாகவே தன் கடிகையை அமைத்துக்கொண்டும், ஒவ்வொரு நொடிக்கும் புதுப்பித்துக்கொண்டும் இருக்குமாறு செய்ய வேண்டும்.

## வாழ்க்கை சுழற்சி செயற்கூறுகளை வகுப்பில் இணைத்தல் {#adding-lifecycle-methods-to-a-class}

நிறைய கூறுகள் கொண்ட செயலிகளில், கூறுகள் அழிக்கப்படும் போது அவை கொண்டு இருந்த வளங்களை விடுவிப்பது மிகவும் முக்கியம். 

`Clock` DOM-இல் முதலில் வரையப்படும் பொழுது, நாம் [கடிகையை அமைக்க]((https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)) வேண்டும். இது `ஏற்றுதல்` என அழைக்கப்படுகிறது.

`Clock` DOM-இல் இருந்து நீக்கப்படும் போதும், நாம் [கடிகையை நீக்க](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) வேண்டும். இது `இறக்குதல்` என அழைக்கப்படுகிறது.

நாம் கூறு ஏற்றப்படும் போதும் இறக்க படும் போதும் ஓடுமாறு சில சிறப்பு செயற்கூறுகளை கூறு வகுப்பில் நாம் அறிவிக்கலாம்.

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

இவை வாழ்க்கை சுழற்சி செயக்கூறுகள் என அழைக்கப்படுகின்றன.

கூறின் வெளியீடு DOM-இல் வரையப்பட்ட பின்னர் தான், `componentDidMount()` செயற்கூறு ஓடும்;

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

இப்போது நாம் கடிகையின் ID-ஐ `this` (`this.timerID`)-இல் பதிவு செய்ய போகிறோம்.

`this.props` React-ஆள் உருவாக்க பட்டாலும், `this.state`-இங்கு தனி அர்த்தம் இருந்தாலும், நீங்கள் தகவல் ஓட்டத்தில் பங்குபெறாத எத்தனை புதிய துறைகள் வேண்டுமானாலும் வகுப்பில் சேர்க்க இயலும்.

`componentWillUnmount()`-என்னும் வாழ்க்கை சுழற்சி செயற்கூறில் உள்ள கடிகையை பிரித்து பார்ப்போம்.

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

கடைசியாக, நாம் `tick)` என்னும் செயக்கூறை `Clock` கூறில் ஒவ்வொரு நொடியும் ஓடுமாறு செய்ய வேண்டும்.

இது `this.setState()`-ஐ கூறின் உள்நிலை மாற்றங்களை திட்டமிட பயன்படுகிறது.

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

இப்போது கடிகாரம் ஒவ்வொரு நொடியும் துடிக்கிறது.

இதுவரை நடந்தவைகளையும் செயற்கூறுகள் அழைக்கப்படும் முறையையும் காண்போம்:

1) `<Clock/>` `ReactDOM.render()`-க்கு கொடுக்க படும் போது, React `Clock` கூறின் ஆக்கி-யை அழைக்கின்றது. `Clock` தற்போதைய நேரத்தை காட்ட வேண்டியதலால், அது `this.state` -ஐ தற்போதைய நேரத்தை கொண்ட பொருளை வைத்து தொடக்கி வைக்கிறது. நம் இந்த நிலையை பின்பு மாற்ற இருக்கிறோம்.

2) அடுத்ததாக React `Clock` கூறின் `render()` செயற்கூறை அழைக்கிறது. இதை வைத்துத்தான் React திரையில் என்ன காட்ட வேண்டும் என்பதை அறிந்து கொள்கிறது. பின்பு React `Clock`-இன் வரைதல் வெளிப்பாட்டிற்கு பொருந்துமாறு DOM-ஐ மாற்றி அமைக்கிறது.

3) `Clock`-இன் வெளிபாடு DOM-இல் நுழைக்க பட்ட பின், React `componentDidMount()` என்னும் வாழ்க்கை சுழற்சி செயற்கூறை அழைக்கின்றது. அதனுள், `Clock` கூறு ஒவ்வொரு நொடியும் தனது `tick()` செயற்கூறை அழைக்கும் கடிகை ஒன்றை அமைக்குமாறு browser-ஐ கேட்டுக்கொள்கிறது.

4) `tick()` செயற்கூறு ஒவ்வொரு நொடியும் browser-ஆள் அழைக்கப்படுகிறது. அதனுள், `Clock` கூறு `setState()`-ஐ தற்போதைய நேரத்தை கொண்ட ஒரு பொருளை அழைத்து ஒரு UI மாற்றத்தை திட்டமிடுகிறது. இந்த `setState()` விளைவாக, React நிலை மாற்றத்தை அறிந்து கொண்டு, `render()` செயற்கூறை அழைத்து திரையில் என்ன இருக்க வேண்டும் என்பதை மீண்டும் அறியுமாறு கேட்டுக்கொள்கிறது. இந்த முறை, `render()` செயற்கூறின் `this.state.data` வேறுபட்டு உள்ளதால், வரைதல் வெளிப்பாட்டில் மாற்றப்பட்ட நேரம் இருக்கும். React DOM-ஐ அதற்கு ஏற்றவாறு மாற்றி அமைக்கிறது.

5) `Clock` கூறு எப்போதாவது DOM-இல் இருந்து நீக்க பட்டால், React `componentWillUnmount()`-என்னும் வாழ்க்கை சுழற்சி செயற்கூறை அழைக்கிறது. அது கடிகையை நிறுத்துகிறது.

## நிலையை சரியாக பயன்படுத்த

`setState()`-ஐ பற்றி மூன்று விஷயங்களை நீங்கள் அறிந்து கொள்ள வேண்டும்.

### நிலையை நேரடியாக மாற்றி அமைக்க கூடாது

எடுத்துக்காட்டாக, இது கூறில் மறு வரைதலை உண்டாக்காது:

```js
// தவறு
this.state.comment = 'Hello';
```

மாறாக, `setState()`-ஐ பயன்படுத்தவும்:

```js
// சரி
this.setState({comment: 'Hello'});
```

`this.state`-ஐ ஆக்கியில் மட்டுமே ஒதுக்க வேண்டும்.

### நிலை மாற்றங்கள் ஒத்திசைக்காதவையாக இருக்கலாம்

React பல `setState()` அழைப்புகளை செயல்திறனுக்காக ஒரே மாற்றமாக கையாளலாம்.

`this.props`-உம் `this.state`-உம் ஒத்திசைக்காமல் மாறுவதால், அடுத்த நிலையை கணக்கிடுவதற்கு அதன் மதிப்புகளை நம்பி இருக்க கூடாது.

எடுத்துக்காட்டாக, இந்த நிரல் `counter`-ஐ மாற்றாமல் போகலாம்

```js
// தவறு
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

இதை சரி செய்ய, பொருளுக்கு பதிலாக செயல்பாட்டை பெற்றுக்கொள்ளும் `setState()`-இந் மற்றொரு உருவத்தை பயன்படுத்த வேண்டும். அந்த செயல்பாடு முந்தய நிலையை தனது முதல் உள்ளீடாகவும், அந்த மாற்றத்தின் போது உள்ள பண்புகளை இரண்டாம் உள்ளீடாக பெற்றுக்கொள்ளும்.

```js
// சரி
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

மேலே நாம் [அம்பு செயல்பாட்டை](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) பயன் படுத்தி உள்ளோம், அனால் அவையும் வழக்கமான செயல்பாடுகளை போல் வேலை செய்யக்கூடியவை ஆகும்.

```js
// சரி
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### நிலை மாற்றங்கள் ஒன்றாக்கப்படும்

`setState()`-ஐ அழைக்கும் போது, React நீங்கள் கொடுக்கும் பொருளை தற்போதைய நிலையில் ஒன்றாக்குகிறது.

எடுத்துக்காட்டாக, உங்கள் நிலை பல்வேறு தற்சார்பு மாறிகளை கொண்டதாக இருக்கலாம்.

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

பின்பு நீங்களே அவைகளை தனித் தனி `setState()` அழைப்புகளில் மாற்றம் செய்யலாம்:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

ஒன்றாக்கப்படுத்தல் மேலோட்டமானதே, அதனால் `this.setState({comments})` `this.state.posts`-ஐ அப்படியே விட்டு விட்டு `this.state.comments`-ஐ முழுவதுமாக மாற்றிவிடுகிறது.

## தகவல் கீழே பாயும் {#the-data-flows-down}

பெற்றோர் கூறுகளும் குழந்தை கூறுகளும் ஒரு கூறு நிலை கொண்டதை இல்லையா என அறிய இயலாது, அதனால் அவை செயல்பாட்டாலோ வகுப்பிலோ வரையறுக்க பட்டது என கவைப்பட தேவை இல்லை.

இதனாலேயே நாம் நிலையை உற்பட்டதாக அழைக்கிறோம். அதனை அமைத்து சொந்தம் கொள்ளும் கூரை தவிர வேறு யாரும் அணுக முடியாது.

ஒரு கூறு தனது நிலை-ஐ தனது குழந்தைகளுக்கு அனுப்பலாம்.

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

இது பயனர்-வரையறுத்த கூறுகளுக்கும் பொருந்தும்.

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` கூறு `date`-ஐ தனது பண்புகளில் பெற்றுக்கொள்ளும், அனால் அதனால் அந்த மதிப்பு `Clock`-இன் நிலையில் இருந்து வந்ததா அல்லது `Clock`-இன் பண்புகளில் இருந்து வந்ததா அல்லது கைகளால் எழுதப்பட்டதா என அறிய முடியாது.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

இம்முறையானது "மேல் இருந்து கீழ்" அல்லது "ஒத்திசை" தகவல் ஓட்டம் என அழைக்க படுகிறது. எல்லா நிலைகளும் எதோ ஒரு குறிப்பிட்ட கூறிற்கு சொந்தமானதாகும். ஆண்ட நிலையில் இருந்து கொண்டு வரப்பட்ட தகவல் அல்லது UI DOM மரத்தில் அதன் "கீழ்" உள்ள கூறுகளை மட்டுமே பாதிக்கும்.

கூறு மரத்தை பண்புகளின் அருவியாக கற்பனை செய்துகொண்டால், ஒவ்வொரு கூறின் நிலைகளும் நீர் கீழே பாயும் போதும் தன்னிச்சையாக சேர்ந்து கொள்ளும் புது நீர் மூலங்களாக எடுத்து கொள்ளலாம்.

கூறுகளை முழுமையாக தனிமை படுத்த, நாம் மூன்று `Clock`-களை வரையும் ஒரு `App` கூறை உருவாக்கலாம்.

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

ஒவ்வொரு `Clock`-உம் தனது சொந்த கடிகையை அமைத்து கொண்டு, மாற்றங்களை தன்னிச்சையாக மேற்கொள்கின்றன.

React செயலிகளில், ஒரு கூறு நிலை கொண்டதை இல்லையா என்பது பின்னாளில் மாறக்கூடிய முக்கியமான செயல்பாடு விவரமாக கொள்ளப்படுகிறது. நீங்கள் நிலை இல்லாத கூறில் நிலை உள்ள கூறுகளையும், நிலை உள்ள கூறுகளில் நிலை இல்லாதவைகளையும் பயன்படுத்தலாம்.
