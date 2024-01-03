// ==UserScript==
// @name         AWS SAML Accounts Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove unneeded accounts from AWS SAML sign-in page
// @match        https://signin.aws.amazon.com/saml
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // List of excluded names
    const excludedNames = [
        'account-alias',
        'Account: 000000000000'
    ];

    // Function to delete div:nth-child elements
    function deleteDivElements() {
        const fieldset = document.querySelector('#saml_form > fieldset');

        if (fieldset) {
            const divElements = fieldset.querySelectorAll('div:nth-child(n)');

            divElements.forEach(divElement => {
                const expandableContainer = divElement.querySelector('div.expandable-container > div');
                if (expandableContainer) {
                    const content = expandableContainer.textContent.trim();
                    if (excludedNames.some(name => content.includes(name))) {
                        divElement.remove();
                    }
                }
            });
        }
    }

    // Wait for the page to load, then delete div:nth-child elements
    window.addEventListener('load', deleteDivElements);
})();
