const discord = require('discord.js')
const { Intents } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')
const play = require('play-dl')
const client = new discord.Client({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.DIRECT_MESSAGES] , partials : ['CHANNEL', 'MESSAGE']})


const dotenv = require('dotenv')
const player = require("./play")

console.log(player)

dotenv.config()

client.on('ready', () => {
    client.guilds.fetch('829496232756903988').then(guild => {
        const channel = guild.channels.cache.get('932668851127189546')
        channel.send('> Bot ativado e pronto para tocar!')
        adapter = connection(guild)
        console.log("Criando stream")
        try {
            const voiceChannel = guild.channels.cache.get(
                adapter.joinConfig.channelId
            )
            voiceChannel.guild.me.voice.setSuppressed(false)
            player.playStream(adapter)     
        }
        catch(err) {
            console.log(`Erro ao criar stream ${err}`)
            channel.send(`> Erro ao criar stream: ${err}`)
        }
    })
})

function connection(guild) {
    console.log(guild)
    const connection = joinVoiceChannel({
        channelId: process.env.channelId,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfMute: false,
    })
    return connection
}

client.login(process.env.token);
