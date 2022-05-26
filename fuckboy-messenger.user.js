// ==UserScript==
// @name            Fuckboy Messenger
// @namespace       sueszli
// @match           *://*web.whatsapp.com/*
// @grant           none
// @version         1.0
// @author          sueszli
// @description     Automatize the daily fuckboy business! (created as a joke for a friend)
// ==/UserScript==

// also see: https://greasyfork.org/en/scripts/36066-whatsapp-web-spammer/code

// ======================================== DATA ========================================
let messages = [
    "Yeah that really sucks... or doesn't - don't know. Anyway do you know anyone that's down for a threesome?",
    "Can I just be honest with you for a second? This whole conversation is just a joke, right? I'm not even sure if I'm actually interested in you",
    "I know exactly how to treat you right - just give me a call and I'll be right there whenever you feel like it",
    "So what's cooking, good-looking? Wyd tonight? I'm in the mood for a good time",
    "You're just overthinking everything. I'm not even sure what I meant by that",
    "So this is coming out of nowhere but I've been thinking about you a lot recently - you catch my drift?",
    "Man I wish I was in Berlin right now ...",
    "I pursue beautiful women and even more beautiful poetry - what is the last book you read?",
    "Yeah I'm super into techno and even more into technology - have you heard of NFT's before?",
    "Aha you remind me of my ex - she was so hot. I mean, I don't know if I can say that, but I think she was a great friend - and she still is to me",
    "Idk maybe i romanticise but you have a special vibe that I can't get enough of aha. Anyway wanna listen to mac demarco at mine? <3",
    "Yo it's not that deep - I'm just living in the moment - I'm not sure if I'm in love with you - but I love having a good time with you aha",
    "Yeah I'd consider myself an artist - I know a lot of art - I know how to appreciate beauty",
];
// ========================================================================================


// util ::
/**
 * Returns the first node matching the xPath expression.
 */
function getFirstNode(xpath) {
    let nodes = [];
    let result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    let node = result.iterateNext();
    while (node) {
        nodes.push(node);
        node = result.iterateNext();
    }
    return nodes[0];
}
// :: util


// features ::
function changeChatName() {
    // set all contact names to jaqueline
    const nameElem = getFirstNode("//header/div[2]/div[1]/div[1]/span[1]");
    if (nameElem) {
        nameElem.innerHTML = "Jaqueline Ferguson";
    }
}

function createMessageButton() {
    // button already exists
    const button = document.getElementById('messageButton');
    let chatBar = getFirstNode("//body/div[@id='app']/div[1]/div[1]/div[4]/div[1]/footer[1]/div[1]");
    if(button || !chatBar) {
        return;
    }

    // create eggplant button
    let b = document.createElement('button');
    b.setAttribute("id", "messageButton");
    b.innerHTML = '🍆';
    b.style.fontSize = '120%';
    b.style.padding = '0.5rem 0.5rem 1rem 1.4rem';
    chatBar.append(b);
    b.onclick = () => {
        insertMessage();
    }
}

function insertMessage() {
    let container1 = getFirstNode("//body/div[@id='app']/div[1]/div[1]/div[4]/div[1]/footer[1]/div[1]/div[1]/span[2]/div[1]/div[2]/div[1]/div[1]")
    container1.classList.add("focused");

    let container2 = getFirstNode("//div[contains(text(),'Type a message')]");
    container2.style.visibility = "hidden";

    // write one of messages into text field
    let textField = getFirstNode("//body/div[@id='app']/div[1]/div[1]/div[4]/div[1]/footer[1]/div[1]/div[1]/span[2]/div[1]/div[2]/div[1]/div[1]/div[2]");
    textField.innerHTML = messages[Math.floor(Math.random() * messages.length)];
    textField.focus();
    let evt = new Event('input', {
        bubbles: true
    });
    textField.dispatchEvent(evt);

    // "ENTER" keyboard key event to send message
    let event_Enter = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13
    });
    textField.dispatchEvent(event_Enter);
}

function setComicSans() {
    let head = document.getElementsByTagName ('head')[0];
    let s = document.createElement ('style');
    s.setAttribute ('type', 'text/css');

    if (s.styleSheet) {
        s.styleSheet.cssText = "body { font-family: \"Comic Sans MS\"!important; } ";
    } else {
        s.appendChild (document.createTextNode ("body { font-family: \"Comic Sans MS\"!important; } "));
    }
    head.appendChild (s);
}
// :: features


// main ::
console.clear();
setComicSans();

document.onclick = () => {
    changeChatName();
    createMessageButton();
    setComicSans();
};
// :: main