let socket = io();
socket.on('connected', () => {
    console.log('Connected: '+ socket.id)
})

$(function(){
    $('#btn-send').click(function () { 
        let msg = $('#msgbox').val();
        socket.emit('msg', {message: msg})
    })

        socket.on('recev_msg', (data) => {
            $('#msglist').append(
                $('<li>' + data.message + '</li>')
            )
    })
})
