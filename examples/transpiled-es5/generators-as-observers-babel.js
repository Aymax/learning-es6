'use strict';

(function () {
   'use strict';

   var marked1$0 = [getSimpleDataConsumer].map(regeneratorRuntime.mark);
   function genAutoAdvance(genFunc) {
      // Return a generator function wrapper that will advance the

      return function () {
         // Call the generator function (passing through arguments)
         var generator = genFunc.apply(undefined, arguments);

         // Call `.next()` to advance to first `yield`
         generator.next();

         // Return generator now that it's been advanced
         return generator;
      };
   }

   function getSimpleDataConsumer() {
      var firstName, lastName;
      return regeneratorRuntime.wrap(function getSimpleDataConsumer$(context$2$0) {
         while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
               console.log('Waiting for data');

               // Assign first sent value to `firstName` and log it
               context$2$0.next = 3;
               return;

            case 3:
               firstName = context$2$0.sent;

               console.log('First Name: ' + firstName);

               context$2$0.prev = 5;
               context$2$0.next = 8;
               return;

            case 8:
               lastName = context$2$0.sent;

               console.log('Last Name: ' + lastName);

               console.log('Welcome ' + lastName + ', ' + firstName + '!');
               context$2$0.next = 16;
               break;

            case 13:
               context$2$0.prev = 13;
               context$2$0.t0 = context$2$0['catch'](5);

               console.log('Caught on your behalf: ', context$2$0.t0);

            case 16:
               context$2$0.prev = 16;

               console.log('All done!');
               return context$2$0.finish(16);

            case 19:
               console.log('here');

            case 20:
            case 'end':
               return context$2$0.stop();
         }
      }, marked1$0[0], this, [[5, 13, 16, 19]]);
   }

   var simpleObserver = getSimpleDataConsumer();

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
   var wrappedSimpleObserver = genAutoAdvance(getSimpleDataConsumer)();

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
   var returnableObserver = genAutoAdvance(getSimpleDataConsumer)();

   // Immediately call `.return()` on the observer
   // Since we weren't yet in try-finally, generation
   // function returns immediately
   // output:
   // {value: 'It\'s over...', done: true}
   console.log(returnableObserver['return']('It\'s over...'));

   // output:
   // Waiting for data
   var returnableObserver2 = genAutoAdvance(getSimpleDataConsumer)();

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
   console.log(returnableObserver2['return']('It\'s over...'));

   var throwableObserver = genAutoAdvance(getSimpleDataConsumer)();

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
   console.log(throwableObserver['throw'](new Error('boom!')));
})();
// generator before returning it

// Assign second sent value to `lastName` and log it

//# sourceMappingURL=generators-as-observers-babel.js.map