let vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "naylatools-framework" is now active!');
	let disposable = vscode.commands.registerCommand('naylatools-framework.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from NaylaTools Framework!');
	});

	context.subscriptions.push(disposable);

	let provider = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems() {
				let completions = [];

				let completion = new vscode.CompletionItem('rendTables', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendTables({\ndivid: "divtable",\nid: "tableid",\ndataset: { data: "data", field: "field" },\nsortby: false,\ngroupby: false,\nsort: "sort",\nby: "bt",\npage: "page",\ntbody: {\nid: "tbodyid",\nopsi: [\n{type: "edit", event: "handleEdit", cap: "Edit" },\n{type: "info", event: "handleDetail", cap: "Detail" },\n{type: "delete", event: "modalHapus2", cap: "Hapus" },],\nclick: false,\ndblclick: false\n},\nfooter: {\n\n},\n,pagination: { \ndiv: "divPagination"\n}\n})`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(provider);

	let providerModal = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems() {
				let completions = [];

				let completion = new vscode.CompletionItem('rendModal', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendModal({\ntitle: "Title",\nform: true,\nfn: "submitForm(event, {crud:'model/', fn:'main', modal:'ya'})",\nbtn: 'btnTutup',\nfooter: 'btnSave',\nbody: "body"});`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerModal);

	let rendFormsCommand = vscode.commands.registerCommand('naylatools-framework.rendForms', async function () {
		let input = await vscode.window.showInputBox({
			prompt: 'Enter form elements separated by commas (e.g., select,text,textarea,checkbox)',
			placeHolder: 'select,text,textarea,checkbox'
		});

		if (input) {
			let elements = input.split(',').map(item => item.trim());
			let forms = elements.map(type => ({
				type: type,
				label: type,
				name: type,
				id: type
			}));

			let snippet = new vscode.SnippetString(`([${forms.map(form => JSON.stringify(form)).join(',\n\t')}])`);

			let editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.insertSnippet(snippet);
			}
		}
	});

	context.subscriptions.push(rendFormsCommand);

	let providerForms = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems() {
				let completion = new vscode.CompletionItem('rendForms', vscode.CompletionItemKind.Function);
				completion.documentation = new vscode.MarkdownString('Masukan type formnya');
				completion.command = {
					command: 'naylatools-framework.rendForms',
					title: 'Masukan type form yang di inginkan'
				};

				return [completion];
			}
		}
	);

	context.subscriptions.push(providerForms);

	let providerGI = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems() {
				let completions = [];
				let click = new vscode.CompletionItem('GIClick', vscode.CompletionItemKind.Function);
				click.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('click', (e)=>{\n\n})`);
				completions.push(click);

				let change = new vscode.CompletionItem('GIChange', vscode.CompletionItemKind.Function);
				change.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('change', (e)=>{\n\n})`);
				completions.push(change);

				let focus = new vscode.CompletionItem('GIFocus', vscode.CompletionItemKind.Function);
				focus.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('focus', (e)=>{\n\n})`);
				completions.push(focus);

				let blur = new vscode.CompletionItem('GIBlur', vscode.CompletionItemKind.Function);
				blur.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('blur', (e)=>{\n\n})`);
				completions.push(blur);

				let submit = new vscode.CompletionItem('GISubmit', vscode.CompletionItemKind.Function);
				submit.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('submit', (e)=>{\n\n})`);
				completions.push(submit);

				let keydown = new vscode.CompletionItem('GIKeydown', vscode.CompletionItemKind.Function);
				keydown.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('keydown', (e)=>{\n\n})`);
				completions.push(keydown);

				let keyup = new vscode.CompletionItem('GIKeyup', vscode.CompletionItemKind.Function);
				keyup.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('keyup', (e)=>{\n\n})`);
				completions.push(keyup);

				let mouseover = new vscode.CompletionItem('GIMouseover', vscode.CompletionItemKind.Function);
				mouseover.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('mouseover', (e)=>{\n\n})`);
				completions.push(mouseover);

				let mouseout = new vscode.CompletionItem('GIMouseout', vscode.CompletionItemKind.Function);
				mouseout.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('mouseout', (e)=>{\n\n})`);
				completions.push(mouseout);

				let scroll = new vscode.CompletionItem('GIScroll', vscode.CompletionItemKind.Function);
				scroll.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('scroll', (e)=>{\n\n})`);
				completions.push(scroll);

				let keypress = new vscode.CompletionItem('GIPress', vscode.CompletionItemKind.Function);
				keypress.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('keypress', (e)=>{\n\n})`);
				completions.push(keypress);

				let mousemove = new vscode.CompletionItem('GIMousemove', vscode.CompletionItemKind.Function);
				mousemove.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('mousemove', (e)=>{\n\n})`);
				completions.push(mousemove);

				let mousedown = new vscode.CompletionItem('GIMousedown', vscode.CompletionItemKind.Function);
				mousedown.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('mousedown', (e)=>{\n\n})`);
				completions.push(mousedown);

				let mouseup = new vscode.CompletionItem('GIMouseup', vscode.CompletionItemKind.Function);
				mouseup.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('mouseup', (e)=>{\n\n})`);
				completions.push(mouseup);

				let reset = new vscode.CompletionItem('GIReset', vscode.CompletionItemKind.Function);
				reset.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('reset', (e)=>{\n\n})`);
				completions.push(reset);

				let input = new vscode.CompletionItem('GIInput', vscode.CompletionItemKind.Function);
				input.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('input', (e)=>{\n\n})`);
				completions.push(input);

				let load = new vscode.CompletionItem('GILoad', vscode.CompletionItemKind.Function);
				load.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('load', (e)=>{\n\n})`);
				completions.push(load);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerGI);

	let providerElm = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems() {
				let completions = [];
				let div = new vscode.CompletionItem('elmDiv', vscode.CompletionItemKind.Function);
				div.insertText = new vscode.SnippetString(`{elm:"div", cls:"cls", elms:[\n]},\n`);
				completions.push(div);

				let row6 = new vscode.CompletionItem('elmRow6', vscode.CompletionItemKind.Function);
				row6.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-6", elms:[]},\n{elm:"div", cls:"col-6", elms:[]}\n],\n`);
				completions.push(row6);

				let row4 = new vscode.CompletionItem('elmRow4', vscode.CompletionItemKind.Function);
				row4.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-4", elms:[]},\n{elm:"div", cls:"col-4", elms:[]},\n{elm:"div", cls:"col-4", elms:[]}\n],\n`);
				completions.push(row4);

				let row3 = new vscode.CompletionItem('elmRow3', vscode.CompletionItemKind.Function);
				row3.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]}\n],\n`);
				completions.push(row3);

				let row2 = new vscode.CompletionItem('elmRow2', vscode.CompletionItemKind.Function);
				row2.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]}\n],\n`);
				completions.push(row2);

				let img = new vscode.CompletionItem('elmImg', vscode.CompletionItemKind.Function);
				img.insertText = new vscode.SnippetString(`{elm:"img", src:"", id:"idImg", width:"100%"},\n`);
				completions.push(img);

				let btnDefault = new vscode.CompletionItem('elmBtnDefault', vscode.CompletionItemKind.Function);
				btnDefault.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-default", text:"Button"},\n`);
				completions.push(btnDefault);

				let btnPrimary = new vscode.CompletionItem('elmBtnPrimary', vscode.CompletionItemKind.Function);
				btnPrimary.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-primary", text:"Button"},\n`);
				completions.push(btnPrimary);

				let btnDanger = new vscode.CompletionItem('elmBtnDanger', vscode.CompletionItemKind.Function);
				btnDanger.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-danger", text:"Button"},\n`);
				completions.push(btnDanger);

				let btnWarning = new vscode.CompletionItem('elmBtnWarning', vscode.CompletionItemKind.Function);
				btnWarning.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-warning", text:"Button"},\n`);
				completions.push(btnWarning);

				let btnSecondary = new vscode.CompletionItem('elmBtnSecondary', vscode.CompletionItemKind.Function);
				btnSecondary.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-secondary", text:"Button"},\n`);
				completions.push(btnSecondary);

				let btnOpsi = new vscode.CompletionItem('elmBtnOpsi', vscode.CompletionItemKind.Function);
				btnOpsi.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"button", cls:"btn btn-opsi", elms:[\n{elm:"span", cls:"material-icons", text:"edit"}\n]},\n`);
				completions.push(btnOpsi);

				let table = new vscode.CompletionItem('elmTable', vscode.CompletionItemKind.Function);
				table.insertText = new vscode.SnippetString(`{elm:"div", cls:"table-responsive", elms:[
					{elm:"table", elms:[
						{elm:"thead", cls:"bg-thead", elms:[
							{elm:"tr", elms:[
								{elm:"th", text:"th1"},
								{elm:"th", text:"th2"},
								{elm:"th", text:"th3"},
								{elm:"th", text:"th4"},
							]}
						]},
						{elm:"tbody", id:"elmTbody", elms:[
							{elm:"tr", elms:[
								{elm:"td", text:"td1"},
								{elm:"td", text:"td2"},
								{elm:"td", text:"td3"},
								{elm:"td", text:"td4"},
							]}
						]}		
					]}
				]},\n`);
				completions.push(table);

				let H1 = new vscode.CompletionItem('elmH1', vscode.CompletionItemKind.Function);
				H1.insertText = new vscode.SnippetString(`{elm:"h1", text:"header1"},\n`);
				completions.push(H1);

				let H2 = new vscode.CompletionItem('elmH2', vscode.CompletionItemKind.Function);
				H2.insertText = new vscode.SnippetString(`{elm:"h2", text:"header2"},\n`);
				completions.push(H2);

				let H3 = new vscode.CompletionItem('elmH3', vscode.CompletionItemKind.Function);
				H3.insertText = new vscode.SnippetString(`{elm:"h3", text:"header3"},\n`);
				completions.push(H3);

				let H4 = new vscode.CompletionItem('elmH4', vscode.CompletionItemKind.Function);
				H4.insertText = new vscode.SnippetString(`{elm:"h4", text:"header4"},\n`);
				completions.push(H4);

				let H5 = new vscode.CompletionItem('elmH5', vscode.CompletionItemKind.Function);
				H5.insertText = new vscode.SnippetString(`{elm:"h5", text:"header5"},\n`);
				completions.push(H5);

				let H6 = new vscode.CompletionItem('elmH6', vscode.CompletionItemKind.Function);
				H6.insertText = new vscode.SnippetString(`{elm:"h6", text:"header6"},\n`);
				completions.push(H6);

				let label = new vscode.CompletionItem('elmLabel', vscode.CompletionItemKind.Function);
				label.insertText = new vscode.SnippetString(`{elm:"label", text:"label"},\n`);
				completions.push(label);

				let formGroup = new vscode.CompletionItem('elmFormGroup', vscode.CompletionItemKind.Function);
				formGroup.insertText = new vscode.SnippetString(`{elm:"div", cls:"form-group", elms:[\n\n{elm:"div", cls:"invalid-feedback", text:"silahkan isi"}]},\n`);
				completions.push(formGroup);

				let inputText = new vscode.CompletionItem('elmInputText', vscode.CompletionItemKind.Function);
				inputText.insertText = new vscode.SnippetString(`{elm:"input", type:"text", cls:"form-control", id:"edtText", name:"namaText", placeholder:"Silahkan ini text"},\n`);
				completions.push(inputText);

				let inputNumber = new vscode.CompletionItem('elmInputNumber', vscode.CompletionItemKind.Function);
				inputNumber.insertText = new vscode.SnippetString(`{elm:"input", type:"number", cls:"form-control", id:"edtNumber", name:"namaNumber", value:"0"}`);
				completions.push(inputNumber);

				let inputTextarea = new vscode.CompletionItem('elmInputTextarea', vscode.CompletionItemKind.Function);
				inputTextarea.insertText = new vscode.SnippetString(`{elm:"textarea", cls:"form-control", id:"edtTextarea", name:"namaTextarea", placeholder:"Silahkan ini textarea"}`);
				completions.push(inputTextarea);

				let inputCheckbox = new vscode.CompletionItem('elmInputCheckbox', vscode.CompletionItemKind.Function);
				inputCheckbox.insertText = new vscode.SnippetString(`{"elm": "main", "elms": [\n{"elm": "div", "class": "form-check form-switch", "elms": [\n{"elm": "input", "class": "form-check-input", "type": "checkbox", "role": "switch", "id": "chk", "checked": true },\n{"elm": "label", "class": "form-check-label", "for": "chkAllDate", "text": "Aktif" }\n]}\n]},\n`);
				completions.push(inputCheckbox);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerElm);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
