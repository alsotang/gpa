var data; //getJSONData返回的json数据
    function getData(e) {
        if ( e && e.preventDefault ) //阻止默认事件（post数据）发生
            e.preventDefault(); 
        else 
            window.event.returnValue = false; 

        var time=((new Date().getTime()*9301+49297)%233280)/(233280.0); //生成随机数，防止cache
        var rand=Math.random(); 
        //alert('rand is:'+rand+' time is:'+time);
        time=(time+rand)*9301;


        var stuid = $('#stuid').attr('value');
        var pwd = $('#pwd').attr('value');
        $.post('/getJSONData'+'?time='+time,{stuid:stuid, pwd:pwd, time:time},function(result){
                //alert(result);  //debug
                if(result == "error") {
                $('#dataTable').html("帐号名或密码不正确，请重新输入");
                }
                data = eval('('+result+')'); //把result变成javascript可读的json数据，并赋值给全局变量data
                creatTable(data);
                });

    }

var table_data = '';
function creatTable(data) {
    table_data = ''; //清空，避免两次getData输出重复数据

    table_data += '<table border="1"><tr><th>必修课课程名(共'+data.length+'科)'+'</th><th>学分</th><th>总成绩</th><tr> ';
            $.each(data,function(i){
                table_data += "<tr><td>"+data[i][1]+"</td>"+"<td>"+data[i][3]+"</td>"+"<td>"+data[i][9]+"</td></tr>";
                }
                );
            table_data += '</table>';//结束第一个table
            table_data += '<br />';
            table_data += '<table border="1">'; //开始第二个table
            table_data += '<tr><td>加权平均分</td><td>'+calculate(data)[0]+'<td>平均绩点</td><td>'+calculate(data)[1]+'</td></tr>';
            table_data += '</table>';
            $('#dataTable').html(table_data);

            }

function calculate(data) {
var sum1 = 0; //所有的（学分*绩点）
var sum2 = 0; //总学分
var sum3 = 0; //总成绩
$.each(data,function(i) {
    sum1 += parseInt(data[i][3]) * convertScoreToPoint(parseInt(data[i][9])); //学分 * 绩点
    sum2 += parseInt(data[i][3]);
    sum3 += parseInt(data[i][3]) * (parseInt(data[i][9])); //学分 * 绩点
    });
return [sum3/sum2, sum1/sum2]; /*返回平均分与绩点*/
}

function convertScoreToPoint(score) {
    if( score >= 95 && score <= 100) {
        return 4.0;
    }else if(score < 95 && score >= 90) {
        return 3.8;
    }else if(score <90 && score >=85) {
        return 3.6;
    }else if(score <85 && score >= 80) {
        return 3.2;
    }else if(score <80 && score >= 75) {
        return 2.7;
    }else if(score <75 && score >= 70) {
        return 2.2;
    }else if(score < 70 && score >=65) {
        return 1.7;
    }else if(score < 65 && score >= 60) {
        return 1.0;
    }else if(score <60) {
        return 0;
    }
}

