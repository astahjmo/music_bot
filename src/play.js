const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')

async function getStream(){
        let stream = await play.stream(process.env['link'])
        return stream
}



async function playStream(connection){
    await getStream().then(async stream => {
        let resource = createAudioResource(stream.stream, {
            inputType: stream.type
        })
        let player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        })
        player.play(resource)
        connection.subscribe(player)
        player.on('status', (status) => {
            console.log(status)
        })

        stream.stream.on('status' , (status) => {
            console.log(status)
        })

        stream.stream.on('error' , (err) => {
            console.log(err)
        })

        player.on('error' , (err) => {
            console.log(err)
        })
    })
}
module.exports = {
    playStream
}
