chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.action === "action") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
        });
    }
})