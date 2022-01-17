const { Intents } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')
const discord = require('discord.js')

const client = new discord.Client({ intents : 
    [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES],
    partials : ['CHANNEL', 'MESSAGE']})

//Local imports
const player = require("./play")

require('dotenv').config()
require('./server')

client.on('ready', () => {
  client.guilds.fetch('829496232756903988').then(async (guild) => {
      const channel = guild.channels.cache.get('932668851127189546')
      channel.send('> Bot ativado e pronto para tocar!')
      adapter = await connection(guild)
      console.log("Criando stream")
      try {        
        const voiceChannel = await guild.channels.cache.get(
        adapter.joinConfig.channelId
        )
        voiceChannel.guild.me.voice.setSuppressed(false)
        await player.playStream(adapter) 
      }
      catch(err) {
        console.log(`Erro ao criar stream ${err}`)
        channel.send(`> Erro ao criar stream: ${err}`)
      }
  })
})

async function connection(guild) {
  const connection = joinVoiceChannel({
      channelId: process.env['channelId'],
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: false,
  })
  return await connection
}

client.login(process.env['token'])
