document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');

    // Checa o estado atual do IP e atualiza o botão
    chrome.storage.local.get('connectCommand', (result) => {
        if (result.connectCommand) {
            updateButtonState(true, result.connectCommand);
        } else {
            updateButtonState(false);
        }
    });

    // Atualiza o botão quando o IP estiver disponível ou não
    function updateButtonState(isAvailable, connectCommand = '') {
        if (isAvailable) {
            copyButton.textContent = 'COPIAR IP'; // Atualiza o texto para "COPIAR IP"
            copyButton.classList.remove('not-available'); // Remove a classe vermelha
            copyButton.classList.add('available'); // Adiciona a classe verde
            copyButton.onclick = () => {
                navigator.clipboard.writeText(connectCommand).then(() => {
                    // Mostra a notificação de sucesso
                    showNotification('Sucesso!', 'Comando copiado para a área de transferência!', true);
                }).catch(err => {
                    console.error('Erro ao copiar para o clipboard:', err);
                    // Mostra a notificação de erro
                    showNotification('Erro!', 'Erro ao copiar o comando.', false);
                });
            };
        } else {
            copyButton.textContent = 'IP INDISPONÍVEL'; // Atualiza o texto para "IP INDISPONÍVEL"
            copyButton.classList.remove('available'); // Remove a classe verde
            copyButton.classList.add('not-available'); // Adiciona a classe vermelha
            copyButton.onclick = () => {
                // Mostra a notificação avisando que o IP não está disponível
                showNotification('IP Indisponível', 'O IP ainda não está disponível!', false);
            };
        }
    }

    // Função para mostrar notificações nativas do Chrome
    function showNotification(title, message, isSuccess) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon_128.png',  // Ícone que será exibido na notificação
            title: title,
            message: message,
            priority: 1
        });
    }

    // Atualiza o estado do botão quando uma nova mensagem é recebida
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.connectCommand) {
            updateButtonState(true, changes.connectCommand.newValue);
        }
    });
});