---
id: hooks-state
title: நிலை Hook_ஐ பயன்படுத்துதல்
permalink: docs/hooks-state.html
next: hooks-effect.html
prev: hooks-overview.html
---

*Hooks* என்பவை React 16.8 இன் புதிய இணைப்பு. இவை உங்களுக்கு நிலை மற்றும் இதர React அம்சங்களை, வகுப்புகளை(class) எழுதாமலே பயன்படுத்த அனுமதிக்கும். 

[அறிமுக பக்கம்](/docs/hooks-intro.html) Hooks_ஐ பழகுவதற்கு இந்த எடுத்துக்காட்டை பயன்படுத்தியுள்ளது:

```js{4-5}
import React, { useState } from 'react';

function Example() {
  // புதிய நிலை மாறியை அறிவித்து, அதை "count" என அழைப்போம்
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>நீங்கள் {count} முறை சொடுக்கியுள்ளீர்கள்</p>
      <button onClick={() => setCount(count + 1)}>
        என்னை சொடுக்கு
      </button>
    </div>
  );
}
```

நாம் இந்த நிரலையும், அதற்கு இணையான வகுப்பு(class) எடுத்துக்காட்டையும் வேறுபடுத்தி காண்பதன் மூலம் Hooks_ஐ பற்றி அறிய தொடங்குவோம்.

## இணையான வகுப்பு(class) எடுத்துக்காட்டு {#equivalent-class-example}

நீங்கள் இதற்கு முன்பு React_ல் வகுப்புகளை(classes) பயன்படுத்தியிருந்தால், இந்த நிரல் தெரிந்திருக்கும்:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>நீங்கள் {this.state.count} முறை சொடுக்கியுள்ளீர்கள்</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          என்னை சொடுக்கு
        </button>
      </div>
    );
  }
}
```

`{ count: 0 }` என நிலை(state) தொடங்குகிறது மற்றும் பயனர் பொத்தானை சொடுக்கும்போது `this.setState()`_ஐ அழைப்பதன் மூலம் நாம் `state.count`_ஐ அதிகரிப்போம். இந்த வகுப்பில்(class) உள்ள நிரல் துணுக்குகளை நாம் இந்த பக்கம் முழுவதும் பயன்படுத்துவோம்.

>குறிப்பு
>
>நாங்கள் ஏன் இங்கு யதார்த்தமான எடுத்துக்காட்டுக்கு பதிலாக எண்ணிக்கையை பயன்படுத்துகிறோம் என நீங்கள் யோசிக்கலாம். நாம் இன்னும் Hooks_ன் முதல் படிநிலையில் இருப்பதால் இது நமக்கு API_ன் மேல் கவனம் செலுத்த உதவும்.

## Hooks மற்றும் செயல்பாட்டு கூறுகள்(function components) {#hooks-and-function-components}

ஒரு நினைவூட்டலாக, React_ல் செயல்பாட்டு கூறுகள் பின்வருமாறு இருக்கும்:

```js
const Example = (props) => {
  // நீங்கள் இங்கு Hooks_ஐ பயன்படுத்தலாம்!
  return <div />;
}
```

அல்லது இது:

```js
function Example(props) {
  // நீங்கள் இங்கு Hooks_ஐ பயன்படுத்தலாம்!
  return <div />;
}
```

நீங்கள் முன்பு இவற்றை "நிலையற்ற கூறுகள்"(stateless components) என அறிந்திருக்கலாம். இவற்றிலிருந்து React நிலையை பயன்படுத்துவதற்கான திறனை நாங்கள் அறிமுகபடுத்துகிறோம், அதனால் நாங்கள் "செயல்பாட்டு கூறுகள்" என்ற பெயரை தேர்ந்தெடுக்கிறோம்.

Hooks வகுப்புகளுக்கு(classes) உள்ளே வேலை **செய்யாது**. ஆனால் இவற்றை நீங்கள் வகுப்புகளை எழுதுவதற்கு பதிலாக பயன்படுத்தலாம்.

## Hook என்பது என்ன? {#whats-a-hook}

நமது புதிய எடுத்துக்காட்டு `useState` Hookஐ Reactலிருந்து இறக்குமதி செய்வதன் மூலம் தொடங்குகிறது:

```js{1}
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Hook என்பது என்ன?** Hook என்பது சிறப்பு செயல்பாடு, இது தங்களை React அம்சங்களுடன் "இணைக்கின்றது". எடுத்துக்காட்டாக `useState` என்பது ஒரு Hook, இது உங்களுக்கு React நிலையை செயல்பாட்டுக் கூறுகளில் சேர்க்க உதவுகிறது. இதர Hooks பற்றி பிறகு தெரிந்து கொள்வோம்.

**நான் எப்போது Hookஐ பயன்படுத்தலாம்?** நீங்கள் ஏதேனும் ஒரு செயல்பாட்டுக் கூறு எழுதும் போது அதற்கு சில நிலை சேர்ப்பது தேவை என உணரலாம், முன்பு அவற்றை வகுப்புகளாக மாற்றியிருப்பீர்கள். தற்போது முன்பே இருக்கும் செயல்பாட்டுக் கூறின் உள்ளே நீங்கள் Hookஐ பயன்படுத்தலாம். நாம் அதை இப்போதே செய்ய போகிறோம்!

>குறிப்பு:
>
>கூறின் உள்ளே நீங்கள் எங்கு Hooksஐ பயன்படுத்த முடியும் மற்றும் முடியாது என்பதற்கான சில சிறப்பு விதிமுறைகள் உள்ளது. நாம் அதை [Hooksன் விதிமுறைகள்](/docs/hooks-rules.html) பகுதியில் தெரிந்து கொள்வோம்.

## நிலை மாறியை அறிவித்தல் {#declaring-a-state-variable}

ஒரு வகுப்பில், constructor உள்ளே `this.state`ஐ `{ count: 0 }` என அமைப்பதன் மூலம் `count` என்ற நிலைக்கு `0` என்ற தொடக்க மதிப்பளிக்கிறோம்:

```js{4-6}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

ஒரு செயல்பாட்டு கூறில், நமக்கு `this` என்பது இல்லை, அதனால் `this.state`க்கு மதிப்பு வழங்கனவோ, பயன்படுத்தவோ முடியாது. எனவே, இதற்கு பதிலாக `useState` Hookஐ நேரடியாக நமது கூறின் உள்ளே அழைக்கலாம்:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // புதிய நிலை மாறியை அறிவித்து, அதை "count" என அழைப்போம்
  const [count, setCount] = useState(0);
```

**`useState`ஐ அழைக்கும் போது என்ன செய்கிறது?** இது ஒரு "நிலை மாறியை" அறிவிக்கிறது. நமது மாறியை `count` என அழைக்கிறோம் ஆனால் நாம் இவற்றை `banana` போன்ற வேறு எந்த பெயர்களிலும் அழைக்கலாம். இது செயல்பாட்டு அழைப்புகளுக்கிடையே சில மதிப்பகளை பாதுகாக்கும் வழியாகும் - `useState` என்பது, ஒரு வகுப்பில் `this.state` வழங்கும் அதே திறன்களை பயன்படுத்துவதற்கான புதிய வழியாகும். பொதுவாக, செயல்பாடு வெளியேற்றப்படும் போது மாறிகள் "மறைந்துவிடும்" ஆனால் நிலை மாறிகள் React_ஆல் பாதுகாக்கப்படுகிறது.

**What do we pass to `useState` as an argument?** The only argument to the `useState()` Hook is the initial state. Unlike with classes, the state doesn't have to be an object. We can keep a number or a string if that's all we need. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable. (If we wanted to store two different values in state, we would call `useState()` twice.)

**What does `useState` return?** It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`. This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair. If you're not familiar with the syntax we used, we'll come back to it [at the bottom of this page](/docs/hooks-state.html#tip-what-do-square-brackets-mean).

Now that we know what the `useState` Hook does, our example should make more sense:

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

We declare a state variable called `count`, and set it to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. If we want to update the current `count`, we can call `setCount`.

>Note
>
>You might be wondering: why is `useState` not named `createState` instead?
>
>"Create" wouldn't be quite accurate because the state is only created the first time our component renders. During the next renders, `useState` gives us the current state. Otherwise it wouldn't be "state" at all! There's also a reason why Hook names *always* start with `use`. We'll learn why later in the [Rules of Hooks](/docs/hooks-rules.html).

## Reading State {#reading-state}

When we want to display the current count in a class, we read `this.state.count`:

```js
  <p>You clicked {this.state.count} times</p>
```

In a function, we can use `count` directly:


```js
  <p>You clicked {count} times</p>
```

## Updating State {#updating-state}

In a class, we need to call `this.setState()` to update the `count` state:

```js{1}
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

In a function, we already have `setCount` and `count` as variables so we don't need `this`:

```js{1}
  <button onClick={() => setCount(count + 1)}>
    என்னை சொடுக்கு
  </button>
```

## Recap {#recap}

Let's now **recap what we learned line by line** and check our understanding.

<!--
  I'm not proud of this line markup. Please somebody fix this.
  But if GitHub got away with it for years we can cheat.
-->
```js{1,4,9}
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

* **Line 1:** We import the `useState` Hook from React. It lets us keep local state in a function component.
* **Line 4:** Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We're calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we'll name it `setCount`.
* **Line 9:** When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

This might seem like a lot to take in at first. Don't rush it! If you're lost in the explanation, look at the code above again and try to read it from top to bottom. We promise that once you try to "forget" how state works in classes, and look at this code with fresh eyes, it will make sense.

### Tip: What Do Square Brackets Mean? {#tip-what-do-square-brackets-mean}

You might have noticed the square brackets when we declare a state variable:

```js
  const [count, setCount] = useState(0);
```

The names on the left aren't a part of the React API. You can name your own state variables:

```js
  const [fruit, setFruit] = useState('banana');
```

This JavaScript syntax is called ["array destructuring"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we're making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:

```js
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```

When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using `[0]` and `[1]` to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

>Note
>
>You might be curious how React knows which component `useState` corresponds to since we're not passing anything like `this` back to React. We'll answer [this question](/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) and many others in the FAQ section.

### Tip: Using Multiple State Variables {#tip-using-multiple-state-variables}

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give *different* names to different state variables if we want to use more than one:

```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:

```js
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```

You **don't have to** use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always *replaces* it instead of merging it.

We provide more recommendations on splitting independent state variables [in the FAQ](/docs/hooks-faq.html#should-i-use-one-or-many-state-variables).

## Next Steps {#next-steps}

On this page we've learned about one of the Hooks provided by React, called `useState`. We're also sometimes going to refer to it as the "State Hook". It lets us add local state to React function components -- which we did for the first time ever!

We also learned a little bit more about what Hooks are. Hooks are functions that let you "hook into" React features from function components. Their names always start with `use`, and there are more Hooks we haven't seen yet.

**Now let's continue by [learning the next Hook: `useEffect`.](/docs/hooks-effect.html)** It lets you perform side effects in components, and is similar to lifecycle methods in classes.
