$(function(){

  var search_list = $("#comment_wrap");

  function appendcomment(comment) {
    var html = `<article class="comment">
            <p class="comment_creata">
              ${comment.user}
              <time class="time">
              ${comment.created_at}
              </time>
            </p>
            <p class="comment_text">
              ${comment.content}
              <img class="image" src="${comment.image}">
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
    console.log(url)
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
      // $(".comment-wrap").empty();
      if (comments.length !== 0) {
          appendcomment(comments);
      } else {
        appendErrMsgToHTML("コメントが投稿できませんでした");
      }
    })
    .fail(function() {
      alert('error');
    });
  })
})
