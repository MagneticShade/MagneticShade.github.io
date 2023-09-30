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

console.log(Telegram.WebApp.initData)

fetch("http://localhost:8080",{
    method:'POST',
    body:JSON.stringify(Telegram.WebApp.initData)
}).then(response=>{
    console.log(response)
    return response.json()
}).then(result=>{
    console.log(result)
})