const ingredientJul = [],
    julJson = {
        "עגבניות": "148401",
        "בצלים ירוקים": "148319"
    },
    classArray = ['sidebar', 'popup-overlay', 'ob-widget', 'OUTBRAIN', 'rel-scroller-container', 'banner', 'related-items', 'related-all-items', 'ingredients-gallery-switch', 'switch-gallery', 'ingredients-create-cart', 'social-share', 'switch-bottom-btn', 'recipe-tags', 'social-bottom-ending']

chrome.runtime.sendMessage({action: "show"})
removeInfinateScroll();
changeStyles();
removeAllClassNames(classArray);
addCartButton();
clickAllIngrediensBtn();

let ingredients = getIngrediants();
for (i in ingredients) {
    if (julJson[ingredients[i]]) {
        ingredientJul.push(julJson[ingredients[i]]);
    }
}
chrome.runtime.sendMessage({action: "addToJul", data: ingredientJul})

function getIngrediants() {
    let ingredientsText = [];
    let ingredients = document.getElementsByClassName('ingridients')[0];
    let ingredientSingles = ingredients.getElementsByClassName('ingredient-single');
    for (i in ingredientSingles) {
        let ingredient = ingredientSingles[i];
        let text = ingredient.innerText;
        console.log(text);
        ingredientsText.push(text);
    }
    return ingredientsText;
}

function removeAllClassNames(classArray) {
    for (let className of classArray) {
        removeByClassName(className);
    }
}

function removeByClassName(className) {
    try {
        let elements = document.getElementsByClassName(className);
        for (let elem of elements) {
            elem.parentNode.removeChild(elem)
        }
    } catch (e) {
        console.log(`Can't find element with class: ${className}`)
    }
}

function changeStyles() {
    try {
        let col4 = document.getElementsByClassName("col4")[0];
        col4.className = "block inner";
    } catch (e) {
        console.log(`Can't change style`)
    }
}

function clickAllIngrediensBtn() {
    try {
        let allIngredientsBtn = document.getElementsByClassName('show-all-ingredients')[0];
        allIngredientsBtn.click();
    } catch (e) {
        console.log(`Can't click allIngredientsBtn`)
    }
}

function removeInfinateScroll() {
    try {
        let infinite_scrolling = document.getElementsByClassName("infinite-scrolling")[0];
        infinite_scrolling.className = "";
    } catch (e) {
        console.log(`Can't find infinite-scrolling`)
    }
}

function addCartButton() {
    try {
        let sendBtn = document.getElementsByClassName('send-list-mail')[0];

        let newCheckAllBtn = document.createElement('button');
        newCheckAllBtn.innerText = "סמן את כל המצרכים";
        newCheckAllBtn.className = "send-all";

        let newSendCheckedBtn = document.createElement('button');
        newSendCheckedBtn.innerHTML = "שלח את המצרכים המסומנים ל-Jul";
        newSendCheckedBtn.className = "send-all";
        newSendCheckedBtn.style.backgroundColor = "rgb(37,207,230)";
        sendBtn.insertAdjacentElement("afterend", newSendCheckedBtn);
        sendBtn.insertAdjacentElement("afterend", newCheckAllBtn);

        sendBtn.parentNode.removeChild(sendBtn)
    } catch (e) {
        console.log(`Can't add cart button`)
    }
}