const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "naylatools-framework" is now active!');
	const disposable = vscode.commands.registerCommand('naylatools-framework.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World from NaylaTools Framework!');
	});

	context.subscriptions.push(disposable);

	const provider = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completions = [];
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

				const completion = new vscode.CompletionItem('rendTables', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendTables(${JSON.stringify(opt, null, 4)})`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(provider);

	const providerModal = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completions = [];

				let modalOpt = {
					title: "Title",
					form: true,
					fn:"submitForm(event, {crud:'model/', fn:'main', modal:'ya'})",
					btn:'btnTutup',
					footer:'btnSave',
					body:"body"
				};

				const completion = new vscode.CompletionItem('rendModal', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendModal(${JSON.stringify(modalOpt, null, 4).replace(/(?:\r\n|\r|\n)/g, '\n\t')}\n)`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerModal);

	const providerForms = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completions = [];

				let opt = [
					{type:"text", name:"nama", label:"Nama", req:"Silahkan Masukan Form"}
				];

				const completion = new vscode.CompletionItem('rendForms', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`rendForms(${JSON.stringify(opt, null, 4).replace(/(?:\r\n|\r|\n)/g, '\n\t')}\n)`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerForms);

	const providerGIclick = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completions = [];
				const completion = new vscode.CompletionItem('GIClick', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('click', (e)=>{\n\})`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerGIclick);

	const providerGIchange = vscode.languages.registerCompletionItemProvider(
		['javascript', 'php'],
		{
			provideCompletionItems(document, position, token, context) {
				const completions = [];
				const completion = new vscode.CompletionItem('GIChange', vscode.CompletionItemKind.Function);
				completion.insertText = new vscode.SnippetString(`GI("inidi").addEventListener('change', (e)=>{\n\})`);
				completions.push(completion);

				return completions;
			}
		}
	);

	context.subscriptions.push(providerGIchange);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
};
