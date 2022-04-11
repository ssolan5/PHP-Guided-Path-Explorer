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
    echo "<script>document.cookie = 'count=".$count."';</script>";

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
            //console.log('LOG:previous count was:'+c.substring(name.length, c.length)); 
            if( c.substring(name.length, c.length) > ".$count."){
                console.log('COLDER');
            }else if (c.substring(name.length, c.length) === ".$count."){
                console.log('SAME');
            }else {
                console.log('WARMER');
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

debug_to_console('Hints: fromTime, alert_list, alert_category');

debug_to_console ("LOG:We are inside file ".$_SERVER['SCRIPT_NAME']);

//if(strcmp($_SERVER['SCRIPT_NAME'],))
//debug_to_console ( " Username and Password are spadmin ");
$in_file = False;
$success = False;


$phpfile = explode('/',$_SERVER['SCRIPT_NAME']);
$filename = $phpfile[2].'_codecoverage.txt';

//debug_to_console("LOG:preparing file : ".$filename);
$content = $newdata;


$file_written = file_put_contents($filename, $content);
//debug_to_console("LOG:The file was state ".$file_written );

foreach ($data as $key => $value) {
    
    // $data is our code coverage
    // $key is the path of the file 
    // $value is a list of lines that were executed

    foreach ($path as $files_in_path => $lines_in_file) { //key3 points to the file name
        
        //path is the one we provide from source to sink
        //it is sequential. 
       
       
       
        //we use the double loop to compare and print out a debug log only when a 
        // a file in the path that we provide is a key to the code coverage



        if(strpos($key,$files_in_path)!=false){

            // if we are inside this if case then it implies
            // that the key value in the code coverage is matching the 
            // path list we have provided 

            $linenumbers = implode(',',$lines_in_file);
            $y = "alerts.ctrl.php";
            


            //debug_to_console ('Found '.$key3.' this is in the path and ');
            
            
            //debug_to_console( "the lines executed in the path are " . $linenumbers);



            // $value is the line numbers that are being executed 
            // inside the file of the pathlist we have provided 

            foreach ($value as $key2 => $value2 ){
                
                
                if($in_file){

                    //debug_to_console(' LOG:Line number : ' . $key2 . ' was executed !!');
                    //debug_to_console(' LOG:And it had the value' . $value2);
                }
                   

                foreach ($lines_in_file as $key5){

                    if($key5 == $key2){

                        if($value2 == 1) {

                            if($in_file && $key2 == 28){

                                $success = True;
                                debug.log( " WE FOUND IT ");
                            }
                            
                            //debug_to_console ('LOG:the line number ' . $key2.' is in the path');
                            //newline_in_console();
                            $count++;
                            //debug_to_console ('LOG:count '. $count);
    
                        } 
                    }   
                }

                   
            }
        }
    
    }
    
    
}

/*if(array_key_exists('total', $_SERVER)) {

    debug_to_console('if');
    $_SERVER['total'] += $count;
}
else {
    $_SERVER['total'] = $count;
    debug_to_console('else');
}*/

if($in_file) {
    debug_to_console("HOT!");
    debug_to_console($linenumbers);   
    if($success) {
        debug_to_console( 'SUCCESS');
        //$fd = fopen("");
    }
}


//debug_to_console("total:".$_SERVER['total']);
get_cookie($count);
save_to_cookie($count);


?>
