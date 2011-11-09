<?php
$proxy = "http://google.cn:80";
$url = "http://alsotang.appspot.com/getJSONData?stuid=1043111063&pwd=20211121";

$ch = curl_init();
curl_setopt ($ch, CURLOPT_PROXY, $proxy);
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_TIMEOUT, 120);
$result = curl_exec ($ch);
curl_close($ch);
?>
