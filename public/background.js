chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.action === "show") {
        chrome.pageAction.show(sender.tab.id);
    }
    if (req.action === "addToJul") {
        let ingredientJul = req.data;
        postAllItemsToJul(ingredientJul);
    }
});

async function postItemToJulCart(item) {
    await fetch("https://sap.jul.co.il/?wc-ajax=add_to_cart", {
        "credentials": "include",
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9,he;q=0.8",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        "body": `quantity=1&product_id=${item}`,
        "method": "POST",
        "mode": "no-cors"
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    });
}

async function postAllItemsToJul(ingredientJul) {
    for (i in ingredientJul) {
        await postItemToJulCart(ingredientJul[i]);
    }
}