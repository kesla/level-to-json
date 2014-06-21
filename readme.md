# level-to-json

Get a leveldb-database out as json (or parts of it)

[![NPM](https://nodei.co/npm/level-to-json.png?downloads&stars)](https://nodei.co/npm/level-to-json/)

[![NPM](https://nodei.co/npm-dl/level-to-json.png)](https://nodei.co/npm/level-to-json/)

## Installation

```
npm install level-to-json
```

## Example

### Input

```javascript
var db = require('level-test')()('level-get-json', { valueEncoding: 'json' })
  , toJSON = require('./to-json')(db)

//first put in some data
db.batch([
        { key: '1',  value: [ 'one!', '1', 'ett' ], type: 'put' }
      , { key: '1b',  value: [ 'one again!', 'ett igen'], type: 'put' }
      , { key: '2',  value: 'two', type: 'put' }
      , { key: '3',  value: 'three', type: 'put' }
      , { key: '3b',  value: { three: 'one more time' }, type: 'put' }
      , { key: '4',  value: 'four', type: 'put' }
    ]
  , function () {
      toJSON(function (err, json) {
        console.log('The default is to get the whole database out')
        console.log('It is pretty neat that custom encodings are supported')
        console.log(json)

        toJSON({
                gt: '5'
            }
          , function (err, json) {
            console.log('If it is outside of the json you get an empty object')
            console.log(json)
          }
        )

        toJSON({
                gt: '1'
              , lte: '4'
            }
          , function (err, json) {
              console.log('You can use the same options as to a Readable Stream')
              console.log(json)
            }
        )
      })
    }
)
```

### Output

```
The default is to get the whole database out
It is pretty neat that custom encodings are supported
{ '1': [ 'one!', '1', 'ett' ],
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '1b': [ 'one again!', 'ett igen' ],
  '3b': { three: 'one more time' } }
If it is outside of the json you get an empty object
{}
You can use the same options as to a Readable Stream
{ '2': 'two',
  '3': 'three',
  '4': 'four',
  '1b': [ 'one again!', 'ett igen' ],
  '3b': { three: 'one more time' } }
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
