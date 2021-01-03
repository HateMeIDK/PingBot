require("dotenv").config();

import { Client, GuildMember, Message, TextChannel } from "discord.js";

let client: Client = new Client();

client.on("ready", async function(){
    console.log("[+] Бот вышел в онлайн как "+client.user.tag+".");
    await client.user.setActivity("ping help", {
        type: "PLAYING"
    });
});

client.on("guildMemberAdd", async function(member: GuildMember){
    if(member.guild.id != "795267119226552330")return;
    await (<TextChannel>client.guilds.cache.get("795267119226552330").channels.cache.get("795296503966335017")).send(member.user.tag + " оформил вкид в эту гильдию! Пошумим, блядь!");
    await member.roles.add(member.guild.roles.cache.get("795295704931106867"));
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
        return await message.channel.send("Приглашение этого чуда, распространи!\n<========>\n-> https://discord.com/api/oauth2/authorize?client_id=795260082677350424&permissions=8&scope=bot <-\n<========>\nhttps://cdn.discordapp.com/attachments/795267119226552333/795292524297584680/DzNYHkAWkAEV5qV.jpg_large.jpeg");
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
    if((message.content == "ооо да вошел в тебя" || message.content == "ооо да вошёл в тебя")&& message.guild.id == "795267119226552330" && (message.author.id == "786495216227581963" || message.author.id == "493053965865320469")){
        await message.channel.send("оооо да сукаааа");
        return client.emit("guildMemberAdd", message.member);
    }
    let reacted_self = false, reacted_other = false;
    for(let m of message.mentions.members.array()){
        if(m.id == message.member.id && !reacted_self){
            reacted_self = true;
            try{await message.react(client.guilds.cache.get("795267119226552330").emojis.cache.get("795290490375110666"));}catch(e){}
        }else if(!reacted_other){
            reacted_other = true;
            try{await message.react("🏓");}catch(e){}
        }
    }
});

client.login(process.env.TOKEN);