(function() {
  var Crawler, addresses, base_domain, c, mime, searchParam, url, userArgs, _;

  mime = require('mime-types');

  url = require('url');

  _ = require('underscore');

  _.str = require('underscore.string');

  _.mixin(_.str.exports());

  userArgs = process.argv;

  searchParam = userArgs[2];

  base_domain = 'github.com';

  addresses = [];

  Crawler = require("crawler");

  c = new Crawler({
    maxConnections: 10,
    skipDuplicates: true,
    onDrain: function() {
      return process.exit();
    },
    callback: function(error, result, $) {
      var base_url;
      if (result != null) {
        base_url = url.parse(result.uri);
        console.log(base_url.path);
        return $('a').each(function(index, a) {
          var address, mime_type, u;
          address = $(a).attr('href');
          if (address != null) {
            mime_type = mime.lookup(address);
            if (mime_type && _(mime_type).startsWith("application")) {
              return;
            }
            u = url.parse(address);
            if (u.host != null) {
              if (u.host.toUpperCase() === base_domain.toUpperCase()) {
                return c.queue(url.resolve(base_url.href, u.path));
              }
            } else {
              if ((u.protocol == null) && (u.path != null)) {
                return c.queue(url.resolve(base_url.href, u.path));
              }
            }
          }
        });
      }
    }
  });

  c.queue("http://" + base_domain + "/");

}).call(this);
