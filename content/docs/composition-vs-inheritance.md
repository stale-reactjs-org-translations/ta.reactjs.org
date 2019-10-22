---
id: composition-vs-inheritance
title: கலவை மாறாக பரம்பரை
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React ஆனது சக்திவாய்ந்த கலவை மாதிரியை உள்ளது, மேலும் குறியீடுகளை கூறுகளுக்கு இடையில் மறுபடி உபயோகிக்க மற்றும் பரம்பரை வழியிலிருந்து பெறுதலுக்கு பதிலாக கலவையை பயன்படுத்துவதை நாங்கள் பரிந்துரைக்கிறோம்.

இந்த பிரிவில், புதிதாக React கற்கும் மென்பொருள் உருவாக்குபவரின் பல சமயங்களில் வாரும் பரம்பரை வழியிலிருந்து பெறுதலின் சில பிரச்சினைகள் நாம் சிந்திப்போம்.

## கட்டுப்படுத்தல் {#containment}

சில கூறுகளுக்கு சிறிது நேரத்திற்க்கு முன்பு வரை தனது குழந்தைகள் கூறுகள் தெரிவது இல்லை. இது குறிப்பாக `Sidebar` அல்லது `Dialog` போன்ற கூறுகளுக்கு பொதுவானவை அவை பொதுவான "பெட்டிகளை" குறிக்கும்.

அவ்விதமான கூறுகளுக்கு பிரத்யேகமான `children` பண்பு முறையின் மூலமாக குழந்தைகள் கூறுகளை நேரடியாக அவற்றின் வெளிப்பாட்டிற்கு அனுப்ப நாங்கள் பரிந்துரைக்கிறோம்.

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

This lets other components pass arbitrary children to them by nesting the JSX:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

`<FancyBorder>` உள்ளே அனுப்பப்படும் எதுவானாலும் JSX குறிச்சொல்லானது அவற்றை கூறின் குழந்தை பண்பாகவே எடுத்துக்கொள்ளும். ஏனெனில் `FancyBorder` ஆனது  `{props.children}` ஐ `<div>` க்குள் தான் வரையும், அனுப்பப்பட்ட கூறானது இறுதி வெளிப்பாட்டில் தோன்றும்.

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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

`<Contacts />` மற்றும் `<Chat />` போன்ற React ன் கூறுகள் வெறும் பொருட்களோ ஆகும், அதனால் நீங்கள் மற்ற தகவல்களை பண்புகள் வழியாக அனுப்புவதை போன்றே அவற்றையும் ஆனுப்பலாம். இந்த அணுகுமுறை மற்ற நூலகங்கள் உள்ள "இடங்களை" உங்களுக்கு நினைவூட்டக்கூடும் ஆனால் React ல் நீங்கள் ஆனுப்பும் எந்த பண்புகளுக்கும் வரம்புகள் எதுவும் இல்லை.

## Specialization {#specialization}

Sometimes we think about components as being "special cases" of other components. For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.

In React, this is also achieved by composition, where a more "specific" component renders a more "generic" one and configures it with props:

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
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Composition works equally well for components defined as classes:

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
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
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

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## So What About Inheritance? {#so-what-about-inheritance}

At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.

Props and composition give you all the flexibility you need to customize a component's look and behavior in an explicit and safe way. Remember that components may accept arbitrary props, including primitive values, React elements, or functions.

If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. The components may import it and use that function, object, or a class, without extending it.
