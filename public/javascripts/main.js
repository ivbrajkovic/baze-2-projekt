$(document).ready(function() {
  const checkConnect = $("#checkConnect");
  const tableContainer = $(".tableContainer");
  // var socket = io("https://localhost:3001", { secure: true });
  const socket = io({
    autoConnect: false
  });

  checkConnect.change(function() {
    if (checkConnect.is(":checked")) {
      socket.open();
    } else {
      socket.close();
    }
  });

  $("#myModal").on("hidden.bs.modal", function(e) {
    socket.close();
    checkConnect.prop("checked", false);
  });

  var commText = $("#inputCommand");
  $("#btnSend").on("click", function() {
    console.log(commText.val());
    tableContainer.html("");
    socket.emit("command", { comm: commText.val() });
  });

  socket.on("hello", function(data) {
    console.log(data);
    socket.emit("hello", {
      client: "Hello from client"
    });
  });

  socket.on("info", function(data) {
    console.log(data);
    tableContainer.html(data);
  });

  socket.on("data", function(data) {
    var table = "<table><tbody>";

    // Table header
    table += "<thead>";
    Object.keys(data[0]).forEach(function(key) {
      //console.log(key);
      table += "<th>" + key + "</th>";
    });
    table += "</thead>";

    data.forEach(items => {
      table += "<tr>";
      console.log("row: " + items);
      for (var key in items) {
        //console.log("cell: " + items[key]);
        table += "<td>" + items[key] + "</td>";
      }
      table += "</tr>";
    });
    table += "</tbody></table>";

    tableContainer.html(table);
  });

  // var showModal = false;
  // $("#btnChange").on("click", () => {
  //   showModal = !showModal;
  // });

  // $("#btnLog").on("click", () => {
  //   console.log(showModal);
  // });

  // $("#btnReload").on("click", () => {
  //   $("#myModal").modal({
  //     refresh: true
  //   });
  // });

  //$(".modal-body").text(showModal);

  //console.log(showModal);

  $("li.active").removeClass("active");
  $('a[href="' + location.pathname + '"]')
    .closest("li")
    .addClass("active");
});
