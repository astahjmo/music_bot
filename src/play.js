const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
const play = require('play-dl')

function getStream(){
    return new Promise((resolve, reject) => {
        let stream = play.stream(process.env.link)
        resolve(stream)
    })}



function playStream(connection){
    getStream().then(stream => {
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
    })
}

module.exports = {
    playStream
}
