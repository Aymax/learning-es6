(function() {
  'use strict';
  var $__1 = $traceurRuntime.initGeneratorFunction(getSimpleDataConsumer);
  function genAutoAdvance(genFunc) {
    return function() {
      for (var args = [],
          $__0 = 0; $__0 < arguments.length; $__0++)
        args[$__0] = arguments[$__0];
      var generator = genFunc.apply((void 0), $traceurRuntime.spread(args));
      generator.next();
      return generator;
    };
  }
  function getSimpleDataConsumer() {
    var firstName,
        lastName,
        e;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            console.log('Waiting for data');
            $ctx.state = 25;
            break;
          case 25:
            $ctx.state = 2;
            return;
          case 2:
            firstName = $ctx.sent;
            $ctx.state = 4;
            break;
          case 4:
            console.log(("First Name: " + firstName));
            $ctx.state = 27;
            break;
          case 27:
            $ctx.pushTry(11, 12);
            $ctx.state = 14;
            break;
          case 14:
            $ctx.state = 6;
            return;
          case 6:
            lastName = $ctx.sent;
            $ctx.state = 8;
            break;
          case 8:
            console.log(("Last Name: " + lastName));
            console.log(("Welcome " + lastName + ", " + firstName + "!"));
            $ctx.state = 10;
            break;
          case 10:
            $ctx.popTry();
            $ctx.state = 12;
            $ctx.finallyFallThrough = 16;
            break;
          case 11:
            $ctx.popTry();
            $ctx.maybeUncatchable();
            e = $ctx.storedException;
            $ctx.state = 17;
            break;
          case 17:
            console.log('Caught on your behalf: ', e);
            $ctx.state = 12;
            $ctx.finallyFallThrough = 16;
            break;
          case 12:
            $ctx.popTry();
            $ctx.state = 23;
            break;
          case 23:
            console.log('All done!');
            $ctx.state = 21;
            break;
          case 16:
            console.log('here');
            $ctx.state = -2;
            break;
          case 21:
            $ctx.state = $ctx.finallyFallThrough;
            break;
          default:
            return $ctx.end();
        }
    }, $__1, this);
  }
  var simpleObserver = getSimpleDataConsumer();
  console.log(simpleObserver.next());
  console.log(simpleObserver.next('George'));
  console.log(simpleObserver.next('Jefferson'));
  console.log(simpleObserver.next());
  var wrappedSimpleObserver = genAutoAdvance(getSimpleDataConsumer)();
  console.log(wrappedSimpleObserver.next('George'));
  console.log(wrappedSimpleObserver.next('Jefferson'));
  var returnableObserver = genAutoAdvance(getSimpleDataConsumer)();
  console.log(returnableObserver.return("It's over..."));
  var returnableObserver2 = genAutoAdvance(getSimpleDataConsumer)();
  console.log(returnableObserver2.next('George'));
  console.log(returnableObserver2.return("It's over..."));
  var throwableObserver = genAutoAdvance(getSimpleDataConsumer)();
  console.log(throwableObserver.next('George'));
  console.log(throwableObserver.throw(new Error('boom!')));
})();
//# sourceMappingURL=generators-as-observers-traceur.js.map
