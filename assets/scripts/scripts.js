// Init TWA
Telegram.WebApp.ready();

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent('themeChanged', function() {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Show main button
Telegram.WebApp.MainButton.setParams({
    text: 'Main Button'
});
Telegram.WebApp.MainButton.onClick(function () {
    let initDataURLSP = new URLSearchParams(WebApp.initData);
    let hash = initDataURLSP.get('hash');

    initDataURLSP.delete('hash');
    initDataURLSP.sort();
    let checkDataString = initDataURLSP.toString().replaceAll('&', '\n');

    let xhrURL = new URL('https://<your_domain>/<userIsValid>');
    xhrURL.searchParams.set('hash', hash);
    xhrURL.searchParams.set('checkDataString', checkDataString);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', xhrURL);
    xhr.send();
    xhr.onload = function() {
        if (JSON.parse(xhr.response).result == true) {
            WebApp.showAlert(`Добро пожаловать, @${WebApp.WebAppUser.username}.`);
        } else {
            WebApp.showAlert("Ты что, хакер?");
            WebApp.close();
        }
    }
});
Telegram.WebApp.MainButton.show();

// Function to call showPopup API
function showPopup() {
    Telegram.WebApp.showPopup({
        title: 'Title',
        message: 'Some message',
        buttons: [
            {id: 'link', type: 'default', text: 'Open ton.org'},
            {type: 'cancel'},
        ]
    }, function(btn) {
        if (btn === 'link') {
            Telegram.WebApp.openLink('https://ton.org/');
        }
    });
}

// Function to toggle main TWA button
function toggleMainButton() {
    if (Telegram.WebApp.MainButton.isVisible) {
        Telegram.WebApp.MainButton.hide();
    } else {
        Telegram.WebApp.MainButton.show();
    }
}

function setViewportData() {
    var sizeEl = document.getElementById('viewport-params-size');
    sizeEl.innerText = 'width: ' + window.innerWidth + ' x ' +
        'height: ' + Telegram.WebApp.viewportStableHeight;

    var expandEl = document.querySelector('#viewport-params-expand');
    expandEl.innerText = 'Is Expanded: ' + (Telegram.WebApp.isExpanded ? 'true' : 'false');
}

Telegram.WebApp.setHeaderColor('secondary_bg_color');

setViewportData();
Telegram.WebApp.onEvent('viewportChanged', setViewportData);

Telegram.WebApp.onEvent('themeChanged', function() {
    document.body.setAttribute('style', '--bg-color:' + Telegram.WebApp.backgroundColor);
});