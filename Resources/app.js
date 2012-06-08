/*
 * App Purpose: To show the use of ACS's Places
 * Author: Varun Joshi
 * Source: Matt Schmulen
 * Platform: Appcelerator Titanium
 * 
 * 
 * Maintenance
 * =============
 * 
 * Ver 1.0: Initial version - Thursday, June 7 2012
 *  
 */



// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


var winadd = Titanium.UI.createWindow({ title:'add',  backgroundColor:'#fff', url:'add.js' }); 
var tabadd = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'add', window:winadd });  
tabGroup.addTab(tabadd);


var wintable = Titanium.UI.createWindow({ title:'table',  backgroundColor:'#fff', url:'table.js' }); 
var tabtable = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'table', window:wintable });  
tabGroup.addTab(tabtable);

var winmap = Titanium.UI.createWindow({ title:'map',  backgroundColor:'#fff', url:'map.js' }); 
var tabmap = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'map', window:winmap });  
tabGroup.addTab(tabmap);

// open tab group
tabGroup.open();
