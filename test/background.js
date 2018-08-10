'use strict';

function CreateRequest() {
    var Request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            Request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}

let xhr = CreateRequest();
xhr.open('GET', '/words.json');
xhr.responseType = 'json';
xhr.send();
console.log(xhr);

chrome.tabs.onUpdated.addListener(update);

function update(tabId, changeInfo, tab) {
    let gotWords = xhr.response;
    chrome.tabs.sendMessage(tab.id, gotWords);
}
