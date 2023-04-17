

// fucntion to execute when window loads
window.onload = function() {
    var container= document.getElementById("container");
    var container1= document.getElementById("container1");
    var prev= document.getElementById("prev");
    var body = document.getElementById("body");
    prev.style.opacity = 0;
    container.style.opacity = 0;
    container1.style.opacity = 1;
    body.style.backgroundColor = "#f7f7f7";
    body.style.transition = "background-color 2s ease-in-out";
    container.style.transition = "all 2s ease-in-out";
    prev.style.transition = "all 2s ease-in-out";
    container1.style.transition = "all 2s ease-in-out";

}