import {assert} from 'chai';
import * as td from 'testdouble';

import baz from './baz.js';

suite('function identity', () => {
  teardown(() => td.reset());

  test('that named imports in test file vs source file have the same identity when td is not involved', async () => {
    const {default: qux} = await import('./qux.js');

    assert.equal(qux(), baz);
  });

  test('that named imports in test file vs source file have different identities when td replaces an unrelated module', async () => {
    await td.replaceEsm('./bar.js')

    const {default: qux} = await import('./qux.js');

    assert.equal(qux(), baz);
  });
});
