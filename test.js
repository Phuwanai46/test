const fs = require("fs");
const login = require("fb-chat-api");
const ps = require("prompt-sync");
const prompt = ps();

// Simple echo bot. He'll repeat anything that you say.
// Will stop when you say '/stop'

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var listenEmitter = api.listen((err, event) => {
        if(err) return console.error(err);

       switch (event.type) {
            case "message":
                if(event.body === '/adduser') {
                    api.addUserToGroup("100023848152009", event.threadID);
                    	if(err) console.error(err);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
    });
});
