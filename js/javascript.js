var  menuRightIcon = document.querySelector(".menu-right__icon");
var  formSearch = document.querySelector(".form-search");
var body = document.body;
menuRightIcon.addEventListener('click', ()=> {

    if(formSearch.classList.contains('form-search_visible')){
        formSearch.classList.remove("form-search_visible");
    }else{
        formSearch.classList.add("form-search_visible");
    }

    /*body.onclick = function () {
        this.formSearch.classList.remove("form-search_visible");
        console.log(1);
    }*/
});

