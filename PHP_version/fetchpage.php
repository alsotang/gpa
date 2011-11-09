<?php
if($_SERVER['HTTP_APPNAME']) {
    $cookie_jar_index = SAE_TMP_PATH.'/cookie.txt';
    echo "have";
} else {
    $cookie_jar_index = 'cookie.txt';
}

 
$url = "http://202.115.47.133:7777/pls/wwwbks/bks_login2.login";
$params = "stuid=1043111063&pwd=20211121";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_jar_index);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params); 
//curl_setopt($ch, CURLOPT_NOBODY, 1);//这个不能打开，否则无法生成cookie文件
curl_exec($ch);
curl_close($ch);
 
$url = "http://202.115.47.133:7777/pls/wwwbks/bkscjcx.yxkc";
$ch2 = curl_init();
curl_setopt($ch2, CURLOPT_URL, $url);
curl_setopt($ch2, CURLOPT_COOKIEFILE, $cookie_jar_index);
curl_exec($ch2);
$rc = 'hello'; 
print_r($rs);
curl_close($ch2);
 
?>
