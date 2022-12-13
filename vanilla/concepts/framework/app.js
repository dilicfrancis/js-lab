var w = W$("Jane", "Langley");
w.salute().setLang("es").salute(true).log();
$("#signin").click(function () {
  var welcomeMsg = W$("Pooky", "Hounds");
  $("#login").hide();
  welcomeMsg
    .setLang($("#language").val())
    .htmlSalute("#salutation", true)
    .log();
});
