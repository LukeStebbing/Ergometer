import assert from './assert.js';
import {test} from './test.js'
import {Model} from './model.js'

test(async () => {
    const model = new Model
    await model.transact(async (run) => {
        assert.equal([{1: 1}], await run('select 1'))
    })
})
