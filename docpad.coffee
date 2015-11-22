# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
fs = require('fs')
#docpad = require('docpad')
docpadConfig = {
	srcPath : './docpad'
	outPath: './site'
	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
	layoutsPaths:
		['layouts', 'data']
	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			# If not set, will default to the calculated site URL (e.g. http://localhost:9778)
			url: "http://alertifyjs.com"

			# Here are some old site urls that you would like to redirect from
			oldUrls: [
				
			]

			# The default title of our website
			title: "ALERTIFY JS"

			# The website description (for SEO)
			description: """
				AlertifyJS is a javascript framework for developing pretty browser dialogs and notifications.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				alert, notify, alertify, pretty, browser, dialog, notification, js, javascript, growl, css
				"""

			# The website's styles
			styles: [
				'/build/css/alertify.css'
				'/build/css/themes/default.css'
				'/css/normalize.min.css'
				'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'
				'/css/semantic.min.css'
				'http://fonts.googleapis.com/earlyaccess/droidarabickufi.css'
				'http://fonts.googleapis.com/css?family=Droid+Sans:400,700'
				'/css/site.min.css',
                '/styles/style.css'
			]

			# The website's scripts
			scripts: [
				'/build/alertify.js'
				'/js/jquery-1.11.1.min.js'
				'/js/jquery.mobile.custom.min.js'
				'/js/scrollLock.min.js'
				'/js/semantic.min.js'
				'/js/site.min.js',
                '/scripts/script.js'	
			]
		
		# Get the documentation data
		getPackage: (name,module, sort) ->
			pkg = JSON.parse(fs.readFileSync('./package.json'))
		
		# Get the documentation data
		getDocData: (name,module, sort) ->
			items = JSON.parse(fs.readFileSync('./docpad/data/' + name + '.json'))
				.map (item) ->
					if(typeof item.script == 'string')
						item.script = item.script.replace(/\{component\}/gm,module)
					else
						item.script = item.script.map (line) ->
							line.replace(/\{component\}/gm,module)
					item
			if(sort)		
				# sort by name
				items = items.sort (a,b) ->
					if (a.name > b.name)
						1
					else if (a.name < b.name) # || a.type == 'm')
						-1
					else
						0
				# sort by type
				# .sort (a,b) ->
				#	if (a.type > b.type)
				#		-1
				#	else if (a.type < b.type)
				#		1
				#	else
				#		0
			items

		# Get the documentation data
		getData: (name,type) ->
			items = this.getDocData(name,null,false)
            
			if name.indexOf('notifi') < 0
                items = items.concat(this.getDocData('dialog',name,false))
				
			items = (item for item in items when item.type == type)
            
			items.sort (a,b) ->
					if (a.name > b.name)
						1
					else if (a.name < b.name) # || a.type == 'm')
						-1
					else
						0

		# Get the documentation of single prop
		getDataItem: (name,prop) ->
			items = this.getDocData(name,null,false)
			isDialog = name.indexOf('notifi') < 0
			if isDialog
                items = items.concat(this.getDocData('dialog',name,false))
				
			items = (item for item in items when item.name == prop)
            
			items[0].isDialog = isDialog
    
			items[0]
            
		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here			
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')
			
	# =================================
	# Collections

	# Here we define our custom collections
	# What we do is we use findAllLive to find a subset of documents from the parent collection
	# creating a live collection out of it
	# A live collection is a collection that constantly stays up to date
	# You can learn more about live collections and querying via
	# http://bevry.me/queryengine/guide
			
	collections:

		# Create a collection called posts
		# That contains all the documents that will be going to the out path posts
		contents: ->
			@getCollection('documents').findAllLive({relativeOutDirPath: 'contents'})


	# =================================
	# Environments

	# DocPad's default environment is the production environment
	# The development environment, actually extends from the production environment

	# The following overrides our production url in our development environment with false
	# This allows DocPad's to use it's own calculated site URL instead, due to the falsey value
	# This allows <%- @site.url %> in our template data to work correctly, regardless what environment we are in

	environments:
		development:
			templateData:
				site:
					url: false


	# =================================
  # Plugin Configuration
	plugins:
		highlightjs:
			className: 'example'
					
	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki

	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
	
	
}

# Export our DocPad Configuration
module.exports = docpadConfig