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

மேற்கூறிய இரு கூறுகளும்  Reactயின் பார்வையில் சமமானவையே.

வகுப்புகள்[Classes] சில கூடுதல் அம்சங்களைக் கொண்டிருக்கின்றன, அவை [அடுத்த பிரிவுகளில்](/docs/state-and-lifecycle.html) விவாதிக்கப்படும். அதுவரை, நாம் சுருக்கமான தகவல்களை கொண்ட செயல்பாட்டு கூறுகளை பயன்படுத்துவோம்.

## கூறு வரைதல் {#rendering-a-component}

முன்னதாக, DOM குறிச்சொற்களை பிரதிநிதித்துவப்படுத்தும் செயல்பாட்டு கூறுகளை மட்டுமே நாம் சந்தித்தோம்:

```js
const element = <div />;
```

இருப்பினும், உறுப்புகளை பயனர் வரையறுக்கப்பட்ட கூறுகளை கொண்டும் பிரதிநிதித்துவப்படுத்தலாம்:

```js
const element = <Welcome name="Sara" />;
```

React இந்த வகை பயனர் வரையறுக்கப்பட்ட கூறு குறிக்கும் உறுப்பை பார்க்கும் பொழுது, அந்த கூறுக்கு JSX பண்புகளை ஒற்றை பொருளாக கொடுக்கின்றது. நாம் இவற்றை "props" என்று அழைக்கின்றோம்.

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

1. நாம் `ReactDOM.render ()`ஐ `<Welcome name="Sara" />` உறுப்பு பயன்படுத்தி அழைக்கிறோம்.
2. React `Welcome` கூறை `{name: 'Sara'}` பண்புகளை கொண்டு அழைக்கும்.
3. நம்முடைய `Welcome` கூறானது தற்போது `<h1>Hello, Sara</h1>` உறுப்பை முடிவாக திருப்பி கொடுக்கின்றது.
4. React DOM திறமையாக DOMஐ மேம்படுத்தி `<h1>Hello, Sara</h1>`ஐ பொருத்துக்கின்றது.

>**Note:** எப்பொழுதும் கூறு பெயர்களைத் capital எழுத்துக்கள் கொண்டு தொடங்குங்கள்.
>
>React lowercase எழுத்துக்கள் கொண்டு தொடங்கும் கூறுகளை DOM குறிச்சொற்கள் என்று கருதுகிறது. உதாரணமாக `<div />` ஆனது HTML div குறிச்சொலை குறிக்கின்றது, ஆனால் `<Welcome />` கூறை குறிக்கின்றது.
>
>இந்த வழக்கத்திற்கு பின்னால் உள்ள காரணங்களைப் பற்றி மேலும் அறிய, தயவு செய்து [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) படிக்கவும்.

## Composing Components {#composing-components}

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

## Extracting Components {#extracting-components}

Don't be afraid to split components into smaller components.

For example, consider this `Comment` component:

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

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few components from it.

First, we will extract `Avatar`:

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

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the component's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

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

Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user's name:

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

This lets us simplify `Comment` even further:

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

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props are Read-Only {#props-are-read-only}

Whether you declare a component [as a function or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.
