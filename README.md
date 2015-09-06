# Learning ES6

ECMAScript 6 is the new version of JavaScript making its way into the interpreters of our modern browsers and servers. The specification is filled with lots of new features; much more than ECMAScript 5 which came out way back in 2009. The [*Learning ES6* blog series](http://www.benmvp.com/2015/08/the-learning-es6-series.html) is walking through all of the major features in significant detail to hopefully provide a deeper level of understanding to features you may have already heard about. This repo contains all the [code examples](http://benmvp.github.io/learning-es6) used throughout the series.

The following, however, is a listing of all of the ES6 features and the basic way in which the feature is used:

- [Arrow functions](#arrow-functions)
- [Block-level scoping](#block-level-scoping)
- [Destructuring](#destructuring)
- [Parameter handling](#parameter-handling)
- [Enhanced object literals](enhanced-object-literals)
- [Template literals](#template-literals)
- [Promises](#promises)
- [Generators](#generators)
- [Classes](#classes)
- [Modules](#modules)
- [Maps](#maps)
- [Sets](#sets)
- [Iterables and iterators](#iterables-and-iterators)
- [New APIs](#new-apis)

## Using ES6 right now

Support for ES6 functionality in JS engines is growing every week and kept up to date by [Kangax’s ES6 compatibility matrix](http://kangax.github.io/compat-table/es6/). However:

- ES6 support is still fairly low across browsers & servers (max is less than 70%)
- The features that are supported differ between browsers (with some overlap)
- None of the IE browsers significantly support ES6 (the new Microsoft Edge browser does)

As a result, you cannot yet reliable run ES6 natively client- or server-side. Your best bet is compiling your ES6 code down to ES5 using transpilation tools like [Babel](https://babeljs.io/), [Traceur](https://github.com/google/traceur-compiler) or [TypeScript](http://www.typescriptlang.org/) as part of your build process.

**More info:** [Blog post](http://www.benmvp.com/2015/08/learning-es6-using-es6-right-now.html)

## Arrow functions

Arrow functions, aka "fat arrows", are more or less a shorthand form of anonymous function expressions that already exist in JavaScript. The best thing about arrow functions, aside from the terse syntax, is that `this` uses lexical scoping; its value is always “inherited” from the enclosing scope.

```js
// Expression syntax
var squares = [1, 2, 3].map(x => x * x);
var sum = [9, 8, 7].reduce((memo, value) => memo + value, 0);
var getRandom = () => Math.random() * 100;

// Block syntax
$("#deleteButton").click(event => {
    if (confirm(“Are you sure?”)) {
        clearAll();
    }
});

// Lexical this binding
var car = {
    speed: 0,
    accelerate: function() {
        this.accelerator = setInterval(
            () => {
                // *this* is the same as it is outside
                // of the arrow function!
                this.speed++;
                console.log(this.speed);
            },
            100
        );
    },
    cruise: function() {
        clearInterval(this.accelerator);
        console.log('cruising at ' + this.speed + ' mph');
    }
};
```

**More info:** [Blog post](http://www.benmvp.com/2015/08/learning-es6-arrow-functions.html) | [Browser examples](http://benmvp.github.io/learning-es6/#arrow-functions) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/arrow-functions.js)

## Block-level scoping

`let` is the new `var`. By using block-level scoping, `let` and `const` help developers avoid common mistakes they make not because they write bad code, but because they don’t fully understand the idiosyncrasies of how JavaScript handles variables. Variables declared via `let` are not available outside of the block in which they are declared. Variables declared via `const` also cannot be updated. These pretty much replace the ES3 or ES5 way of declaring variables using `var`.

```js
function simpleExample(value) {
    const constValue = value;

    if (value) {
        var varValue = value;
        let letValue = value;

        console.log('inside block', varValue, letValue);
    }

    console.log('outside block');

    // varValue is available even though it was defined
    // in if-block because it was "hoisted" to function scope
    console.log(varValue);

    try {
        // letValue is a ReferenceError because it
        // was defined w/in if-block
        console.log(letValue);
    }
    catch (e) {
        // e is a ReferenceError
        console.log('letValue not accessible', e);
    }

    // SyntaxError to try and update a variable
    // declared via const
    //constValue += 1;
}
```

**More info:** [Blog post](http://www.benmvp.com/2015/08/learning-es6-block-level-scoping-let-const.html) | [Browser examples](http://benmvp.github.io/learning-es6/#block-scoping) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/block-scoping.js)

## Destructuring

Destructuring makes it easier to work with objects and arrays in JavaScript. Using a pattern syntax similar to object and array literals, we can poke into data structures and pick out the information we want into variables.

```js
// Object pattern matching
let {lName, fName} = {fName: 'John', age: 15, lName: 'Doe'};

// output: Doe, John
console.log(lName + ', '+ fName);

// Array pattern matching
let [first, second, third] = [8, 4, 100, -5, 20];

// output: 100, 4, 8
console.log(third, second, first);
```

**More info:** [Blog post](http://www.benmvp.com/2015/09/learning-es6-destructuring.html) | [Browser examples](http://benmvp.github.io/learning-es6/#destructuring) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/destructuring.js)

## Parameter handling

More ways to deal with the arguments to a function

```js
// code example coming soon
```


## Enhanced object literals

Various shorthand syntaxes for building up object literals

```js
// code example coming soon
```


## Template literals

Much cleaner way to build up string values

```js
// code example coming soon
```

## Promises

An alternative to callback functions for handling asynchronous operations 

```js
// code example coming soon
```

## Generators

Specialized functions that create iterators using `yield` keyword

```js
// code example coming soon
```

## Classes

A formalized approach to define classes in JavaScript 

```js
// code example coming soon
```

## Modules

Provide a modular of organizing and loading JavaScript code 

```js
// code example coming soon
```

## Maps

Dictionary-type object that can store key/value pairs 

```js
// code example coming soon
```

## Sets

A collection object that can store a unique list of values

```js
// code example coming soon
```

## Iterables and Iterators

A new ES6 interface for iteration

```js
// code example coming soon
```

## New APIs

New APIs for existing native JavaScript classes `Math`, `Object`, `RegExp`, etc.

```js
// code example coming soon
```
