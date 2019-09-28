---
id: state-and-lifecycle
title: State and Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

இந்தப் பக்கம் React கூறுகளில் உள்ள நிலை(state) மற்றும் வாழ்க்கை வட்டம்(lifecycle) குறித்து முன்னுரை அளிக்கிறது. கூறுகளின்  விரிவான API குறிப்பை நீங்கள் [இங்கே காணலாம்](/docs/react-component.html).

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

## ஓர் செயக்கூற்றை இனக்குழுவாக மாற்றுதல் {#converting-a-function-to-a-class}

நீங்கள் `Clock` போன்ற ஓர் செயற்கூறு கூறை ஐந்து படிகளில் இனக்குழுவாக மாற்றலாம்:

1. அதே பெயரில், ஓர் [ES6 இனக்குழு](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) `React.Component`-ஐ நீட்டிக்குமாறு உருவாக்குக.

2. அதில் `render()` எனும் ஓர் வெற்று செயற்கூறை சேர்க்கவும்.

3. செயற்கூற்றின் உடலை `render()`-க்கு மாற்றவும்.

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

`Clock` இப்போது செயற்கூறாக இல்லாமல் இனக்குழுவாக வரையறுக்கப்பட்டுள்ளது.

ஒவ்வொரு முறை புதுப்பிப்பத்தல் நடக்கும்போதும் `render` செயற்கூறு அழைக்கப்படும், ஆனால் `<Clock />`-ஐ அதே DOM கணுவினுல் வரையும் வரை, ஒரே ஒரு `Clock` இனக்குழுவின் சான்று மட்டுமே பயன்படுத்தப்படும். இது மேலும் சில அம்சங்களான உள் நிலை மற்றும் வாழ்க்கை வட்ட செயற்கூறுகளை நாம் பயன்படுத்த உதவுகின்றது.

## ஓர் இனக்குழுவில் உள் நிலை(state)-ஐ சேர்த்தல்

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

2) தொடக்க `this.state`-ஐ ஒதுக்கும் [ஓர் இனக்குழு ஆக்கி](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor)-ஐ சேர்க்கவும்.

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

இனக்குழு கூறுகள் எப்போதும் அடிப்படை ஆக்கியை `props` வைத்தே அழைக்கவேண்டும்.

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

## வாழ்க்கை வட்ட செயற்கூறுகளை இனக்குழுவில் இணைத்தல் {#adding-lifecycle-methods-to-a-class}

நிறைய கூறுகள் கொண்ட செயலிகளில், கூறுகள் அழிக்கப்படும் போது அவை கொண்டு இருந்த வளங்களை விடுவிப்பது மிகவும் முக்கியம். 

`Clock` DOM-il mudhalil varaiyapadum poluthu, naam [kadikaiyai amaika]((https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)) vendum. Ithu `eatruthal` ena alaikaipadukirathu.

`Clock` DOM-il irunthu neekapadum pothum, naam [kadikaiyai neeka](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) vendum. Ithu `erakkuthal` ena alaikapadukirathu.


Naam kooru etrapadum pothum irakka padum pothum odumaru sila sirappu seyarkoorukalai kooru vahuppil naam arivikalam.

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

Ivai vaalkai Vatta Seyakoorukal as alaikapadukindrana.

Koorin veliyeedu DOM-il varayapatta pinar than, `componentDidMount()` seyarkooru odum;

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Ippothu naam kadikai-yin ID ai `this` (`this.timerID`)-il pathivu seiya pogirom.

`this.props` React-aal uruvaaka pattalum, `this.state`-iku thani artham irunthalum, aanal neengal thagaval ottathil panguperatha ethanai puthiya thuraikal vendumanalum vaguppil serka iyalum.

`componentWillUnmount()`-ennum vaalkai vatta seyakooril ulla kadikaiyai pirithu parpom.

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Kadaisiyaga, naam `tick()` ennum seyakoorai `Clock` kooril ovvoru nodiyum odumaru seiya vendum.

Ithu `this.setState()`-ai koorin ul-nilai matrangalai thittamida payanpadukirathu.

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

Ippothu kadikaram ovvoru nodiyum thudikrathu.

Ithuvarai nadanthavaikalaiyum seyarkoorukal alaikapadum muraiyaium kanbom:

1) `<Clock/>` `ReactDOM.render()`-iku koduka padum pothu, React `Clock` koorin aaki-yai alaikindrathu. `Clock` tharpothaiya nerathai kaata vendiyathalal, athu `this.state` -ai tharpothaiya nerathai konda porulai veithu thodanki veikrathu. Nam inda nilaiyai pinbu matra irukirom.

2) Aduthathaga React `Clock` koorin `render()` seyarkoorai alaikirathu. Ithai veithuthan React thiraiyil enna kaata vendum enbathai arindu kolkirathu. Pinbu React `Clock`-in varaithal velipatirku porunthumaru DOM ai matri amaikirathu.

3) `Clock`-in velipadu DOM-il nulaika patta pin, React `componentDidMount()` ennum vaalkai vatta seyarkoorai alaikindrathu. Athanul, `Clock` kooru ovvoru nodiyum thanthu `tick()` seyarkoorai alaikum kadikai ondrai amaikumaru browser-ai kettukolkirathu.

4) `tick()` seyarkooru ovvoru nodiyum browser-al alaikapadukirathu. Athanul, `Clock` kooru `setState()`-ai tharupothaiya nerathai konda oru porulai alaithu oru UI matrathai thittamidukirathu. Inda `setState()` vilaivaga, React nilai matrathai arinthu kondu, `render()` seyarkoorai alaithu thiraiyil enna iruka vendum enbathai meendum ariumaru ketukolkirathu. Inda murai, `render()` seyarkoorin `this.state.data` verupattu ullathal, varaithal velipattil matrapatta neram irukum. React DOM-ai atharku etravaru matri amaikirathu.

5) `Clock` kooru eppothavathu DOM-il irunthu neeka pattal, React `componentWillUnmount()`-ennum vaalkai vatta seyarkoorai alaikirathu. Athu kadikaiyai niruthukirathu.

## Nilai-ai sariyaga payanpadutha

`setState()`-ai patri moondru visayangalai neengal arindu kolla vendum.

### Nilaiyai neradiyaga matri amaika koodathu

Eduthukaataga, ithu kooril maru varaithalai undakkathu:

```js
// தவறு
this.state.comment = 'Hello';
```

Instead, use `setState()`:

```js
// சரி
this.setState({comment: 'Hello'});
```

`this.state`-ai aakiyil mattume othuka vendum.

### Nilai matrangal otthisaikathavaiyaga irukalam

React pala `setState()` alaipuhalai seyalthiranukaga orae matramaga kaiaalalam.

`this.props`-um `this.state`-um othisaikamal maruvathal, adutha nilaiyai kanakkiduvatharku athan mathippu-hali nambi iruka koodathu.

Eduthukaataga, inda niral kanakeduppanai matramal pogalam

```js
// தவறு
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Ithai seri seiya, porulukku pathilaha seyalpaatai petrukollum `setState()`-in matroru uruvathai payanpadutha vendum. Anda seyalpaadu mundaya nilayai thanathu muthal ulledagavum, anda matrathin pothu ulla panpuhalai irandam ulledaga petrukollum.

```js
// சரி
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Melae naam [Ammbu Seyalpaatai](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) payan paduthi ullom, aanal avaiyum valakkamana seyalpaaduhalai pol velai seiyakoodiyavai aagum.

```js
// சரி
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### Nilai matrangal ondrakkapadum

`setState()`-ai alaikum pothu, React neengal kodukkum porulai tharpothaiya nilaiyil ondrakkukirathu.

Eduthukaataga, ungal nilai palveru thatcharbu maarihalai kondathaga irukalam.

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Pinbu neengala avaihalai thani thani `setState()` alaipuhalil matram seiyalam:

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

Ondrakkapaduthal maelottamanathe, athanal `this.setState({comments})` `this.state.posts`-ai apdiye vittu vittu `this.state.comments`-ai muluvathumaga matrividukirathu.

## Keele paayum thagaval ottam {#the-data-flows-down}

Petror kooruhalum kulanthai kooruhalum oru kooru nilai kondatha iliya ena ariya iyalathu, atanal avai seiyalpaatalo vahuppalo varaiarukka pattathu ena kavaipada thevai illai.

Ithanalaye naam nilaiyai ullpathaga alaikirom. Athanai amaithu sontham kollum koorai thavira veru yarum anuga mudiyathu.

Oru kooru thanthu nilai-ai thanathu kulanthaihaluku anupalam.

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

Ithu payanar-varaiyarutha koorukalukum porunthum.

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` kooru `date`-ai thanathu panpuhalil petrukollum, aanal athanal anda mathipu `Clock`-in nilai-yil irunthu vanthatha allathu `Clock`-in panpuhalil irunthu vanthatha allathu kaihalal eluthapattatha ena ariya mudiyathu.

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Immuraiyanathu "mel irunthu keel" allathu "orthisai" thagaval ottam ena alaika padukirathu. Ella nilaihalum etho oru kuripitta koorirku sonthamanathakum. Anda nilaiyil irunthu kondu varapatta thagaval allathu UI DOM marathil atahn "keel" ulla koorukalai matume pathikum.

Kooru marathai panbuhalin aruviyaga karpanai seithukondal, ovvoru koorin nilaihalum neer keele payum pothum thannichaiyaga sernthu kollum puthu neer moolangalaga eduthu kollalam.

Kooruhalai mulumaiyaga thanimai padutha, naam moondru `Clock`-kalai varaiyum oru `App` koorai uruvaakalam.

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

Ovvoru `Clock`-um thanathu sontha kadiakaiyai amaithu kondu, matrangalai thannichaya merkolkindrana.

React seyalihalil, oru kooru nilai kondatha illaiya enbathu pinnalil marakoodiya mukiyamana seiyalpaatu vivaramaga kollapadukirathu. Neengal Nilai ilatha kooril nilai ulla kooruhalai yum, nilai ulla kooru halil nilai illathavai halaium payanpaduthalam.
