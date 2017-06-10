//- 
//- Directory Level Pagenation
//- 
comp-approute-menu
	div(class='ui top attached menu')
		div(class='ui container')
			div(class='header item active') 
				a(href="/") Route Menu
			a(class='item blue {classstr}', each="{pagelist}", href="{address}") {name}
	script.
		const pagemixin = {
			init:  function(){
				const self = this;
				const host = window.location.hostname;
				const prefix = "";

				/**
				 * Route list
				 */
				const pagelist = [
					{ address: `${prefix}/`, name: "Index", classstr: ""},
					{ address: `${prefix}/sub`, name: "Sub", classstr: ""},
					{ address: `${prefix}/sub/usub`, name: "Sub/usub", classstr: ""},
				]

				/**
				 * Pagenation
				 */
				const route_path = window.location.pathname;
				for(const vd of pagelist){
					if(vd.address === route_path){
						vd.classstr = 'active'
					} else {
						vd.classstr = ''
					}
				}
				self.pagelist = pagelist;
			}
		}
		this.mixin(pagemixin)


//-
//- Riotで制御するレベルのpagenation
//-
part-riot-pagenation
	div(class='ui container')
		h2(class='ui header') {title}
			div(class='ui secondary pointing menu')
				a(class='item {classstr}', each="{pagelist}", href="#{address}") {name}
	script.
		this.mixin(window.app.createPagenation())