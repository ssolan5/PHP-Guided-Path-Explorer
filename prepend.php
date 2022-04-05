<?php

xdebug_start_code_coverage(XDEBUG_CC_UNUSED);

function debug_to_console($data) {
    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('" . $output . "' );</script>";

}

$path = array(    
    'admin-panel.php' => array( 82, 83, 85, 86, 25),
    'admin.ctrl.php' => array( 151 ),
    'seopanel.ctrl.php' => array( 66 , 67 ),
    'controller.class.php' => array( 120 ),
    'adminpanel.ctrl.php' => array( 153 ),
    'controller.class.php' => array( 120 ),
    'view.class.php' => array( 26, 35 ),
    'adminpanel.ctp.php' => array(17),
    'alerts.php' => array( 24, 54 ),
    'alerts.ctrl.php' => array( 70, 71, 95 ),
    'controller.class.php' => array( 103, 120),
    'view.class.php' => array( 26, 35 ),
    'alert_list.ctp.php' => array( 28 )
);

?>