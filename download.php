<?php
header('Content-type: image/png');

header('Content-Disposition: attachment; filename="canvas.png"');

echo base64_decode($_POST['data']);



?>