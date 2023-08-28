var modal = document.getElementById("popupFrame");
var imgs = document.getElementsByClassName("popup-target");
var contentImg = document.getElementById("popup-content-img");

for (let i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function () {
        modal.style.display = "block";
        contentImg.src = this.src;
    }
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
} 

contentImg.onclick = function(){
    modal.style.display = "none";
}