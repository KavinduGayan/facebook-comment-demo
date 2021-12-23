function showCommentField() {
    var x = document.getElementById("commentReply");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function onLoad() {
    var x = document.getElementById("commentReply");
    x.style.display = "none";
  }