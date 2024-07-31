let vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "naylatools-framework" is now active!');

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
		['javascript', 'php', 'html'],
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

	let providerElm = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php', 'html'],
		{
			provideCompletionItems() {
				let completions = [];

				let rendTables = new vscode.CompletionItem('rendTables', vscode.CompletionItemKind.Function);
				rendTables.insertText = new vscode.SnippetString(`rendTables({\ndivid: "\${1:divtable}",\nid: "\${2:tableid}",\ndataset: { data: \${3:data}, field: \${4:field} }, \nsortby: \${5:false}, \ngroupby: \${6:false}, \nsort: "\${7:sort}",\nby: "\${8:by}",\npage: "\${9:page}", 
					tbody: {
						id: "\${10:tbodyid}",
						opsi: [
							{type: "edit", event: "handleEdit", cap: "Edit"},
							{type: "info", event: "handleDetail", cap: "Detail"},
							{type: "delete", event: "modalHapus2", cap: "Hapus" }
						], 
						click: \${11:false}, 
						dblclick: \${12:false}
					}, 
					footer: {
						cap: "\${13:Total}",
                        field: ["\${14:CT}", "\${15:Total}"]
					}, 
					pagination: { div: "\${16:divPagination}"}
				});`);
				completions.push(rendTables);

				let rendModal = new vscode.CompletionItem('rendModal', vscode.CompletionItemKind.Function);
				rendModal.insertText = new vscode.SnippetString(`rendModal({\ntitle: "\${1:Title}", \nform: \${2:true},\nfn: "\${3:submitForm(event, {crud:'model/', fn:'main', modal:'ya'})}", \nbtn: '\${4:btnTutup}', \nfooter: '\${5:btnSave}', \nbody: \${5:"body"}});`);
				completions.push(rendModal);

				let click = new vscode.CompletionItem('GIClick', vscode.CompletionItemKind.Function);
				click.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('click', (e)=>{\n\n})`);
				completions.push(click);

				let change = new vscode.CompletionItem('GIChange', vscode.CompletionItemKind.Function);
				change.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('change', (e)=>{\n\n})`);
				completions.push(change);

				let focus = new vscode.CompletionItem('GIFocus', vscode.CompletionItemKind.Function);
				focus.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('focus', (e)=>{\n\n})`);
				completions.push(focus);

				let blur = new vscode.CompletionItem('GIBlur', vscode.CompletionItemKind.Function);
				blur.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('blur', (e)=>{\n\n})`);
				completions.push(blur);

				let submit = new vscode.CompletionItem('GISubmit', vscode.CompletionItemKind.Function);
				submit.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('submit', (e)=>{\n\n})`);
				completions.push(submit);

				let keydown = new vscode.CompletionItem('GIKeydown', vscode.CompletionItemKind.Function);
				keydown.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('keydown', (e)=>{\n\n})`);
				completions.push(keydown);

				let keyup = new vscode.CompletionItem('GIKeyup', vscode.CompletionItemKind.Function);
				keyup.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('keyup', (e)=>{\n\n})`);
				completions.push(keyup);

				let mouseover = new vscode.CompletionItem('GIMouseover', vscode.CompletionItemKind.Function);
				mouseover.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('mouseover', (e)=>{\n\n})`);
				completions.push(mouseover);

				let mouseout = new vscode.CompletionItem('GIMouseout', vscode.CompletionItemKind.Function);
				mouseout.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('mouseout', (e)=>{\n\n})`);
				completions.push(mouseout);

				let scroll = new vscode.CompletionItem('GIScroll', vscode.CompletionItemKind.Function);
				scroll.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('scroll', (e)=>{\n\n})`);
				completions.push(scroll);

				let keypress = new vscode.CompletionItem('GIPress', vscode.CompletionItemKind.Function);
				keypress.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('keypress', (e)=>{\n\n})`);
				completions.push(keypress);

				let mousemove = new vscode.CompletionItem('GIMousemove', vscode.CompletionItemKind.Function);
				mousemove.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('mousemove', (e)=>{\n\n})`);
				completions.push(mousemove);

				let mousedown = new vscode.CompletionItem('GIMousedown', vscode.CompletionItemKind.Function);
				mousedown.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('mousedown', (e)=>{\n\n})`);
				completions.push(mousedown);

				let mouseup = new vscode.CompletionItem('GIMouseup', vscode.CompletionItemKind.Function);
				mouseup.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('mouseup', (e)=>{\n\n})`);
				completions.push(mouseup);

				let reset = new vscode.CompletionItem('GIReset', vscode.CompletionItemKind.Function);
				reset.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('reset', (e)=>{\n\n})`);
				completions.push(reset);

				let input = new vscode.CompletionItem('GIInput', vscode.CompletionItemKind.Function);
				input.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('input', (e)=>{\n\n})`);
				completions.push(input);

				let load = new vscode.CompletionItem('GILoad', vscode.CompletionItemKind.Function);
				load.insertText = new vscode.SnippetString(`GI("\${1:inidi}").addEventListener('load', (e)=>{\n\n})`);
				completions.push(load);

				let div = new vscode.CompletionItem('elmDiv', vscode.CompletionItemKind.Function);
				div.insertText = new vscode.SnippetString(`{elm:"div", cls:"\${1:cls}", elms:[\n]},\n`);
				completions.push(div);

				let img = new vscode.CompletionItem('elmImg', vscode.CompletionItemKind.Function);
				img.insertText = new vscode.SnippetString(`{elm:"img", src:"", id:"idImg", width:"100%"},\n`);
				completions.push(img);

				let btnDefault = new vscode.CompletionItem('elmBtnDefault', vscode.CompletionItemKind.Function);
				btnDefault.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-default", text:"\${1:Button}"},\n`);
				completions.push(btnDefault);

				let btnPrimary = new vscode.CompletionItem('elmBtnPrimary', vscode.CompletionItemKind.Function);
				btnPrimary.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-primary", text:"\${2:Button}"},\n`);
				completions.push(btnPrimary);

				let btnDanger = new vscode.CompletionItem('elmBtnDanger', vscode.CompletionItemKind.Function);
				btnDanger.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-danger", text:"\${2:Button}"},\n`);
				completions.push(btnDanger);

				let btnWarning = new vscode.CompletionItem('elmBtnWarning', vscode.CompletionItemKind.Function);
				btnWarning.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-warning", text:"\${2:Button}"},\n`);
				completions.push(btnWarning);

				let btnSecondary = new vscode.CompletionItem('elmBtnSecondary', vscode.CompletionItemKind.Function);
				btnSecondary.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-secondary", text:"\${2:Button}"},\n`);
				completions.push(btnSecondary);

				let btnOpsi = new vscode.CompletionItem('elmBtnOpsi', vscode.CompletionItemKind.Function);
				btnOpsi.insertText = new vscode.SnippetString(`{elm:"button", type:"button", id:"\${1:button}", cls:"btn btn-opsi", elms:[\n{elm:"span", cls:"material-icons", text:"\${2:edit}"}\n]},\n`);
				completions.push(btnOpsi);

				let H1 = new vscode.CompletionItem('elmH1', vscode.CompletionItemKind.Function);
				H1.insertText = new vscode.SnippetString(`{elm:"h1", text:"\${1:header1}"},\n`);
				completions.push(H1);

				let H2 = new vscode.CompletionItem('elmH2', vscode.CompletionItemKind.Function);
				H2.insertText = new vscode.SnippetString(`{elm:"h2", text:"\${1:header2}"},\n`);
				completions.push(H2);

				let H3 = new vscode.CompletionItem('elmH3', vscode.CompletionItemKind.Function);
				H3.insertText = new vscode.SnippetString(`{elm:"h3", text:"\${1:header3}"},\n`);
				completions.push(H3);

				let H4 = new vscode.CompletionItem('elmH4', vscode.CompletionItemKind.Function);
				H4.insertText = new vscode.SnippetString(`{elm:"h4", text:"\${1:header4}"},\n`);
				completions.push(H4);

				let H5 = new vscode.CompletionItem('elmH5', vscode.CompletionItemKind.Function);
				H5.insertText = new vscode.SnippetString(`{elm:"h5", text:"\${1:header5}"},\n`);
				completions.push(H5);

				let H6 = new vscode.CompletionItem('elmH6', vscode.CompletionItemKind.Function);
				H6.insertText = new vscode.SnippetString(`{elm:"h6", text:"\${1:header6}"},\n`);
				completions.push(H6);

				let span = new vscode.CompletionItem('elmSpan', vscode.CompletionItemKind.Function);
				span.insertText = new vscode.SnippetString(`{elm:"span", text:"\${1:span}"},\n`);
				completions.push(span);

				let Table = new vscode.CompletionItem('elmTable', vscode.CompletionItemKind.Function);
				Table.insertText = new vscode.SnippetString(`{elm:"table", cls:"\${1:table}", id:"\${2:table}", elms:[\n]},\n`);
				completions.push(Table);

				let Thead = new vscode.CompletionItem('elmThead', vscode.CompletionItemKind.Function);
				Thead.insertText = new vscode.SnippetString(`{elm:"thead", cls:"\${1:bg-thead}", elms:[\n]},\n`);
				completions.push(Thead);

				let Tbody = new vscode.CompletionItem('elmTbody', vscode.CompletionItemKind.Function);
				Tbody.insertText = new vscode.SnippetString(`{elm:"tbody", id:"\${1:tbody}", elms:[\n]},\n`);
				completions.push(Tbody);

				let Tfoot = new vscode.CompletionItem('elmTfoot', vscode.CompletionItemKind.Function);
				Tfoot.insertText = new vscode.SnippetString(`{elm:"tfoot", id:"\${1:tfoot}", elms:[\n]},\n`);
				completions.push(Tfoot);

				let Tr = new vscode.CompletionItem('elmTr', vscode.CompletionItemKind.Function);
				Tr.insertText = new vscode.SnippetString(`{elm:"tr", elms:[\n]},\n`);
				completions.push(Tr);

				let Td = new vscode.CompletionItem('elmTd', vscode.CompletionItemKind.Function);
				Td.insertText = new vscode.SnippetString(`{elm:"td", text:"\${1:nilai td}"},\n`);
				completions.push(Td);

				let Th = new vscode.CompletionItem('elmTh', vscode.CompletionItemKind.Function);
				Th.insertText = new vscode.SnippetString(`{elm:"th", text:"\${1:header td}"},\n`);
				completions.push(Th);

				let label = new vscode.CompletionItem('elmLabel', vscode.CompletionItemKind.Function);
				label.insertText = new vscode.SnippetString(`{elm:"label", text:"\${1:label}"},\n`);
				completions.push(label);

				let inputText = new vscode.CompletionItem('elmInputText', vscode.CompletionItemKind.Function);
				inputText.insertText = new vscode.SnippetString(`{elm:"input", type:"text", cls:"form-control", id:"\${1:edtText}", name:"\${2:namaText}", value:"\${3:nilai}", placeholder:"\${4:Silahkan ini text}"},\n`);
				completions.push(inputText);

				let inputNumber = new vscode.CompletionItem('elmInputNumber', vscode.CompletionItemKind.Function);
				inputNumber.insertText = new vscode.SnippetString(`{elm:"input", type:"number", cls:"form-control", id:"\${1:edtNumber}", name:"\${2:namaNumber}", value:"\${3:0}"}`);
				completions.push(inputNumber);

				let inputTextarea = new vscode.CompletionItem('elmInputTextarea', vscode.CompletionItemKind.Function);
				inputTextarea.insertText = new vscode.SnippetString(`{elm:"textarea", cls:"form-control", id:"\${1:edtTextarea}", name:"\${2:namaTextarea}", value:"\${3:keterangan}", placeholder:"\${4:Silahkan ini textarea}"}`);
				completions.push(inputTextarea);

				let inputSelect = new vscode.CompletionItem('elmInputSelect', vscode.CompletionItemKind.Function);
				inputSelect.insertText = new vscode.SnippetString(`{elm:"select", cls:"form-select", id:"\${1:edt}", name:"\${2:opsi}", elms:`);
				completions.push(inputSelect);

				let bsCheckbox = new vscode.CompletionItem('bsCheckbox', vscode.CompletionItemKind.Function);
				bsCheckbox.insertText = new vscode.SnippetString(`{"elm": "main", "elms": [\n{"elm": "div", "class": "form-check form-switch", "elms": [\n{"elm": "input", "cls": "form-check-input", "type": "checkbox", "role": "switch", "id": "\${1:chk}", name:"\${2:Status}", "checked": \${3:true} },\n{"elm": "label", "class": "form-check-label", "for": "\${4:chkAllDate}", "text": "\${5:Aktif}" }\n]}\n]},\n`);
				bsCheckbox.detail = "Ini adalah default chekbox dari bootstrap";
				completions.push(bsCheckbox);

				let table = new vscode.CompletionItem('bsTable', vscode.CompletionItemKind.Function);
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
				table.detail = "Ini akan membuatkan kamu template table full";
				completions.push(table);

				let bsInputText = new vscode.CompletionItem('bsInputText', vscode.CompletionItemKind.Function);
				bsInputText.insertText = new vscode.SnippetString(`{elm:"div", cls:"form-group", elms:[
					{elm:"label", text:"\${1:label}"},
					{elm:"input", type:"text", cls:"form-control", id:"\${2:edtText}", name:"\${3:namaText}", value:"\${4:nilai dari text}", placeholder:"\${5:Silahkan ini text}"},
					{elm:"div", cls:"invalid-feedback", text:"\${6:silahkan isi}"}
				]},\n`);
				bsInputText.detail = "ini akan membuatkan kamu div form-group dengan type text invalid-feedback sekalian";
				completions.push(bsInputText);

				let bsInputNumber = new vscode.CompletionItem('bsInputNumber', vscode.CompletionItemKind.Function);
				bsInputNumber.insertText = new vscode.SnippetString(`{elm:"div", cls:"form-group", elms:[
					{elm:"label", text:"\${1:label}"},
					{elm:"input", type:"number", cls:"form-control", id:"\${2:edtText}", name:"\${3:namaText}", value:"\${4:0}"},
					{elm:"div", cls:"invalid-feedback", text:"\${5:silahkan isi}"}
				]},\n`);
				bsInputNumber.detail = "ini akan membuatkan kamu div form-group dengan Number text invalid-feedback sekalian";
				completions.push(bsInputNumber);

				let bsInputTextArea = new vscode.CompletionItem('bsInputTextArea', vscode.CompletionItemKind.Function);
				bsInputTextArea.insertText = new vscode.SnippetString(`{elm:"div", cls:"form-group", elms:[
					{elm:"label", text:"\${1:label}"},
					{elm:"textarea", cls:"form-control", id:"\${2:edtText}", name:"\${3:namaText}", text:"\${4:alamat anda}"},
					{elm:"div", cls:"invalid-feedback", text:"\${5:silahkan isi}"}
				]},\n`);
				bsInputTextArea.detail = "ini akan membuatkan kamu div form-group dengan Textarea text invalid-feedback sekalian";
				completions.push(bsInputTextArea);

				let bsInputSelect = new vscode.CompletionItem('bsInputSelect', vscode.CompletionItemKind.Function);
				bsInputSelect.insertText = new vscode.SnippetString(`{elm:"div", cls:"form-group", elms:[
					{elm:"label", text:"\${1:label}"},
					{elm:"select", cls:"form-select", id:"\${2:edt}", name:"\${3:nama}", elms:[
						{elm:"option", value:"\${4:nilai1}", text:"\${5:nilai 1}"}
					]},
					{elm:"div", cls:"invalid-feedback", text:"\${6:silahkan isi}"}
				]},\n`);
				bsInputSelect.detail = "ini akan membuatkan kamu div form-group dengan select text invalid-feedback sekalian";
				completions.push(bsInputSelect);

				let row6 = new vscode.CompletionItem('bsRow6', vscode.CompletionItemKind.Function);
				row6.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-6", elms:[]},\n{elm:"div", cls:"col-6", elms:[]}\n],\n`);
				completions.push(row6);

				let row4 = new vscode.CompletionItem('bsRow4', vscode.CompletionItemKind.Function);
				row4.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-4", elms:[]},\n{elm:"div", cls:"col-4", elms:[]},\n{elm:"div", cls:"col-4", elms:[]}\n],\n`);
				completions.push(row4);

				let row3 = new vscode.CompletionItem('bsRow3', vscode.CompletionItemKind.Function);
				row3.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]},\n{elm:"div", cls:"col-3", elms:[]}\n],\n`);
				completions.push(row3);

				let row2 = new vscode.CompletionItem('bsRow2', vscode.CompletionItemKind.Function);
				row2.insertText = new vscode.SnippetString(`{elm:"div", cls:"row", elms:[\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]},\n{elm:"div", cls:"col-2", elms:[]}\n],\n`);
				completions.push(row2);

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
