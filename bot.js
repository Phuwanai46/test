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
                if(event.body.startsWith("/myname")) {
                    let arge = event.body.split(' ');
                    if(arge[1] === undefined) { 
                        api.sendMessage("กรุณาใส่ชื่อเช่น /myname name", event.threadID);
                    } else {
                        var img = {
                            body: "ไอเหี้ย" + arge[1] + "เป็นเกย์",
                            attachment: fs.createReadStream(__dirname + '/sat.jpg')
                        }
                        api.sendMessage(img, event.threadID);
                    }
                }
                    api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("/emoji")) {
                    let emo = event.body.split(' ');
                    if(emo[1] === undefined) { 
                        api.sendMessage("กรุณาใส่Emojiเช่น /emoji 😭 ", event.threadID);
                    } else {
                        api.changeThreadEmoji(emo[1], event.threadID, (err) => {
                            if(err) return console.error(err);
                        });
                    }
                }
                    api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
               });

        }

        switch (event.type) {
        	
            case "message":
            
                if(event.body.startsWith("/renamegroup")) {
                	
                    let threadname = event.body.split(' ');
                    
                    if(threadname[1] === undefined) { 

api.setMessageReaction("\uD83D\uDE20", event.messageID);

                        api.sendMessage("กรุณาใส่ชื่อกลุ่มเช่น /renamegroup MFTEAM", event.threadID);

                    } else {

api.setMessageReaction("\uD83D\uDE0D", event.messageID);

                        api.setTitle(threadname[1], event.threadID);
                      
  
                    }
                }

                    api.markAsRead(event.threadID, (err) => {

                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body === '/reimage') {
                    api.changeGroupImage(fs.createReadStream("img3.jpg"), event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body === '/help') {
                    api.sendMessage("----bot by: Nummon Hacker\n----เปลี่ยนอีโมจิ = /emoji\n----เปลี่ยนชื่อกลุ่ม = /renamegroup\n----เปลี่ยนสีแชท = /recolor\n----เปลี่ยนภาพกลุ่ม = /reimage\nบอทมีปัญหาติดต่อเฟซได้ที่ phuwanai chuchid", event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body === '/recolor') {
                    api.changeThreadColor("2058653964378557", event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
    });
});
