function getData() {
    var stuid = $('#stuid').attr('value');
    var pwd = $('#pwd').attr('value');
    $('#test_jsondata').html("hello");
    $.post('getJSONData',{stuid:stuid, pwd:pwd},function(result){$('#test_jsondata').text(result);});
}
