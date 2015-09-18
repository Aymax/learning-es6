# Learning ES6

ECMAScript 6 is the new version of JavaScript making its way into the interpreters of our modern browsers and servers. The specification is filled with lots of new features; much more than ECMAScript 5 which came out way back in 2009. The [*Learning ES6* blog series](http://www.benmvp.com/2015/08/the-learning-es6-series.html) is walking through all of the major features in significant detail to hopefully provide a deeper level of understanding to features you may have already heard about. This repo contains all the [code examples](http://benmvp.github.io/learning-es6) used throughout the series.

The following, however, is a listing of all of the ES6 features and the basic way in which the feature is used:

- [Arrow functions](#arrow-functions)
- [Block-level scoping](#block-level-scoping)
- [Classes](#classes)
- [Destructuring](#destructuring)
- [Enhanced object literals](#enhanced-object-literals)
- [Generators](#generators)
- [Iterables and iterators](#iterables-and-iterators)
- [Maps](#maps)
- [Modules](#modules)
- [New APIs](#new-apis)
- [Parameter handling](#parameter-handling)
- [Promises](#promises)
- [Sets](#sets)
- [Template literals & tagged templates](#template-literals-tagged-templates)

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


## Classes

A formalized approach to define classes in JavaScript 

```js
// code example coming soon
```


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


## Enhanced object literals

ECMAScript 6 makes declaring object literals even more succinct by providing shorthand syntax for initializing properties from variables and defining function methods. It also enables the ability to have computed property keys in an object literal definition.

```js
function getCar(make, model, value) {
    return {
        // with property value shorthand
        // syntax, you can omit the property
        // value if key matches variable
        // name
        make,  // same as make: make
        model, // same as model: model
        value, // same as value: value

        // computed values now work with
        // object literals
        ['make' + make]: true,

        // Method definition shorthand syntax
        // omits `function` keyword & colon
        depreciate() {
            this.value -= 2500;
        }
    };
}

let car = getCar('Kia', 'Sorento', 40000);

// output: {
//     make: 'Kia',
//     model:'Sorento',
//     value: 40000,
//     depreciate: function()
// }
console.log(car);

car.depreciate();

// output: 37500
console.log(car.value);
```

**More info:** [Blog post](http://www.benmvp.com/2015/09/learning-es6-enhanced-object-literals.html) | [Browser examples](http://benmvp.github.io/learning-es6/#enhanced-object-literals) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/enhanced-object-literals.js)


## Generators

Specialized functions that create iterators using `yield` keyword

```js
// code example coming soon
```


## Iterables and Iterators

A new ES6 interface for iteration

```js
// code example coming soon
```


## Maps

Dictionary-type object that can store key/value pairs 

```js
// code example coming soon
```


## Modules

Provide a modular of organizing and loading JavaScript code 

```js
// code example coming soon
```


## New APIs

New APIs for existing native JavaScript classes `Math`, `Object`, `RegExp`, etc.

```js
// code example coming soon
```


## Parameter handling

ES6  allows for function headers to define default values for parameters, marking them as optional:

```js
function getData(data, useCache=true) {
    if (useCache) {
        console.log('using cache for', data);
    }
    else {
        console.log('not using cache', data);
    }
}

// `useCache` is missing and is `undefined`.
// therefore `useCache `defaults to `true`
getData({q:'churches+in+Pittsburg'});
```

Rest parameters should complete replace the need for the problematic `arguments` special variable:

```js
function join(separator, ...values) {
    return values.join(separator);
}

// all of the parameters after the first
// are gathered together into `values`
// which is a true `Array`
// output: "one//two//three"
console.log(join('//', 'one', 'two', 'three'));
```

We should no longer need the `apply` function with the new spread operator:

```js
function video(width, length, height) {
    return width * length * height;
};

// the array values are separated into
// separate parameters
// output: 80 (2 * 8 * 5)
console.log(volume(...[2, 8, 5]));
```

Lastly, object destructuring with function parameters allows us to simulate named parameters:

```js
let ajax = function(url, {method, delay, callback}) {
    console.log(url, method, delay);
    setTimeout(
        () => callback('DONE!'),
        delay
    );
};

// the second parameter to the function
// is an object whose properties are
// destructured to individual variables
// simulating named parameters
ajax(
    'http://api.eventbrite.com/get',
    {
        delay: 2000,
        method: 'POST',
        callback: function(message) {
            console.log(message);
        }
    }
);
```

**More info:** [Blog post](http://www.benmvp.com/2015/09/learning-es6-parameter-handling.html) | [Browser examples](http://benmvp.github.io/learning-es6/#parameter-handling) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/parameter-handling.js)


## Promises

An alternative to callback functions for handling asynchronous operations 

```js
// code example coming soon
```


## Sets

A collection object that can store a unique list of values

```js
// code example coming soon
```


## Template literals & tagged templates

ES6 template literals are a brand new type of string literal, delimited by backticks (`` ` ``), that natively support string interpolation (token substitution) and multi-line strings. And because they use backticks as a delimiter, they can include single and double quotes without needing to escape them.

```js
let firstName = 'Ben',
    lastName = `Ilegbodu`;

// Basic template literal is surrounding by
// backticks so single/double quotes do need
// to be escaped
// output: He said, "It's your fault!"
console.log(`He said, "It's your fault!"`);

// Template literals support interpolation.
// The values within `firstName` and `lastName`
// are substituted into where the tokens are
// output: Name: Ilegbodu, Ben
console.log(`Name: ${lastName}, ${firstName}`);

// Template literals support multi-line strings
// output: This is
//      multi-line text, so that
//      newline characters are
//
//
//      not needed. All whitespace
//          is respected, including tabs.
//
//
console.log(`This is
    multi-line text, so that
    newline characters are


    not needed. All whitespace
        is respected, including tabs.

`);
```

ES6 also supports tagged templates, which are created by prefixing a template literal with the name of a function (called the tag function). That functions receives an array of tokenized string literals plus the substitution values, enabling custom string interpolation or processing.

```js
function l10n(literals, ...substitutions) {
    // return interpolated string with
    // literals translated to native language
    // and localized to locale
}

let cost = 10.45,
    date = new Date('12/1/2016');

// translate and localize
// The function name (l10n) prefixes the
// template literal
// English: Your ticket for 12.1.2016 is $10.45.
// Spanish: Su billete para el 2016.12.1 es €10,45.
console.log(l10n`Your ticket for ${date} is {$cost}:c.`);
```

**More info:** [Blog post](http://www.benmvp.com/2015/09/learning-es6-template-literals-tagged-templates.html) | [Browser examples](http://benmvp.github.io/learning-es6/#template-literals) | [Source code](https://github.com/benmvp/learning-es6/blob/master/examples/es6/template-literals.js)
