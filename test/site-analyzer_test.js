/*global describe,it*/
'use strict';
var assert = require('assert'),
  siteAnalyzer = require('../lib/site-analyzer.js');

describe('site-analyzer node module', function() {
  it('must be awesome', function() {
    assert.equal( siteAnalyzer.awesome(), 'awesome');
  });
});

describe('site-analyzer node module', function() {
  it('must have at least one test', function() {
    assert(false, 'I was too lazy to write any tests. Shame on me.');
  });
});
