/**
 * WCE HYBRID TRANSLATION ENGINE
 * Combines a fast-loading UI dictionary with a full-page automatic engine.
 */

const WCE_DICTIONARY = {
    hi: {
        "Walchand College of Engineering": "वालचंद कॉलेज ऑफ इंजीनियरिंग",
        "Home": "होम",
        "About Us": "हमारे बारे में",
        "Academics": "अकादमिक",
        "Admissions": "प्रवेश",
        "Placements": "प्लेसमेंट",
        "Campus Life": "कैंपस जीवन",
        "Research": "अनुसंधान",
        "Clubs": "क्लब",
        "Contact Us": "संपर्क करें",
        "Notices": "सूचनाएं",
    },
    mr: {
        "Walchand College of Engineering": "वालचंद कॉलेज ऑफ इंजिनियरिंग",
        "Home": "मुखपृष्ठ",
        "About Us": "आमच्याबद्दल",
        "Academics": "शैक्षणिक",
        "Admissions": "प्रवेश",
        "Placements": "प्लेसमेंट",
        "Campus Life": "कॅम्पस जीवन",
        "Research": "संशोधन",
        "Clubs": "क्लब",
        "Contact Us": "संपर्क करा",
        "Notices": "सूचना",
    }
};

// 1. Google Translate Core Logic
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,hi,mr',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_hidden_element');
}

function triggerGoogleTranslate(langCode) {
    const gtCombo = document.querySelector('.goog-te-combo');
    if (gtCombo) {
        gtCombo.value = langCode;
        gtCombo.dispatchEvent(new Event('change'));
    } else {
        // If combo isn't ready, try again in 500ms
        setTimeout(() => triggerGoogleTranslate(langCode), 500);
    }
}

// 2. Manual UI Translation (Fast)
function translateUI(lang) {
    if (lang === 'en') return;
    const dict = WCE_DICTIONARY[lang];
    if (!dict) return;

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while(node = walk.nextNode()) {
        const text = node.nodeValue.trim();
        if (dict[text]) node.nodeValue = dict[text];
    }
}

// 3. Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Add Google Translate Script manually with HTTPS to work on file://
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    const langSelect = document.querySelector('.lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('wce_lang_pref', lang);
            
            // Trigger both
            translateUI(lang);
            triggerGoogleTranslate(lang === 'en' ? '' : lang);
        });

        // Restore preference
        const saved = localStorage.getItem('wce_lang_pref');
        if (saved && saved !== 'en') {
            langSelect.value = saved;
            setTimeout(() => {
                translateUI(saved);
                triggerGoogleTranslate(saved);
            }, 1500);
        }
    }
});

// Hide Google's UI
const extraStyle = document.createElement('style');
extraStyle.innerHTML = `
    iframe.goog-te-banner-frame { display: none !important; }
    body { top: 0px !important; }
    #google_translate_hidden_element { visibility: hidden; position: absolute; z-index: -1; }
    .goog-te-gadget { display: none !important; }
`;
document.head.appendChild(extraStyle);
