app
	comp-approute-menu
	div(class='ui container')
		h1 This is sub
		router


sub-a-main
	part-riot-pagenation
	div(class='ui container')
		h2 Sub A page
	script.
		this.mixin(window.app.mainpage(opts))

sub-b-main
	part-riot-pagenation
	div(class='ui container')
		h2 Sub B page
	script.
		this.mixin(window.app.mainpage(opts))