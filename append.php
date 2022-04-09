<?php

// Getting the xdebug code coverage value -
$data = xdebug_get_code_coverage();
$newdata = print_r($data,true);

xdebug_stop_code_coverage();

//var_dump(array_search("alerts.ctrl.php", $data));

/*
The count is initialized to zero, it is useful in storing 
how many lines sequentially have been executed.  
*/
$count = 0;

//this is the function that echoes out to javascript console
function debug_to_console($data) {

    $output = $data;
    if (is_array($output))
        $output = implode(',', $output);

    echo "<script>console.log('" . $output . "' );</script>";

}

//if we need a new line functionality 
function newline_in_console() {
    echo "<script>console.log(JSON.stringify('\'+'A'));</script>";
}

function save_to_cookie ($count)
{
	//echo "console.log('we are saving to cookie;')
	echo "<script>document.cookie = 'count=".$count."'</script>;";

}

//if we get a cookie -- 
function get_cookie($count){

	echo "<script>function getCookie() {
		let name = 'count=';
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		  let c = ca[i];
		  while (c.charAt(0) == ' ') {
			c = c.substring(1);
		  }
		  if (c.indexOf(name) == 0) {
			console.log('LOG:previous count was:'+c.substring(name.length, c.length)); 
			if( c.substring(name.length, c.length) > ".$count."){
				console.log('We are getting FARTHER');
			}else if (c.substring(name.length, c.length) === ".$count."){
				console.log('Remaining the SAME');
			}else {
				console.log('We are getting CLOSER');
			}
			return c.substring(name.length, c.length);
		  }
		}
		return '';
		
	  } getCookie();</script>";

	  //echo "<script>console.log(document.cookie)</script>";

}

//here is the path list 
/*
    The structure of the path list resembles 
*/

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

/*$keywords = array(
    'admin-panel.php'
)*/

//computing intersection - 

debug_to_console (" We are inside file ".$_SERVER['SCRIPT_NAME']);
//if(strcmp($_SERVER['SCRIPT_NAME'],))
debug_to_console ( " Username and Password are spadmin ");

foreach ($data as $key => $value) {
	
	foreach ($path as $key3 => $value3) {

        /*$y = "alerts.ctrl.php";

        if(strcmp($key3,$y)==0){
            debug_to_console ("found " .$y.  " in path");
        }*/

        if(strpos($key,$key3)!=false){

            //debug_to_console ('Found '.$key3.' this is in the path and ');
            //$linenumbers = implode(',',$value3);
            
			//debug_to_console( "the lines executed in the path are " . $linenumbers);


            foreach ($value as $key2 => $value2 ){
                
                foreach ($value3 as $key5){
                    
                    if($key5 == $key2){

                        if($value2 == 1) {
                            //debug_to_console( 'Line number : ' . $key2 . ' was executed !!');
                            //debug_to_console ('the line number ' . $key2.' is in the path');
                            //newline_in_console();
                            $count++;
                            //debug_to_console ('count '. $count);
    
                        }
                    
                    }   
                }

                   
            }
        }
    
    }
    
	
}

debug_to_console("LOG:new count is".$count);
get_cookie($count);
save_to_cookie($count);
?>