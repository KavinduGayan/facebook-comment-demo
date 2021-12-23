var access_token = "EAEPd7j2BKwBAL5GPAq8LT7UwIyEtXyZCA8eOnTqZAnUfDcykKcp1rZAMirGB4kNhQJo6jqLBC4lyIS9iEivoF28J0inyOeDMGrqSN1ZBLG0hNZC34coyvQsw2VCOTf4oKG8cw0Onm0khLB0l80Ii6IjWHW7n7OZAKPaDYNp4PrB2YeuyZAC8YJ58lefi0ZBQyOamn5mx3lKmJMDZCzOAxTQ8";

function getPosts() {
    FB.api(
        '/105302412004777',
        'GET',
        { "fields": "posts", "access_token": access_token },
        function (response) {
            console.log("------------------get posts---------------");
            console.log(response);
            console.log("------------------get posts---------------");
            var data = response.posts.data;
            var html = "<table class='table'>";
            html += "<thead><tr><th scope='col'>#</th><th scope='col'>Message</th><th scope='col'>created_time</th><th scope='col'>id</th></tr></thead>";
            for (var i = 0; i < data.length; i++) {
                var rowCount = i+1;
                html += "<tr>";
                html += "<td>" + rowCount + "</td>";
                html += "<td>" + data[i].message + "</td>";
                html += "<td>" + data[i].created_time + "</td>";
                html += "<td>" + data[i].id + "</td>";
                //html += "<td><button onClick='getPost("+data[i].id+")'>get post</button></td>";
                html += "<td><button class='btn btn-primary btn-sm' onClick=getPost('"+data[i].id+"')>get post</button></td>";
                html += "</tr>";

            }
            html += "</table>";
            document.getElementById("posts").innerHTML = html;
        }
    );
}

function getPost(id) {
    FB.api(
        '/'+id,
        'GET',
        { "access_token": access_token },
        function (response) {
            console.log("------------------get post---------------");
            console.log(response);
            console.log("------------------get post---------------");
            var html = "<div class='alert alert-light' role='alert'>";
                html += "<p>" + response.message + " ("+response.created_time+")</p>"
                // html += "<hr>";
                // html += "<p>" + response.id + "</p>"
                html += "<button type='button' class='btn btn-primary btn-sm' onClick=getComments('"+response.id+"')>Show Comments>></button>"
            html += "</div>";
            document.getElementById("post").innerHTML = html;
        }
    );
}


function getComments(id) {
    FB.api(
        '/'+id+'/comments',
        'GET',
        { "access_token": access_token },
        function (response) {
            console.log("------------------get comments---------------");
            console.log(response);
            console.log("------------------get comments---------------");
            console.log(response.data);
            var data = response.data;
            var html = "";
            // var html = "<table border='1|1'>";
            for (var i = 0; i < data.length; i++) {
                html += "<div class='alert alert-secondary' role='alert'>";
                html += "<span class='a'>("+data[i].created_time+"): &nbsp</span>"
                html += ""+data[i].message+"";
                html += "</div>";
                html += "<div id='subComments"+data[i].id+"'>";
                html += "</div>";
                html += "<div>";
                html += "<div id='commentReply'><div class='input-group mb-3'>";
                html +=  "<input type='text' class='form-control' placeholder='comment-reply' id='comment-reply"+data[i].id+"' aria-label='comment-reply' aria-describedby='basic-addon1'>";
                html +=  "<button type='button' class='btn btn-primary btn-sm' onclick=postComment('"+data[i].id+"')>Reply</button>";
                html += "</div>";
                getCommentsOfComments(data[i].id);
            }
            document.getElementById("comments").innerHTML = html;
        }
    );
}

function postComment(id) {
    var elementId = 'comment-reply'+id;
    var comment = document.getElementById(elementId).value;
    FB.api(
        '/'+id+'/comments',
        'POST',
        {
            "access_token": access_token,
            "message": comment
        },
        function (response) {
            console.log("------------------post comment---------------");
            console.log(response);
            console.log("------------------post comment---------------");
            alert(response.id);
        }
    );
    getComments(id);
    // document.getElementById(elementId).value = "";
}

function getCommentsOfComments(commentId) {
    console.log("------------------sub comments---------------");
    console.log("Comment id -> "+commentId);
    FB.api(
        '/'+commentId+'/comments',
        'GET',
        {
            "access_token": access_token
        },
        function (response) {
            console.log(response);
            console.log("------------------sub comments---------------");
            var data = response.data;
            var html = "<ul>";
            for (var i = 0; i < data.length; i++) {
                // html += "<div class='alert alert-secondary' role='alert'>";
                // html += "<span class='a'>("+data[i].created_time+"): &nbsp</span>"
                html += "<li class=''>"+data[i].message+"</li>";
                // html += "</div>";
                // getCommentsOfComments(data[i].id);
            }
            html += "</ul>";
            document.getElementById("subComments"+commentId+"").innerHTML = html;
        }
    );
}