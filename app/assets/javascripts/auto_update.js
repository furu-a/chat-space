$(function(){

var search_list = $("#comment_wrap");

  function makeList(comment) {
    var image = (comment.image !== null) ? `<img class="image" src="${comment.image}">` : `` ;
    var html = `<div class="comment">
                  <p class="comment_creata">
                    ${comment.user}
                    <time class="time">
                    ${comment.created_at}
                    </time>
                  </p>
                  <p class="comment_text">
                    ${comment.content}
                    ${image}
                  </p>
                </div>`
    search_list.append(html);
  }

if(document.URL.match("messages")) {

  setInterval(function() {
    var url = location.pathname
    var created = $("time:last").text()

    $.ajax({
      url: url,
      type: "GET",
      data: { time: created },
      dataType: 'json'
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        makeList(message);
      });
    })
    .fail(function(){
      alert('error');
    })
  },5000);
}
});
