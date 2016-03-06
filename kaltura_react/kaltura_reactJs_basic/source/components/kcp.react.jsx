var React = require('react');

var KPlayer = React.createClass({
	getInitialState: function (){
		return {
			kWidgetInstance: {}
		}
	},
	componentWillMount: function (){
		var kcpData = document.getElementById('kcp_data');		

		var newKWidgetInstance = {
            'targetId': kcpData.getAttribute('targetId'),
            'wid': ('_' + kcpData.getAttribute('wid')),
            'uiconf_id': kcpData.getAttribute('uiconf_id'),
            'entry_id': kcpData.getAttribute('entry_id'),
            'flashvars': {
                'autoPlay': false                
            },
            'params': {
                'wmode': 'transparent'
            },
            'readyCallback': function (playerId) {
                console.info("Kaltura Initialized..." + playerId);
            }
        };
		this.setState({kWidgetInstance: newKWidgetInstance});	
	},
	componentDidMount: function (){
		kWidget.embed(this.state.kWidgetInstance);
	},
	render: function (){		
		return null;
	}
});

module.exports = KPlayer;