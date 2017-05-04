var modal = document.getElementById("modal"),
    close = document.getElementsByClassName("close")[0];


close.addEventListener("click", function () {
    modal.style.display = "none";
})
window.addEventListener("click",function(event) {
    if (event.target == modal) { modal.style.display = "none";}
    }
);
window.addEventListener("keydown", function (e) {
    if (e.keyCode == 27  && modal.style.display == "block") {
        modal.style.display = "none";
    }
});
