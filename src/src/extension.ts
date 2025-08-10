import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('AI Plugin активирован');

  const disposable = vscode.commands.registerCommand('cursorAiPlugin.openChat', () => {
    vscode.window.showInformationMessage('Открываем AI чат...');

    // Создаём веб-вид (WebView)
    const panel = vscode.window.createWebviewPanel(
      'aiChat',
      'AI Chat',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true
      }
    );

    panel.webview.html = getWebviewContent();
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return `<!DOCTYPE html>
  <html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Chat</title>
    <style>
      body { font-family: sans-serif; padding: 10px; }
      #messages { height: 70vh; overflow-y: auto; border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
      #input { width: 100%; padding: 8px; }
    </style>
  </head>
  <body>
    <div id="messages">Привет! Я — ваш AI помощник.</div>
    <input id="input" type="text" placeholder="Задайте вопрос по коду..." />
    <script>
      const input = document.getElementById('input');
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const value = input.value;
          document.getElementById('messages').innerHTML += '<p><strong>Вы:</strong> ' + value + '</p>';
          input.value = '';
          // Здесь можно отправить запрос в ИИ через Cursor API
        }
      });
    </script>
  </body>
  </html>`;
}

export function deactivate() {}
