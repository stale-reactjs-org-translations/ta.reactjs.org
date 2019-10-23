---
id: composition-vs-inheritance
title: கலவை மாறாக மரபுரிமை
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React ஆனது சக்திவாய்ந்த கலவை மாதிரியை கொண்டுள்ளது, மேலும் குறியீடுகளை கூறுகளுக்கு இடையில் மறுபடி உபயோகிக்க மற்றும் மரபுரிமை வழி பெறுதலுக்கு பதிலாக கலவை முறையை பயன்படுத்துவதை நாங்கள் பரிந்துரைக்கிறோம்.

இந்த பிரிவில், புதிதாக React ஐ கற்கும் மென்பொருள் உருவாக்குபவரின் பல சமயங்களில் வாரும் மரபுரிமை வழி பெறுதலின் சில பிரச்சினைகள் நாம் கருத்தில் கொள்வோம். மற்றும் அவற்றை கலவை முறையின் மூலமாக எவ்வாறு தீர்வுகாண முடியும் என்பதைக் காணலாம்.

## கட்டுப்படுத்துதல் {#containment}

சில கூறுகளுக்கு சிறிது நேரத்திற்க்கு முன்பு வரை தனது குழந்தைகள் கூறுகள் (children) தெரிவது இல்லை. இது குறிப்பாக `Sidebar` அல்லது `Dialog` போன்ற கூறுகளுக்கு பொதுவானவை மேலும் அவை பொதுவான "பெட்டிகளை" குறிக்கும்.

அவ்விதமான கூறுகளுக்கு பிரத்யேகமான `children` பண்பு முறையின் மூலமாக குழந்தைகள் கூறுகளை (children) நேரடியாக அவற்றின் வெளிப்பாட்டிற்கு அனுப்ப நாங்கள் பரிந்துரைக்கிறோம்.

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

இது மற்ற கூறுகள் தன்னிச்சையான குழந்தைகளை (children) JSX மூலம் அனுப்ப அனுமதிக்கிறது:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        வரவேற்கிறோம்
      </h1>
      <p className="Dialog-message">
        எங்கள் விண்கலத்தை பார்வையிட்டதற்கு நன்றி!
      </p>
    </FancyBorder>
  );
}
```

**[CodePen-ல் முயற்சி செய்க](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

`<FancyBorder>` உள்ளே அனுப்பப்படும் எதுவானாலும் JSX குறிச்சொல்லானது அவற்றை கூறின் குழந்தை (children) பண்பாகவே எடுத்துக்கொள்ளும். ஏனெனில் `FancyBorder` ஆனது  `{props.children}` ஐ `<div>` க்குள் தான் வரையும், அனுப்பப்பட்ட கூறானது இறுதி வெளிப்பாட்டில் தோன்றும்.

இதுபோன்ற முறை குறைவாகவே காணப்படுகிறது, சில நேரங்களில் உங்களுக்கு ஓரே கூறில் பல "துளைகள்" தேவைப்படலாம். இதுபோன்ற சந்தர்ப்பங்களில் நீங்கள் `children` ஐ பயன்படுத்துவதற்கு பதிலாக உங்கள் சொந்த வழக்கத்தை கொண்டு வரலாம்:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

`<Contacts />` மற்றும் `<Chat />` போன்ற React ன் கூறுகள் வெறும் பொருட்களோ ஆகும், அதனால் நீங்கள் மற்ற தகவல்களை பண்புகள் வழியாக அனுப்புவதை போன்றே அவற்றையும் ஆனுப்பலாம். இந்த அணுகுமுறை மற்ற நூலகங்கள் உள்ள "இடங்களை" உங்களுக்கு நினைவூட்டக்கூடும் ஆனால் React ல் நீங்கள் ஆனுப்பும் எந்த பண்புகளுக்கும் வரம்புகள் எதுவும் இல்லை.

##  சிறப்பறிவு {#specialization}

சில நேரங்களில் கூறுகலானது மற்ற கூறுகளின் "சிறப்பு வகையாக" உங்களுக்கு தோன்றலாம். உதாரணத்திற்கு, `WelcomeDialog` ஆனது `Dialog`ன் சிறப்பு வகையாக சொல்லலாம்.

React'ல், கலவையைக் கொண்டு இதனை அடையலாம், ஒரு குறிப்பிட்ட கூறானது மிகவும் பொதுவான கூற' ஐ வரையும் மற்றும் பண்புகள் வழியாக அவற்றை கட்டமைக்கப்படும்படி இருக்கும்:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="வரவேற்கிறோம்"
      message="எங்கள் விண்கலத்தை பார்வையிட்டதற்கு நன்றி!" />
  );
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

வகுப்புகளாக வரையறுக்கப்பட்ட கூறுக்கு இணையாக கலவை ஆனது செய்யல்படும்:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="செவ்வாய் கிரக ஆய்வு திட்டம்"
              message="நாங்கள் உங்களை எவ்வாறு குறிப்பிட வேண்டும்?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          என்னை பதிவு செய்க!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## எனவே மரபுரிமை என்பது என்ன? {#so-what-about-inheritance}

Facebook இல், ஆயிரக்கணக்கான கூறுகளை React'ல் பயன்படுத்துகிறோம், மற்றும் நாங்கள் மரபுரிமை முறையை கொண்டு கூறுகளை உருவாக்கும் எந்த பயன்பாட்டையும் கண்டதில்லை.

கூறுகளின் தோற்றம், நடத்தை'ஐ பண்பு மற்றும் கலவை முறையின் மூலமாக நீங்கள் உங்களுக்கு தேவையான தோற்றதை விளக்கமான மற்றும் பாதுகாப்பான வழியில் மாற்றி அமைக்கலாம். கூற்றுகளானது தன்னிச்சையான பண்பு, பழைய மதிப்புகள் உட்பட, React உறுப்புகள், அல்லது செயல்பாடுகளை ஏற்றுக்கொள்ளும் என்பதை நினைவில் வைத்துக்கொள்ளுங்கள்.

UI அல்லாது செயல்பாடுகளை கூறுகளுக்கு இடையில் மறுபடி உபயோகிக்க வேண்டும் என்றால்,நாங்கள் அவற்றை தனிப்பட்ட JavaScript தொகுதியாக பிரித்தெடுக்க பரிந்துரைக்கிறோம். இவ்வகை கூறுகளை நீட்டிக்காமல் அதை இறக்குமதி செய்து அவைற்றை செயல்பாடாக, பொருளாக, அல்லது ஒரு வகுப்பாக உபயோகிக்கலாம்.
