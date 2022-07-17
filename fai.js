const fs = require("fs");
const login = require("fb-chat-api");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
    
    api.setOptions({listenEvents: true});

    var listenEmitter = api.listen((err, event) => {
        if(err) return console.error(err);

        switch (event.type) {
            case "message":
                if(event.body === '/likepost') {
                    api.setPostReaction("pfbid035P1511Soi4BZmQvr2G9ywLeWLSFsnp5Hd79XMQ5Yxfc3YLZNrH2x4vefwg6r3B7Vl","4", event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
    });
});