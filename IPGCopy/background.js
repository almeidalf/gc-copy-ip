chrome.webRequest.onCompleted.addListener(
    function(details) {
        fetch(details.url)
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.step === "onServerReady") {
                    const ip = data.data.ip;
                    const password = data.data.password;

                    if (ip && password) {
                        const connectCommand = `connect ${ip}; password ${password}`;

                        // Armazena o connectCommand no storage
                        chrome.storage.local.set({ connectCommand }, () => {
                            console.log('Connect command saved:', connectCommand);
                        });
                    } else {
                        console.log("Aguardando IP...");
                    }
                } else {
                    // Limpa o connectCommand caso não esteja disponível
                    chrome.storage.local.remove('connectCommand');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    },
    { urls: ["*://gamersclub.com.br/api/lobby/match*"], types: ["xmlhttprequest"] }
);
