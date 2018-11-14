$("li.active").removeClass("active");
$('a[href="' + location.pathname + '"]')
  .closest("li")
  .addClass("active");

//console.log(location.pathname);
