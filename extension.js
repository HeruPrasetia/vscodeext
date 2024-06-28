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
			provideCompletionItems(document, position, token, context) {
				let completions = [];
				let opt = {
					divid: "divtable",
					id: "tableid",
					dataset: { data: "data", field: "field" },
					sortby: false,
					groupby: false,
					sort: "sort",
					by: "bt",
					page: "page",
					tbody: {
						id: "tbodyid",
						opsi: [
							{ type: "edit", event: "handleEdit", cap: "Edit" },
							{ type: "info", event: "handleDetail", cap: "Detail" },
							{ type: "delete", event: "modalHapus2", cap: "Hapus" },
						],
						click: false,
						dblclick: false
					},
					footer: {

					},
					pagination: { div: "divPagination" }
				};

				let completion = new vscode.CompletionItem('rendTables', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendTables(${JSON.stringify(opt, null, 4)})`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(provider);

	let providerModal = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				let completions = [];

				let modalOpt = {
					title: "Title",
					form: true,
					fn: "submitForm(event, {crud:'model/', fn:'main', modal:'ya'})",
					btn: 'btnTutup',
					footer: 'btnSave',
					body: "body"
				};

				let completion = new vscode.CompletionItem('rendModal', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendModal(${JSON.stringify(modalOpt, null, 4).replace(/(?:\r\n|\r|\n)/g, '\n\t')}\n)`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerModal);

	const rendFormsCommand = vscode.commands.registerCommand('naylatools-framework.rendForms', async function () {
		// Collect input from user
		const input = await vscode.window.showInputBox({
			prompt: 'Enter form elements separated by commas (e.g., select,text,textarea,checkbox)',
			placeHolder: 'select,text,textarea,checkbox'
		});

		if (input) {
			// Split input into array of elements
			const elements = input.split(',').map(item => item.trim());

			// Generate the array of form objects
			const forms = elements.map(type => ({
				type: type,
				label: type,
				name: type
			}));

			// Generate the snippet string
			const snippet = new vscode.SnippetString(`([${forms.map(form => JSON.stringify(form)).join(',\n\t')}])`);

			// Insert the snippet into the active text editor
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.insertSnippet(snippet);
			}
		}
	});

	context.subscriptions.push(rendFormsCommand);

	const providerForms = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completion = new vscode.CompletionItem('rendForms', vscode.CompletionItemKind.Function);
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
			provideCompletionItems(document, position, token, context) {
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
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
