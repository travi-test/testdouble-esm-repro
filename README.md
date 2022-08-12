# testdouble-esm-repro

this repository is a minimal reproduction of argument matching failing for imported functions when using testdouble in an ESM context

## Steps to execute

1. clone this repository
2. run `nvm use` to switch your environment to the intended version of node
   (or `nvm install` if you don't already have a matching node version installed)
3. run `npm clean-install` to install dependencies for the project
4. run `npm test` to execute the unit tests demonstrating the problems

## Highlights

* the [expectation](https://github.com/travi-test/testdouble-esm-repro/blob/e19b55c2dcd820c57ee159553a5f0b4572b7c97d/src/argument-matching-test.js#L20)
  of `bar` being called with `baz` as the only argument fails even though it is
  called that way in [`foo.js`](https://github.com/travi-test/testdouble-esm-repro/blob/e19b55c2dcd820c57ee159553a5f0b4572b7c97d/src/foo.js#L5),
  which is the SUT for that test. This passes as expected in a non-esm
  environment when using `td.replace` rather than `td.replaceEsm`
* `baz` [has the same identity](https://github.com/travi-test/testdouble-esm-repro/blob/e19b55c2dcd820c57ee159553a5f0b4572b7c97d/src/function-identity-test.js#L9-L13)
  when imported into the test file and returned from the source file. this is
  the expected behavior
* `baz` [does not have the same identity](https://github.com/travi-test/testdouble-esm-repro/blob/e19b55c2dcd820c57ee159553a5f0b4572b7c97d/src/function-identity-test.js#L15-L21)
  when imported and returned the same way when `td.replaceEsm` is used in the
  test, even when the replaced module is unrelated.
