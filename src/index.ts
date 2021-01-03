require("dotenv").config();

import { Client, Message } from "discord.js";

let client: Client = new Client();

client.on("ready", async function(){
    console.log("[+] Бот вышел в онлайн как "+client.user.tag+".");
    await client.user.setActivity("ping help", {
        type: "PLAYING"
    });
});

client.on("message", async function(message: Message){
    if(message.author.bot || message.channel.type == "dm" || !message.content)return;
    if(message.content == "ping"){
        return await message.channel.send(":ping_pong: Pong!");
    }
    if(message.content == "ping help"){
        return await message.channel.send("ping - то, ради чего этот бот существует...\nping help - показать это сообщение.\nping invite - ссылка-приглашение бота.\nping support - приглашение на сервер поддержки(морально не поддержим, закибербуллим).");
    }
    if(message.content == "ping invite"){
        return await message.channel.send("Приглашение этого чуда, распространи!\n<========>\n-> https://discord.com/api/oauth2/authorize?client_id=795260082677350424&permissions=8&scope=bot <-\n<========>\nhttps://cdn.discordapp.com/attachments/795267119226552333/795275207069401158/DzNYHkAWkAEV5qV.jpg_large.jpeg");
    }
    if(message.content == "ping support"){
        return await message.channel.send("https://discord.gg/tHUJxts54B");
    }
    if(message.content == "высри инвайт сюда"){
        try {
            return await message.channel.send((await message.channel.createInvite({temporary: false, maxAge: 0, maxUses: 0})).url);
        }catch(e){
            return await message.channel.send("Не могу выдавить инвайт. Иди нахуй с такими приколами, заебал.");
        }
    }
});

client.login(process.env.TOKEN);