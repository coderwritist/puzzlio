document.addEventListener("DOMContentLoaded", function(event) {
    var title = document.getElementById("container");
    var doors = document.getElementById("doors")

document.addEventListener("mousemove", function(event) {
    
    title.style.transform = "translateY(-0%)";
    title.style.transition = "all 1s ease-out";
    doors.style.display = "flex";
    doors.style.opacity = 1;
    doors.style.transition = "opacity 3s ease-in";



  document.removeEventListener("mousemove", arguments.callee);
});
});



// a function to execute when the window loads
window.onload = function() {
  const queryString = window.location.search;
console.log(queryString); // Output: "?name=John&age=25"

const urlParams = new URLSearchParams(queryString);
const error= urlParams.get('error');
// console data type of error
console.log(error)
console.log(typeof error); // Output: "John"
if(error === "cannot access door 3 yet" || error === "cannot access door 2 yet")
{
  console.log("Hi", error)
    alert("Cannot access that door yet")
}
    var permissions = [];
    (async()=>
        {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `/getpermissions`);
            xhr.onload = function() {
                if (xhr.status === 200) {
                  // Handle success response
                  console.log("HI")
                  const response = JSON.parse(xhr.responseText);
                  const user = response.user; 
                  permissions = response.user.permissions;
                  var l2 = document.getElementById("locked2");
                  var l3 = document.getElementById("locked3");
                  var dash = document.getElementById("dash");
                  if(user.email === "admin@root.com")
                    dash.style.display = "block";
                  if(permissions[1])
                      l2.style.display = "none";
                  if(permissions[2])
                      l3.style.display = "none";
                  var door1 = document.getElementById("door1");
                  var door2 = document.getElementById("door2");
                  var door3 = document.getElementById("door3");
                  
                  door1.href = user.door1last;
                  door2.href = user.door2last;
                  door3.href = user.door3last;
                  console.log(door1.href)
                  console.log(door2.href)
                  console.log(door3.href)
                } else {
                  // Handle error response
                  console.log('Error!');
                }
              };
            xhr.send();

        })()
    

}