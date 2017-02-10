var socket = io();

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('message', function(message) {
    console.log('New message:');
    console.log(message.timestamp, message.text);
    var tsMoment = moment.utc(message.timestamp).local().format('h:mm a');

    jQuery('.messages').append('<p><strong>' + tsMoment + '</strong> : ' + message.text + '</p>');

});

// Handles submitting a new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        text: $message.val()
    });
    $message.val('');
}); 