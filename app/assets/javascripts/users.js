$(function(){

var nameList = []

  function makeList(word) {
    $("#user-search-result").append(`
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${word.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${word.id}" data-user-name="${word.name}">追加</a>
      </div>`)
  };

  function makeErr(word) {
    $("#user-search-result").append("<li class='list'>" + word + "</li>")
  };

  function addUserList(name) {
    $("#user-list").append(`
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${name.id}'>
        <p class='chat-group-user__name'>${name.name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`)
  };

  function makeUserList (name) {
    $("#user-list").empty();
    nameList.forEach(function(name) {
      addUserList(name);
    });
  }

  $(document).on("click", ".user-search-add", function(e) {
    e.preventDefault();

    $(this).remove()

    var userId = $(this).attr("data-user-id")
    var userName = $(this).attr("data-user-name")
    hash = {name: userName, id: userId}
    nameList.push(hash)
    makeUserList(nameList);
  })

 $(document).on("click", ".js-remove-btn", function(e) {
    e.preventDefault();

    var val = $(this).siblings().attr("value");
    var num = nameList.findIndex(({id}) => id == val);

    nameList.splice(num, 1);

    $(this).parent().remove()
  });

  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();

    var value = $('#user-search-field').val()
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: value },
      dataType: 'json'
    })

    .done(function(names) {
      $("#user-search-result").empty();
      if (names.length !== 0) {
        names.forEach(function(name) {
          makeList(name);
        });
      } else {
        makeErr("該当するユーザーは居ませんでした");
      }

    })

    .fail(function(){
      alert('error');
    })
  })
})
