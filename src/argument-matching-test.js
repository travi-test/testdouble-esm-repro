import * as td from 'testdouble';
import {assert} from 'chai';
import any from '@travi/any';

import baz from './baz.js';

suite('matching failure', () => {
  let foo, bar;

  setup(async () => {
    bar = await td.replaceEsm('./bar.js');

    ({default: foo} = await import('./foo.js'));
  });

  teardown(() => td.reset());

  test('that testdouble fails to match the imported function', async () => {
    const results = any.simpleObject();
    td.when(bar.default(baz)).thenResolve(results);

    assert.equal(await foo(), results);
  });
});
