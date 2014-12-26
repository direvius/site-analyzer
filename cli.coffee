mime = require 'mime-types'
url = require 'url'
_ = require 'underscore'
_.str = require 'underscore.string'
_.mixin _.str.exports()
userArgs = process.argv
searchParam = userArgs[2]

base_domain = 'github.com'

addresses = []

Crawler = require "crawler"
c = new Crawler
  maxConnections: 10
  skipDuplicates: true
  onDrain: () ->
    process.exit()
  callback: (error, result, $) ->
    if result?
      base_url = url.parse result.uri
      console.log base_url.path
      $('a').each (index, a) ->
        address = $(a).attr 'href'
        if address?
          mime_type = mime.lookup address
          if mime_type and _(mime_type).startsWith("application")
            return
          u = url.parse address
          if u.host?
            if u.host.toUpperCase() == base_domain.toUpperCase()
              c.queue url.resolve(base_url.href, u.path)
          else
            if not u.protocol? and u.path?
              c.queue url.resolve(base_url.href, u.path)

c.queue "http://#{base_domain}/"
