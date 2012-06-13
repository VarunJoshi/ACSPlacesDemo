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
 * Ver 1.1: Wednesday, June 13 2012 
 */

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


var winaddPlace = Titanium.UI.createWindow({ title:'Add Place',  backgroundColor:'#fff', url:'addplace.js' }); 
var tabaddPlace = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'Add Place', window:winaddPlace });  
tabGroup.addTab(tabaddPlace);


var winaddUser = Titanium.UI.createWindow({ title:'Add User',  backgroundColor:'#fff', url:'adduser.js' }); 
var tabUser = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'Add User', window:winaddUser });  
tabGroup.addTab(tabUser);

var wintable = Titanium.UI.createWindow({ title:'Table',  backgroundColor:'#fff', url:'table.js' }); 
var tabtable = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'Table', window:wintable });  
tabGroup.addTab(tabtable);

var winmap = Titanium.UI.createWindow({ title:'Map',  backgroundColor:'#fff', url:'map.js' }); 
var tabmap = Titanium.UI.createTab({ icon:'KS_nav_views.png', title:'Map', window:winmap });  
tabGroup.addTab(tabmap);

// open tab group
tabGroup.open();
