// Write your Javascript code.

console.log('script loaded');

function continueToChat() {
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    $('#spn-nick').text($('#nick').val());
    $('#spn-nick').css('color', randomColor);
    console.log('hi ' + $('#spn-nick').text());
    $('#entrance').hide();
    $('#chat').show();
}

let transportType= signalR.TransportType.WebSockets;
let http = new signalR.HttpConnection(`http://${document.location.host}/chat`, { transport: transportType});
let connection = new signalR.HubConnection(http);
connection.start();

connection.on('Send', (nick, message, color) => {
    appendLine(nick, message, color);
});

document.getElementById('form-send-message').addEventListener('submit', event => {
    let message = $('#message').val();
    let nick = $('#spn-nick').text();
    let color = $('#spn-nick').css('color');
    $('#message').val('');

    connection.invoke('Send', nick, message, color);
    event.preventDefault();
});

function appendLine(nick, message, color) {
    console.log(color);
    let nameElement = document.createElement('strong');
    nameElement.innerText = `${nick}:`;
    nameElement.setAttribute('style', 'color:' + `${color}`);

    let msgElement = document.createElement('em');
    msgElement.innerText = ` ${message}`;

    let li = document.createElement('li');
    
    li.appendChild(nameElement);
    li.appendChild(msgElement);
    
    $('#messages').append(li);
}



