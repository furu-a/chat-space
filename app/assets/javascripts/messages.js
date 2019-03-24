$(function(){

  var search_list = $(".comment_wrap");

  function appendcomment(comment) {
   var html = `<article class="comment">
                <p class="comment_creata">
                  ${user}
                  <time class="time">
                  ${created_at}
                  </time>
                </p>
                <p class="comment_text">
                  ${content}
                  <img class="image" src="${image}">
                </p>
              </article>`
              search_list.append(html);
  }

   function appendErrMsgToHTML(msg) {
    var html = `<article>
                  <p class='error'>${ msg }</p>
                </article>`
    search_list.append(html);
  }

  $('#form').on('submit', function(e){

    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(comments) {
      console.log(comments)
      $(".comment-wrap").empty();
      if (comments.length !== 0) {
        comments.forEach(function(comment){
          appendcomment(comment);
        });
      } else {
        appendErrMsgToHTML("コメントが投稿できませんでした");
      }
    })
    .fail(function() {
      alert('error');
    });
  })
})
