'use strict';



chrome.runtime.onMessage.addListener(receiver);
function receiver(words, sender, sendResponse) {
    let apple = words['apple'];
    let lemon = words['lemon'];
    let kiwi = words['kiwi'];

    function findWords (node, word, color) {
        if (node.nodeType === document.ELEMENT_NODE) {
            for (var i = 0; i < node.childNodes.length; i++) {
                if (findWords(node.childNodes[i], word, color)) {
                }
            }
        } else if (node.nodeType === document.TEXT_NODE && node.nodeValue.indexOf(word) > -1 && node.parentNode.className != 'findWord') {
            node.parentNode.innerHTML = node.parentNode.innerHTML.replace(word, '<span style=background-color:'+color+'>'+word+'</span>')
        }
    }

    findWords(document.body, apple, 'red');
    findWords(document.body, lemon, 'yellow');
    findWords(document.body, kiwi, 'green');

    var target = document.body;
    var observer = new MutationObserver(function(mutations) {
        findWords(document.body, apple, 'red');
        findWords(document.body, lemon, 'yellow');
        findWords(document.body, kiwi, 'green');
    });

    var config = { childList: true, characterData: true };

    observer.observe(target, config);
}