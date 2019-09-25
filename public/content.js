chrome.runtime.sendMessage({action: "show"})
let infinite_scrolling = document.getElementsByClassName("infinite-scrolling")[0];
infinite_scrolling.className = "";
let col4 = document.getElementsByClassName("col4")[0];
col4.className = "block inner";

removeByClassName('sidebar');
removeByClassName('ob-widget');
removeByClassName('OUTBRAIN');
removeByClassName('rel-scroller-container');
removeByClassName('banner');
removeByClassName('related-items');
removeByClassName('related-all-items');

let sendBtn = document.getElementsByClassName('send-list-mail')[0];
sendBtn.className = "send-all";
sendBtn.innerText = "Add all";
let newBtn = document.createElement('button');
newBtn.innerHTML = "Add checked";
newBtn.className = "send-all";
sendBtn.insertAdjacentElement("afterend", newBtn);

function removeByClassName(className) {
    let elements = document.getElementsByClassName(className);
    for (let elem of elements) {
        elem.parentNode.removeChild(elem)
    }
}