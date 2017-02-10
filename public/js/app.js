var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('message', function(message) {
    var tsMoment = moment.utc(message.timestamp).local().format('h:mm a');
    var $message = jQuery('.messages');
    console.log('New message:');
    console.log(message.timestamp, message.text);
    $message.append('<p><strong>' + message.name + '  ' + tsMoment + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');

});

// Handles submitting a new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    event.preventDefault();
    var $message = $form.find('input[name=message]');
    socket.emit('message', {
        name: name,
        text: $message.val()
    });
    $message.val('');
}); 