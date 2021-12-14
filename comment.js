var access_token = "EAAEPd7j2BKwBABCZBLMbCtcCOVMwI0C9SymNRf3nZCm8uYjgNFPRueL93u2bK9yf8gbtWE9H2hJpGLKVoAH6l6ZB6MWdJQ2MUQWHGYbpjq4sW3PIS83ZAkZCG3BV2LMXZAqOlTpU3qRniIevIIVD0hngz3bO8OgiUCvH3P2WuuFwMCF4B9EXfvRHYsyDDOTZCtYoIBgQ8jZBXPQc82SS1q6P";

function getPosts() {
    FB.api(
        '/105302412004777',
        'GET',
        { "fields": "posts", "access_token": access_token },
        function (response) {
            console.log(response);
            var data = response.posts.data;
            var html = "<table border='1|1'>";
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td>" + data[i].message + "</td>";
                html += "<td>" + data[i].created_time + "</td>";
                html += "<td>" + data[i].id + "</td>";
                //html += "<td><button onClick='getPost("+data[i].id+")'>get post</button></td>";
                html += "<td><button onClick=getPost('"+data[i].id+"')>get post</button></td>";
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
            console.log(response);
            var html = "<table border='1|1'>";
            
                html += "<tr>";
                html += "<td>" + response.message + "</td>";
                html += "<td>" + response.created_time + "</td>";
                html += "<td>" + response.id + "</td>";
                html += "<td><button onClick=getComments('"+response.id+"')>get Comments</button></td>";
                html += "</tr>";

            
            html += "</table>";
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
            console.log(response);
            console.log(response.data);
            var data = response.data;
            var html = "<table border='1|1'>";
            for (var i = 0; i < data.length; i++) {
                html += "<tr>";
                html += "<td>" + data[i].message + "</td>";
                html += "<td>" + data[i].created_time + "</td>";
                html += "<td>" + data[i].id + "</td>";
                // html += "<td>" + data[i].from + "</td>";
                html += "</tr>";
            }
            document.getElementById("comments").innerHTML = html;
        }
    );
}