<?php

$data = xdebug_get_code_coverage();
$newdata = print_r($data,true);

xdebug_stop_code_coverage();
//var_dump(array_search("alerts.ctrl.php", $data));
//computing intersection - 

debug_to_console ( "".$_SERVER["PHP_SELF"]."");

foreach ($data as $key => $value) {
	
	foreach ($path as $key3 => $value3) {

        /*$y = "alerts.ctrl.php";

        if(strcmp($key3,$y)==0){
            debug_to_console ("found " .$y.  " in path");
        }*/

        if(strpos($key,$key3)!=false){

            debug_to_console ('Found '.$key3.' this is in the path and ');
            $linenumbers = implode(',',$value3);
            
			//debug_to_console( "the lines executed in the path are " . $linenumbers);


            foreach ($value as $key2 => $value2 ){
                
                foreach ($value3 as $key5){
                    
                    if($key5 == $key2){

                        if($value2 == 1) {
                            debug_to_console( 'Line number : ' . $key2 . ' was executed !!');
                            debug_to_console ('the line number ' . $key2.' is in the path');
    
                        }
                    
                    }   
                }

                   
            }
        }
    
    }
    
	
}

?>