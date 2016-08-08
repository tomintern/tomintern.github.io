<?php
require_once dirname(__FILE__) . 'Wrapper.php';
 
class WrapperTest extends PHPUnit_Framework_TestCase {
 
    function testCanCreateAWrapper() {
        $wrapper = new Wrapper();
    }
 
}
?>