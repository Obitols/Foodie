function showDiv(classname){
    document.querySelectorAll('.box1,.box2,.box3').forEach(div => {
        div.style.display='none';
    });
    document.querySelector('.'+classname).style.display='block';
}
