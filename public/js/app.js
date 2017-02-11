var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

jQuery('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to the server');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function(message) {
    var tsMoment = moment.utc(message.timestamp).local().format('h:mm a');
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');
    var centering = ( message.name == name ? 'right' : 'left');

    console.log('New message:');
    console.log(message.timestamp, message.text);
    
    $message.append('<p class="text-' + centering + '"><strong>' + message.name + '  ' + tsMoment + '</strong></p>');
    $message.append('<p class="text-' + centering + '">' + message.text + '</p>');
    $messages.append($message);

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