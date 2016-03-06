var React = require('react');

var KCP = React.createClass({
	getInitialState: function (){
		return {
			kWidgetInstance:  {
	            'targetId': 'kcp_data',
	            'wid': '_2027991',
	            'uiconf_id': '32098812',
	            'entry_id': '1_zyxut0b4',
	            'flashvars': {
	                'autoPlay': false                
	            },
	            'params': {
	                'wmode': 'transparent'
	            },
	            'readyCallback': function (playerId) {
	                console.log("Callback from kaltura" + playerId);
	            }
        	}
		};
	},
	componentDidMount: function (){
		kWidget.embed(this.state.kWidgetInstance);
	},	
	render: function (){		
		return null;
	}
});

module.exports = KCP;