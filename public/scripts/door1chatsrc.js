const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
var hist = [];
var timest, timeend;
function sendChat() {
  const text = chatInput.value;
    hist.push(text);
  if (text.length === 0) {
    return;
  }
  addChatMessage(text, true);
  chatInput.disabled = "disabled";
  chatInput.value = '';
  chatInput.placeholder = "wait a minute, the AI riddler is thinking..."
  if(text.toLowerCase().includes("joke"))
  {
    timeend = new Date();
    var timediff = timeend - timest;
    (async()=>
        {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if (xhr.status === 200) {
                  // Handle success response
                  console.log(xhr.responseText);
                } else {
                  // Handle error response
                  console.log('Error!');
                }
              };
              xhr.open('POST', `/timesave`);
              xhr.setRequestHeader("Content-Type", "application/json");
              var tdata = {time: timediff, puzzleno: "puzzle1"};
              var timedata = JSON.stringify(tdata);
            xhr.send(timedata);

        })()
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const message = response.message;
        console.log(message);
        if(message == "Rate limit error")
        {
            var modal = document.getElementById("rateModal");
            modal.style.display = "block";
        }
        if(message == "API key expired")
        {
            var modal = document.getElementById("expModal");
            modal.style.display = "block";
        }
        addChatMessage(message);
        hist.push(message)
        chatInput.disabled = "";
        chatInput.placeholder = "Type your message here"
        chatInput.focus();
      } else {
        console.error('Error:', xhr.statusText);
      }
    }
  };
  xhr.open('POST', `/door1`);
  xhr.setRequestHeader("Content-Type", "application/json");
  var data = {hist: hist};
  var jsonData = JSON.stringify(data);
  xhr.send(jsonData);
}

chatInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    console.log("I am here")
    event.preventDefault();
    sendChat();
  }
});
var sendb = document.getElementById("chat-submit");

sendb.addEventListener('click', event => {
    {
        console.log("I am here")
        event.preventDefault();
        sendChat();
      }
      {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
      }
});

function addChatMessage(message, isUserInput = false) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('terminal-output-line');
  if (isUserInput) {
    newMessage.classList.add('terminal-output-user');
  }
  newMessage.innerText = message;
  chatOutput.appendChild(newMessage);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

chatInput.focus();

var hint = document.getElementById("q");
hint.addEventListener("click", function(){
    var modal = document.getElementById("hint");
    modal.style.display = "block";
    var sa = document.getElementById("sa");
    var sap = document.getElementById("sap");
    sa.addEventListener("click", function(){
        sap.style.display = "block";
    });
    var cl = document.getElementById("close")
    cl.addEventListener("click", function(){
        sap.style.display = "none";
        modal.style.display = "none";
    });
});
// function that executes when the window loads
window.onload = function() {

  timest = new Date();

}