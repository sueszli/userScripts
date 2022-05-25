// ==UserScript==
// @name            WhatsApp Chats
// @namespace       sueszli
// @match           *://*web.whatsapp.com/*
// @grant           none
// @version         1.0
// @author          sueszli
// @description     Simple functions to read chat elements from active and archived chats.
// ==/UserScript==


// ======================================== CONFIG ========================================  
let selectedChats = ["Test 0", "Test 1", "Test 2"];
// ========================================================================================


// util ::
/**
 * Waits for logout button to disappear (then page is fully loaded)
 */
function applicationReady() {
    const logOutButtonPath = "//body/div[@id='app']/div[1]/div[1]/div[5]/div[1]";

    return new Promise((resolve, reject) => {
        const el = getNodes(logOutButtonPath);
        // loaded immediately
        if (!el) {
            resolve(el);
        }
        // wait for it to disappear
        new MutationObserver((mutationRecords, observer) => {
            // Query for elements matching the specified selector
            const e = getNodes(logOutButtonPath);
            if (e.length === 0) {
                resolve(getNodes(logOutButtonPath));
                observer.disconnect();
            }
        }).observe(document.documentElement, {
            childList: true, subtree: true
        });
    });
}

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element which it then returns.
 */
function elementReady(xPath) {
    return new Promise((resolve, reject) => {
        const el = getNodes(xPath);
        // found immediately
        if (el) {
            resolve(el);
        }
        // wait for it to appear
        new MutationObserver((mutationRecords, observer) => {
            // Query for elements matching the specified path
            if (getNodes(xPath).length === 0) {
                resolve(getNodes(xPath));
                observer.disconnect();
            }
        }).observe(document.documentElement, {
            childList: true, subtree: true
        });
    });
}

/**
 *  Returns an array of nodes matching the xPath expression.
 */
function getNodes(xpath) {
    let nodes = [];
    let result = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    let node = result.iterateNext();
    while (node) {
        nodes.push(node);
        node = result.iterateNext();
    }
    return nodes;
}

/**
 * Returns the first node matching the xPath expression.
 */
function getFirstNode(xPath) {
    return getNodes(xPath)[0];
}
// :: util


// reader ::
/**
 * Reads chat elements from active chats
 */
function getLastChats() {
    // get active chats
    let sidePanel = getFirstNode("//body/div[@id='app']/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[1]/div[1]");
    let chatElems = sidePanel.children;

    // filter
    for (let i = 0; i < chatElems.length; i++) {
        let contactName = chatElems[i].querySelector("[role='gridcell'] span").innerText;
        if (selectedChats.includes(contactName)) {
            console.log("%c[selected] Active Chat: " + contactName, "background: #222; color: #bada55");
        } else {
            console.log("Active Chat: " + contactName);
        }
    }
}

/**
 * Reads chat elements from archived chats
 */
function getArchivedChats() {
    // open archived chats panel
    getFirstNode("//body/div[@id='app']/div[1]/div[1]/div[3]/div[1]/div[2]/button[1]").click();

    // wait for archived chats to load
    const sidePanelPath = "//body/div[@id='app']/div[1]/div[1]/div[2]/div[1]/span[1]/div[1]/span[1]/div[1]/div[1]/div[1]/div[1]/div[1]";
    elementReady(sidePanelPath).then(() => {
        let sidePanel = getFirstNode(sidePanelPath);
        let chatElems = sidePanel.children;

        // filter
        for (let i = 0; i < chatElems.length; i++) {
            let contactName = chatElems[i].querySelector("[role='gridcell'] span").innerText;
            if (selectedChats.includes(contactName)) {
                console.log("%c[selected] Archived Chat: " + contactName, "background: #222; color: #bada55");
            } else {
                console.log("Archived Chat: " + contactName);
            }
        }

        // close archived chats panel
        getFirstNode("//header/div[1]/div[1]/button[1]").click();
    })
}
// :: reader


// main ::
(function () {
    'use strict';

    // wait for DOM to load and the 'logout' button to disappear
    window.addEventListener("load", () => {
        applicationReady().then(() => {
            console.clear();
            console.log("Starting script...\n");
            getLastChats();
            getArchivedChats();
        });
    });
})();
// :: main
