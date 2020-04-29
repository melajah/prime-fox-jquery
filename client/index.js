// kalian meng inport jquery lib

// cara mendapatkan element berdasarkan selectors: id, class atau tag
// cara memanipulasi dom / element (css, hide, show, append)
// cara event handling (.click, .submit, .on)

// result: SPA

// AJAX

$(document).ready(function() {
  let statusLogin = false;

  $(".todos-page").hide();

  $("#login").click(function() {
    console.log("sudah di click");
    if (!statusLogin) {
      statusLogin = true;
      $("#belum-login").text("sudah login");
      $("#login").text("logout");
      $(".login-page").hide();
      $(".todos-page").show();
    } else {
      statusLogin = false;
      $("#belum-login").text("belum login");
      $("#login").text("ayuk login");
      $(".login-page").show();
      $(".todos-page").hide();
    }
  });
  // saya ingin membuat halaman login, ketika dia sudah login saya ingin menampilkan halam todos

  $("#form-todo").submit(function(e) {
    e.preventDefault();
    console.log("submit");
    const inputTodo = $("#input-todo").val();
    // console.log(inputTodo);

    $.ajax({
      url: "http://localhost:3000/todos",
      type: "POST",
      dataType: "json",
      data: {
        title: inputTodo,
        notes: "Hardcode",
      },
    })
      .done(function(response) {
        console.log("success add todo", ">>>>", response);
      })
      .fail(function(response) {
        console.log("error add todo", ">>>>", response);
      })
      .always(function() {
        console.log("complete");
      });

    $("#todos").append(`<li class="todo"> ${inputTodo} </li>`);
    $("#input-todo").val("");
  });

  // request todo dari server menggunkan ajax
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/todos",
  })
    .done(function(response) {
      console.log("request berhasil", ">>> done", response);
      const elTodos = $("#todos");
      let todos = ``;
      response.forEach((todo) => {
        todos += `<li class="todo" data-id="${todo.id}"> ${todo.title} </li>`;
      });

      elTodos.html(todos);
    })
    .fail(function(response) {
      console.log("request failed", ">>>> fail", response);
    })
    .always(function() {
      console.log("request sudah selesai", ">>>> always");
    });

  // menghapus todo
  $(document).on("click", ".todo", function(e) {
    // ada confirm: apakah yakin mau delete atau tidak ?

    $(this).remove();
    const id = $(this).attr("data-id");
    $.ajax({
      url: "http://localhost:3000/todos/" + id,
      type: "DELETE",
    })
      .done(function(response) {
        console.log("success delete todo", ">>>>", response);
      })
      .fail(function(response) {
        console.log("error", ">>>>", response);
      })
      .always(function() {
        console.log("complete request");
      });
  });

  $.ajax({
    url: "http://localhost:3001/articles",
    type: "GET",
  })
    .done(function(response) {
      console.log("success get ke server real >>>", response);
    })
    .fail(function(response) {
      console.log("error get ke server real", " >>>>", response);
    })
    .always(function() {
      console.log("complete");
    });
});
