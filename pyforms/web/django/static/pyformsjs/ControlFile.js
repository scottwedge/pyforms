function add_file2control(control_id, filename){
	$( "#dialog"+control_id ).modal('hide');
	$( "#"+control_id ).val(filename);
	
	var ids 			= pyforms.split_id(control_id);
	var widget_id 		= ids[0];
	var control_name 	= ids[1];

	pyforms.find_app(widget_id).fire_event( control_name, 'changed' )
}


function ControlFile(name, properties){
	ControlBase.call(this, name, properties);
};
ControlFile.prototype = Object.create(ControlBase.prototype);

////////////////////////////////////////////////////////////////////////////////

ControlFile.prototype.init_control = function(){
	var html = "<div class='field ControlFile' id='"+this.place_id()+"' ><label>"+this.properties.label+"</label>";
	html += "<input type='text' class='filename' basewidget='"+this.basewidget.widget_id+"' name='"+this.name+"' id='"+this.control_id()+"' value='"+this.properties.value+"'  placeholder='"+this.properties.label+"' />";
	html += "<div class='ui modal' id='dialog"+this.control_id()+"' ><i class='close icon'></i><div class='header'>"+this.properties.label+"</div><div class='content' id='dialog-content-"+this.control_id()+"'  dom-id='"+this.control_id()+"' ></div></div>";
	
	this.jquery_place().replaceWith(html);

	var self = this;
	function reload_folder(){
		var folder = get_current_folder();
		$( "#dialog-content-"+self.control_id()).load(
			'/plugins/myarea/browse/?p='+folder+'&control-id='+self.control_id(),
			function(){
				$( "#dialog"+self.control_id() ).modal('show');
			}
		);
	}

	this.jquery().unbind('click');
	this.jquery().click(reload_folder);

	if(this.properties.visible) 
		this.jquery_place().show();
	else 
		this.jquery_place().hide();
};
