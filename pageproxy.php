<?php
$url = 'http://idp.bl.uk/image_IDP.a4d?type=loadRotatedMainImage;recnum=221267;rotate=0;imageType=_M';
$image = file_get_contents("$url");
echo $image;
?>

