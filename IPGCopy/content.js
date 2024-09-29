// Função para clicar no botão "READY" quando encontrado
function clickReadyButton() {
    const readyButton = document.querySelector('button.WasdButton.WasdButton--success.WasdButton--lg[data-test="btn:ready"]');
    
    if (readyButton && readyButton.textContent.toUpperCase().includes('READY')) {
        readyButton.click();
        console.log('Botão READY clicado automaticamente!');
    } else {
        console.log('Botão READY não encontrado ou não está pronto.');
    }
}

// Verifica se a URL atual é a da página de match
if (window.location.href.includes('/match')) {
    // Cria um observador de mudanças no DOM para garantir que o botão seja clicado quando for adicionado
    const observer = new MutationObserver((mutationsList, observer) => {
        // Toda vez que o DOM muda, tenta encontrar o botão
        clickReadyButton();
    });

    // Configura o observador para observar mudanças no body da página
    observer.observe(document.body, { childList: true, subtree: true });

    // Tenta clicar no botão imediatamente após o carregamento
    setTimeout(() => {
        clickReadyButton();
    }, 1500); // Ajuste o tempo conforme necessário
}
