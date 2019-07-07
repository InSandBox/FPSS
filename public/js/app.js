var submitBtn = document.getElementById("submit");
var form = document.querySelector("form");
var title = document.getElementById("title");
var link = document.getElementById("link");
var ltype = document.getElementById("ltype");
var oid = document.getElementById("oid");
var ilink = document.getElementById("ilink");

submitBtn.onclick = (ev)=>{
    ev.preventDefault();

    if(title.value=="" || link.value=="" || ltype.value==""){
        return window.alert("No Filled Must Be Empty Except The Optional Id");
    }

    //Submit Data Using AJAX and Get BACK the ID !!
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xmlhttp = new XMLHttpRequest();
     } else {
        // code for old IE browsers
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            var p = document.createElement("p");
            p.textContent = this.responseText;
        
            window.alert("New Link Generated !! Copy And Share It !");
        
            form.parentElement.replaceChild(p, form);
       }
    };

    xmlhttp.open("GET", "http://localhost:3000/create/" + ""+encodeURI(encodeURIComponent(title.value))
                                                        + "&"+encodeURI(encodeURIComponent(link.value))
                                                        + "&"+encodeURI(encodeURIComponent(ltype.value))
                                                        + "&"+encodeURI(encodeURIComponent(""+oid.value))
                                                        + "&"+encodeURI(encodeURIComponent(ilink.value))
    
    , true);
    xmlhttp.send();
}