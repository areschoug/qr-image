"use strict";

var QR = require('./qr-base').QR;
var vector = require('./vector');

var BITMAP_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    size: 5,
    margin: 4,
    customize: null
};

var VECTOR_OPTIONS = {
    parse_url: false,
    ec_level: 'M',
    margin: 1,
    size: 0
};

function get_options(options, force_type) {
    if (typeof options === 'string') {
        options = { 'ec_level': options }
    } else {
        options = options || {};
    }
    var _options = {
        type: String(force_type || options.type || 'png').toLowerCase()
    };

    var defaults = _options.type == 'png' ? BITMAP_OPTIONS : VECTOR_OPTIONS;

    for (var k in defaults) {
        _options[k] = k in options ? options[k] : defaults[k];
    }

    return _options;
}

function svg_object(text, options) {
    options = get_options(options, 'svg');

    var matrix = QR(text, options.ec_level);
    return vector.svg_object(matrix, options.margin);
}

module.exports = {
    matrix: QR,
    svgObject: svg_object
};
