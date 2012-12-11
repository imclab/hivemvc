var hl = require('hive-loader');
var _ = require('underscore');
var util = require('util');
var Component = require('hive-component');
var hives_loader = require('./../loaders/hives_loader');
var _DEBUG = false;

var _mixins = {
	name:    'hives_handler',
	respond: function (params) {
		if (_DEBUG) console.log('hive_handler: found hives folder %s', params.file_path);
		var frame = this;

		var loader = hives_loader(params.file_path, frame);
		loader.load(params.gate.latch());
	}
};

/**
 *
 * This handler handles a folder of hives.
 * The folder name must END in hives
 * but you can have any (or no) prefix,
 * if you want to divide your hives into multiple groups.
 *
 * It is usually attached to a frame_loader.
 *
 */

module.exports = function (mixins, config, cb) {

	return hl.handler(
		 [_mixins, mixins],
		[{
			dir: true,
			name_filter: /(.*)(_)?hives$/i
		}, config],
		cb);
};