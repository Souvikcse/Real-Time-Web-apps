let socket = io();
socket.on('connected', () => {
    console.log('Connected: '+ socket.id)
})

$(function(){
    let user = '';
    $('#btn-send').click(function () { 
        let msg = $('#msgbox').val();
        socket.emit('msg', {message: msg, user: user})
    })
    $('#login-btn').click(function () {
        user = $('#login-id').val();
            $('#chat-box').show();
            $('#login-box').hide();
    })

        socket.on('recev_msg', (data) => {
            $('#msglist').append(
                $('<li>' + data.user + ': ' + data.message + '</li>')
            )
    })
})
