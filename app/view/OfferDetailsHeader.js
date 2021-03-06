Ext.define('Massave.view.OfferDetailsHeader',{
	extend:'Ext.Component',
	requires:['Ext.Anim'],
	xtype:'offerheadertemplate',
	myDataObject:null,
	isPainted:false,
	userIndex:-1,
	config:{
		itemId:'userDetailsListItem',
		constructor:function(){
		},
		listeners:{
			painted:function(element,eopts){
				this.setDeleteOperation();
			},
			topchanged:function(){
			},
			show:function(){
			}
		}
	},
	setDeleteOperation:function(){

		var buttonPresent = false;

		try{
			var buttonRef = this.element.down('div [class=buttonContainer]').down('div');
			if(buttonRef != null){
				buttonPresent = true;
			}
		}catch(e){}

		if(!buttonPresent){
		var deleteButton = Ext.create('Ext.Button',
												{
													html:'',
													renderTo:this.element.down('div [class=buttonContainer]'),
													ui:'plain',
													width:40,
													height:20,
													style:{'margin-top':'15px','vertical-align':'middle','text-align':'center',color:'white'},
													iconCls:'delete',
													listeners:{
														scope:this,
														tap:function(myRef,e,eopts){
															e.stopEvent();
															this.deleteUser();
														}
													}
												}
												);
		}
	},
	deleteUser:function(){
		this.up('container#offerDetails').deleteUser(this.userIndex);
	},
	collapseExpandDelete:function(onlyCollapse){
		
		this.setDeleteOperation();
		var animElement = this.element.down('div [class=buttonContainer]')
		var curWidth = animElement.getWidth();
		var animTime = 300;
		var targetWidth = 0;

		if(curWidth == 0){
			targetWidth = 40;
		}
		if(targetWidth != 0 && onlyCollapse){
			return;
		}
		if(onlyCollapse == false){
			targetWidth = 40
		}
		var animation = new Ext.Anim({
		     easing: 'easeIn',
		     duration: animTime,
		     autoClear: false,
		      to: {
		          width: targetWidth + 'px'
		       }
		});
		animation.run(animElement);
	},
	setUserIndex:function(pIndex){
		this.userIndex = pIndex;
	},
	setValue:function(text){
		var dataObject = Ext.JSON.decode(text);
		this.myDataObject = dataObject;
		
		var tpl = [
			"<div style='float:left;width:80px;margin-left:1%;text-align:center'>",
				"<div style='margin-left:5px;margin-bottom:5px;margin-top:5px;border-radius:50%;height: 40px !important; width: 40px !important; background-image: url(",dataObject.userProfilePic,");background-position:center;background-size:50px'>",
				"</div>",
			"</div>",
			"<div style='height:55px'>",
				"<div style='float:left;display:table;height:100%'>",
					"<div style='display:table-cell;vertical-align:middle'>",
						"<div style='margin-bottom:5px'>",dataObject.userName,"</div>",
						"<div style='margin-bottom:5px'>",dataObject.itemsCount,"</div>",
					"</div>",
				"</div>",
				"<div class='buttonContainer' style='width:0px;float:right;display:block;height:100%;background-color:tomato'>",
				"</div>",
				"<div style='display:table;float:right;height:100%;width:40px'>",
						"<div style='display:table-cell;vertical-align:middle;text-align:center'>",
							"<div style='margin-bottom:5px'>",dataObject.itemsValue,"</div>",
						"</div>",
				"</div>",
			"</div>"
		].join("");
		this.setHtml(tpl);
	}
});