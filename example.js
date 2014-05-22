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