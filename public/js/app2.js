        var title = document.getElementById("title");
        var link = document.getElementById("link");
        var ilink = document.getElementById("ilink");

        //Submit Data Using AJAX and Get BACK the ID !!
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if(this.responseText=="error") window.location = 'http://localhost:3000/index.html';
                
                title.textContent = JSON.parse(this.response).title;
                link.setAttribute("href", JSON.parse(this.response).nlink);
                ilink.setAttribute("src", JSON.parse(this.response).ilink);
            }
        };

        xmlhttp.open("GET", "http://localhost:3000/get" + window.location.pathname, true);
        xmlhttp.send();