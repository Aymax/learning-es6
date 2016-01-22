(function() {
	'use strict';

    function genAutoAdvance(genFunc) {
        // Return a generator function wrapper that will advance the
        // generator before returning it
        return function(...args) {
            // Call the generator function (passing through arguments)
            let generator = genFunc(...args);

            // Call `.next()` to advance to first `yield`
            generator.next();

            // Return generator now that it's been advanced
            return generator;
        };
    }

    function* getSimpleDataConsumer() {
        console.log('Waiting for data');

        // Assign first sent value to `firstName` and log it
        let firstName = yield;
        console.log(`First Name: ${firstName}`);

		try {
	        // Assign second sent value to `lastName` and log it
	        let lastName = yield;
	        console.log(`Last Name: ${lastName}`);

	        console.log(`Welcome ${lastName}, ${firstName}!`);
		}
	    catch (e) {
	        console.log('Caught on your behalf: ', e);
	    }
		finally {
			console.log('All done!');
		}
		console.log('here');
    }

    let simpleObserver = getSimpleDataConsumer();

    // output:
    // Waiting for data
    // {value: undefined, done: false}
    console.log(simpleObserver.next());

    // output:
    // First Name: George
    // {value: undefined, done: false}
    console.log(simpleObserver.next('George'));

    // output:
    // Last Name: Jefferson
    // Welcome Jefferson, George!
	// All done!
    // {value: undefined, done: true}
    console.log(simpleObserver.next('Jefferson'));

    // output:
    // {value: undefined, done: true}
    console.log(simpleObserver.next());

	// wrap `getSimpleDataConsumer` with `genAutoAdvance` helper so
	// that the resultant generator is already advanced to the first
	// `yield` so we can pass data to `.next()` immediately
    // output:
    // Waiting for data
    let wrappedSimpleObserver = genAutoAdvance(getSimpleDataConsumer)();

    // output:
    // First Name: George
    // {value: undefined, done: false}
    console.log(wrappedSimpleObserver.next('George'));

    // output:
    // Last Name: Jefferson
    // Welcome Jefferson, George!
	// All done!
    // {value: undefined, done: true}
    console.log(wrappedSimpleObserver.next('Jefferson'));

	// output:
	// Waiting for data
	let returnableObserver = genAutoAdvance(getSimpleDataConsumer)();

	// Immediately call `.return()` on the observer
	// Since we weren't yet in try-finally, generation
	// function returns immediately
	// output:
	// {value: 'It\'s over...', done: true}
	console.log(returnableObserver.return(`It's over...`));

	// output:
	// Waiting for data
	let returnableObserver2 = genAutoAdvance(getSimpleDataConsumer)();

	// Call `.next()` like normal
    // output:
    // First Name: George
    // {value: undefined, done: false}
	console.log(returnableObserver2.next('George'));

	// Now return when in the try-finally. The `finally` gets
	// executed
	// output:
	// All done!
	// {value: 'It\'s over...', done: true}
	console.log(returnableObserver2.return(`It's over...`));

	let throwableObserver = genAutoAdvance(getSimpleDataConsumer)();

	// Call `.next()` like normal
    // output:
    // First Name: George
    // {value: undefined, done: false}
	console.log(throwableObserver.next('George'));

	// Now throw when in the try-catch. The `catch` & `finally`
	// get executed
	// output:
	// Caught on your behalf: [error object]
	// All done!
	// {value: undefined, done: true}
	console.log(throwableObserver.throw(new Error('boom!')));

}) ();
