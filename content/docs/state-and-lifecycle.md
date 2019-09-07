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

4. Replace `props` with `this.props` in the `render()` body.

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

ஒவ்வொரு முறை புதுப்பிப்பத்தல் நடக்கும்போதும் `render` செயற்கூறு அழைக்கப்படும், ஆனால் `<Clock />`-ஐ அதே DOM கணுவினுல் வரையும் வரை, ஒரே ஒரு `Clock` இனக்குழுவின் சான்று மட்டுமே பயன்படுத்தப்படும். இது மேலும் சில அம்சங்களான உள் நிலைகள் மற்றும் வாழ்க்கை வட்ட செயற்கூறுகளை நாம் பயன்படுத்த உதவுகின்றது.

## Adding Local State to a Class {#adding-local-state-to-a-class}

We will move the `date` from props to state in three steps:

1) Replace `this.props.date` with `this.state.date` in the `render()` method:

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

2) Add a [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:

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

Note how we pass `props` to the base constructor:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Class components should always call the base constructor with `props`.

3) Remove the `date` prop from the `<Clock />` element:

```js{2}
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

We will later add the timer code back to the component itself.

The result looks like this:

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

Next, we'll make the `Clock` set up its own timer and update itself every second.

## Adding Lifecycle Methods to a Class {#adding-lifecycle-methods-to-a-class}

In applications with many components, it's very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called "mounting" in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called "unmounting" in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:

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

These methods are called "lifecycle methods".

The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Note how we save the timer ID right on `this` (`this.timerID`).

While `this.props` is set up by React itself and `this.state` has a special meaning, you are free to add additional fields to the class manually if you need to store something that doesn’t participate in the data flow (like a timer ID).

We will tear down the timer in the `componentWillUnmount()` lifecycle method:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Finally, we will implement a method called `tick()` that the `Clock` component will run every second.

It will use `this.setState()` to schedule updates to the component local state:

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

Now the clock ticks every second.

Let's quickly recap what's going on and the order in which the methods are called:

1) When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.

2) React then calls the `Clock` component's `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`'s render output.

3) When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component's `tick()` method once a second.

4) Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.

5) If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

## Using State Correctly {#using-state-correctly}

There are three things you should know about `setState()`.

### Do Not Modify State Directly {#do-not-modify-state-directly}

For example, this will not re-render a component:

```js
// Wrong
this.state.comment = 'Hello';
```

Instead, use `setState()`:

```js
// Correct
this.setState({comment: 'Hello'});
```

The only place where you can assign `this.state` is the constructor.

### State Updates May Be Asynchronous {#state-updates-may-be-asynchronous}

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:

```js
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State Updates are Merged {#state-updates-are-merged}

When you call `setState()`, React merges the object you provide into the current state.

For example, your state may contain several independent variables:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Then you can update them independently with separate `setState()` calls:

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

The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

## The Data Flows Down {#the-data-flows-down}

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn't care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:

```js
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

This also works for user-defined components:

```js
<FormattedDate date={this.state.date} />
```

The `FormattedDate` component would receive the `date` in its props and wouldn't know whether it came from the `Clock`'s state, from the `Clock`'s props, or was typed by hand:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePen-ல் முயற்சி செய்க**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

This is commonly called a "top-down" or "unidirectional" data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components "below" them in the tree.

If you imagine a component tree as a waterfall of props, each component's state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:

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

Each `Clock` sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.
