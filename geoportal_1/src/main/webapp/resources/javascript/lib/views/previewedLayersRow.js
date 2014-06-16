if (typeof OpenGeoportal === 'undefined') {
	OpenGeoportal = {};
} else if (typeof OpenGeoportal !== "object") {
	throw new Error("OpenGeoportal already exists and is not an object");
}

if (typeof OpenGeoportal.Views === 'undefined') {
	OpenGeoportal.Views = {};
} else if (typeof OpenGeoportal.Views !== "object") {
	throw new Error("OpenGeoportal.Views already exists and is not an object");
}

OpenGeoportal.Views.PreviewedLayersRow = OpenGeoportal.Views.LayerRow.extend({

	events : {
		"click .viewMetadataControl" : "viewMetadata",
		"click .previewControl" : "togglePreview",
		"click .colExpand" : "toggleExpand",
		"click .colTitle" : "toggleExpand",
		"mouseover" : "doMouseoverOn",
		"mouseout" : "doMouseoverOff",
		"click .saveControl" : "toggleSave"
	},

	subClassInit: function(){
		//listen for saved items (in cart collection)
		this.cart = OpenGeoportal.ogp.appState.get("cart");
		this.listenTo(this.model, "change:preview", this.render);
		
		var that = this;
		jQuery(document).on("cartUpdated", this.$el, function(){that.updateView.apply(that, arguments);});
	},
	
	toggleSave: function(e){
		//if not in cart, add it.  if in cart, remove it.
		var match = this.cart.findWhere({LayerId: this.model.get("LayerId")});
		if (typeof match === "undefined"){
			var that = this;
			jQuery(e.currentTarget).effect("transfer", { to: ".shoppingCartIcon", easing: "swing", className: "ui-effects-transfer inCart" }, 400, function(){that.cart.toggleCartState(that.model);});
		} else {
			this.cart.toggleCartState(this.model);
		}
		
	},
	
	skipLayer: function(){
		if (this.model.get("preview") === "off"){
			return true;
		}
		return false;
	}
});