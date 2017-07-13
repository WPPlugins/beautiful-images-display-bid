<?php
/*
* Plugin Name: Beautiful Images Display (BID)
* Plugin URI:  http://www.iwillfolo.com/end-of-the-year-special-website-owners-get-iwillfolos-beautiful-images-display-plugin-for-free
* Description: Make images display more beautiful and efficient
* Version:     1.3
* Author:      Liron C (iWillFolo)
* Author URI:  http://www.iwillfolo.com/
* License:     GPL2
* License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/
 
//  Blocking direct access to plugin PHP files for Security reasons
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

 add_action( 'wp_enqueue_scripts', 'iwf_load_scripts' );
if ( !function_exists('iwf_load_scripts') ) {
	 function iwf_load_scripts() {
	 // Javascript
	 	wp_enqueue_script('bid', plugins_url( 'beautiful-images-display.js', __FILE__ ), 'javascript', '', true);
	 // CSS
	 	wp_enqueue_style('bid', plugins_url( 'beautiful-images-display.css', __FILE__ ) );
	 }
 }