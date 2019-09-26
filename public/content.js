chrome.runtime.sendMessage({action: "show"});

const julJson = {
        "עגבניות": "148401",
        "בצלים ירוקים": "148319",
        "פלפל ירוק חריף": "148327",
        "כוסברה": "148379",
        "מיץ לימון": "151722",
        "מלח": "148717",
        "פלפל שחור גרוס": "161020",
    },
    classArray = ['sidebar', 'popup-overlay', 'ob-widget', 'OUTBRAIN', 'rel-scroller-container', 'banner', 'related-items', 'related-all-items', 'ingredients-gallery-switch', 'switch-gallery', 'ingredients-create-cart', 'social-share', 'switch-bottom-btn', 'recipe-tags', 'social-bottom-ending']

removeInfinateScroll();
changeStyles();
removeAllClassNames(classArray);
addButtons();
clickAllIngrediensBtn();

function getCheckedIngredients() {
    let ingredientsText = [];
    let ingredients = document.getElementsByClassName('ingridients')[0];
    let ingredientSingles = ingredients.getElementsByClassName('ingredient-single');
    for (i in ingredientSingles) {
        try {
            let ingredient = ingredientSingles[i];
            let checkbox = ingredient.getElementsByTagName('input')[0];
            if (checkbox.checked) {
                let text = ingredient.innerText;
                console.log(text);
                ingredientsText.push(text);
            }
        } catch (e) {
            console.log(e.message);
        }
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
        allIngredientsBtn.parentNode.removeChild(allIngredientsBtn)

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

function uncheckAll() {
    for (let i = 0; i < 2; i++) {
        let ingredients = document.getElementsByClassName('ingridients')[i];
        let ingredientSingles = ingredients.getElementsByClassName('ingredient-single');
        for (j in ingredientSingles) {
            try {
                let ingredient = ingredientSingles[j];
                let checkbox = ingredient.getElementsByTagName('input')[0];
                checkbox.checked = false;
            } catch (e) {
                console.log(e.message)
            }
        }
        let checkAllBtn = document.getElementsByClassName('check-all')[0];
        checkAllBtn.innerText = "סמן את כל המצרכים";
        checkAllBtn.onclick = checkAll;
    }
}

function checkAll() {
    for (let i = 0; i < 2; i++) {
        let ingredients = document.getElementsByClassName('ingridients')[i];
        let ingredientSingles = ingredients.getElementsByClassName('ingredient-single');
        for (j in ingredientSingles) {
            try {
                let ingredient = ingredientSingles[j];
                let checkbox = ingredient.getElementsByTagName('input')[0];
                checkbox.checked = true;
            } catch (e) {
                console.log(e.message)
            }
        }
        let checkAllBtn = document.getElementsByClassName('check-all')[0];
        checkAllBtn.innerText = "בטל סימונים";
        checkAllBtn.onclick = uncheckAll;
    }
}

function sendToJul() {
    const ingredientJul = [],
        ingredients = getCheckedIngredients();
    for (i in ingredients) {
        if (julJson[ingredients[i]]) {
            ingredientJul.push(julJson[ingredients[i]]);
        }
    }
    if (ingredientJul.length > 0) {
        chrome.runtime.sendMessage({action: "addToJul", data: ingredientJul})
    }
}

function addButtons() {
    try {
        let sendBtn = document.getElementsByClassName('send-list-mail')[0];

        let newCheckAllBtn = document.createElement('button');
        newCheckAllBtn.innerText = "סמן את כל המצרכים";
        newCheckAllBtn.className = "send-all check-all";
        newCheckAllBtn.onclick = checkAll;

        let newSendCheckedBtn = document.createElement('button');
        newSendCheckedBtn.innerHTML = "שלח את המצרכים המסומנים ל-Jul";
        newSendCheckedBtn.className = "send-all send-to-jul";
        newSendCheckedBtn.style.backgroundColor = "rgb(37,207,230)";
        newSendCheckedBtn.onclick = sendToJul;

        sendBtn.insertAdjacentElement("afterend", newSendCheckedBtn);
        sendBtn.insertAdjacentElement("afterend", newCheckAllBtn);

        sendBtn.parentNode.removeChild(sendBtn)
    } catch (e) {
        console.log(`Can't add cart button`)
    }
}