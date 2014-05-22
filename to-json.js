module.exports = function (db) {

	return function(opts, callback) {
		if (typeof(opts) === 'function') {
			callback = opts
			opts = {}
		}

		require('level-get-range')(db)(opts, function (err, array) {
			if (err) return callback(err)

			var obj = {}

			array.forEach(function (row) {
				obj[row.key] = row.value
			})

			callback(null, obj)
		})
	}
}