//-
//- Page A
//-
app-a-main
	part-riot-pagenation
	div(class='ui container')
		h2 Index Page - App:A
		part-app-a-reqdate
		entry
	script.
		this.mixin(window.app.app_a.mainpage(opts))

//-
//- Page B
//-
app-b-main
	part-riot-pagenation
	div(class='ui container')
		h2 Index Page - App:B

//-
//- Page A の日付ベースの入力用Compnent
//-
part-app-a-reqdate
	div(class='ui negative message', if="{errorMessage}")
		i(class='icon close', onclick='{clearError}')
		div(class='header') Error
		p {errorMessage}
	form(class='ui form', ref="requestForm", onsubmit="{load}")
		div(class='four fields')
			div(class='field')
				label Date start
				input(type='date', ref="start", value="{opts.start}")
				label Date end
				input(type='date', ref="end", value="{opts.end}")
			div(class='field')
				label name
				input(type='text', ref="name", value="{opts.name}")
				label id
				input(type='number', ref="id", value="{opts.id}")
		div(class='field')
			button(class='ui button') Submit
	script.
		this.mixin(window.app.app_a.requestDate(opts))

//-
//- Page A でフォームからの入力を得てViewを生成するCompnent
//-
app-request-sample
	div(class='ui negative message', if="{errorMessage}")
		i(class='icon close', onclick='{clearError}')
		div(class='header') Error
		p {errorMessage}
	table(if="{query}", class="ui table collapsing compact")
		caption Query parameters
		thead 
			tr
				th Name
				th Value
		tr(each="{query}")
			td {name}
			td {value}
	div(class='ui message', if="{text}")
		div(class='header') Dummy Result
		p {text}
	script.
		this.mixin(window.app.app_a.request_sample(opts))
