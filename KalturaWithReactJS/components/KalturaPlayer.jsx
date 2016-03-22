import React from 'react';

var kdp = null;

class KalturaPlayer extends React.Component{

	constructor(props){
		super(props);
		this.state = {			
			previousTime: 0,
			cuepointList: [],
			isKdpUpdated: false,
			isPlayed: false
		};

		this.initKalturaConfig = this.initKalturaConfig.bind(this);		
		this.bindKalturaModel(this.props.targetId, this.props.wid, this.props.uiconf_id, this.props.entry_id, this.initKalturaConfig);

	}

	/*initKalturaConfig()
	 ** Kaltura readyCallback function.
	 ** Which has implemented to get this.state.kdp object with all assigned data by kWidget.
	 */
	initKalturaConfig(playerId) {		
	    kdp = document.getElementById(playerId);	    	    
	    this.addListenersToPlayer();
	    this.setKdpUpdated(true);	    
	    kdp != undefined ? console.log("Kaltura Initialized.") : console.log("Kaltura Not Initialized.");	    	    
	}

	assignMockCuepoint(){

	}	

	/*addListenersToPlayer()
	 ** Implemented to add and bind Listeners and notifications.
	 */
	addListenersToPlayer() {
	    if (kdp != undefined) {
	        kdp.addJsListener('playbackComplete', '$r.isPlayerPlayed');
	        kdp.addJsListener('playerPlayed', '$r.isPlaying');	        
	        kdp.kBind('mediaViewableChange', this.monitorEvent);
	        //this.state.kdp.kBind('replay', '$r.replayEvent');
	        //this.state.kdp.kBind('seeked', '$r.seekedEvent');

	        return;
	    }
	    console.error("Kaltura Listeners Not Initialized Correctly.");
	}

	bindKalturaModel(targetId, wid, uiconf_id, entry_id, callbackFunc){		
		var KPModel = {
			'targetId': targetId,
            'wid': ('_' + wid),
            'uiconf_id': uiconf_id,
            'entry_id': entry_id,
            'flashvars': {
                'autoPlay': false       
            },
            'params': {
                'wmode': 'transparent'
            },
            'readyCallback': function (playerId) {
            	callbackFunc(playerId);
            }
		};

		kWidget.embed(KPModel);
	}

	isPlayerPlayed() {
	    if (this.state.kdp != undefined) {
	        this.state.isPlayed = true;
	        console.log("isPlayerPlayed.")
	    }
	}

	isPlaying() {	
		console.log("isPlayerPlaying..." + this.state.isPlayed);
	    if (this.state.kdp != undefined) {
	        this.state.isPlayed = false;	        
	    }
	}

	/*getCurrentTimestamp()
	 ** Issuing timestamp for the user initial time.
	 ** Initial time mean Comment post time not comment creating time.
	 */
	getCurrentTimestamp() {
	    var timestamp = 0;
	    if (this.state.kdp != undefined && this.getKdpUpdated()) {
	        timestamp = this.state.kdp.evaluate('{video.player.currentTime}');
	        if (this.state.isPlayed && timestamp == 0) {
	            timestamp = this.state.kdp.evaluate('{duration}');
	        }
	    }

	    timestamp = timestamp.toFixed(0); // Get Closely integer value as seconds

	    return timestamp;
	}

	getKdpUpdated() {
	    return this.state.isKdpUpdated;
	}

	/*
	 ** Set this.state.kdp update state.
	 */
	setKdpUpdated(isKdpUpdated) {
	    this.setState({isKdpUpdated: isKdpUpdated});
	}

	/*
	** When comes to seek state, All comments status will change true and enable for the list iteration process.
	 */
	seekedEvent() {
	    var currentTime = this.getCurrentTimestamp();
	    for (var pnt in this.state.cuepointList) {
	        var cuepoint = this.state.cuepointList[pnt];
	        if (cuepoint.startTime >= currentTime) {
	            cuepoint.status = true;
	        }
	    }

	}

	/*
	 ** When replay the video, All comments status will change true and enable for the list iteration process.
	 */
	replayEvent() {
	    for (var pnt in this.state.cuepointList) {
	        var cuepoint = this.state.cuepointList[pnt];
	        cuepoint.status = true;
	    }
	}

	/**
	 ** Fired monitor event when video time line changing.
	**/
	monitorEvent() {
		console.log("zzz");
	    // if (this.state.kdp != undefined) {
	    //     var currentTime = this.getCurrentTimestamp();

	    //     if (currentTime == 0 || this.state.previousTime == currentTime) {
	    //         return;
	    //     }

	    //     for (var pnt in this.state.cuepointList) {
	    //         var cuepnt = this.state.cuepointList[pnt];
	    //         var startTime = cuepnt.startTime;

	    //         if (startTime == currentTime && cuepnt.status) {
	    //             cuepnt.status = false;
	    //             $.event.trigger({
	    //                 type: "cuepoint-pass",
	    //                 message: cuepnt.id
	    //             });
	    //         }
	    //     }

	    //     this.state.previousTime= currentTime;
	    // }
	}

	

	render(){
		return (	
				<KalturaUtils/>		
			);
	}

}

class KalturaUtils extends React.Component{
	constructor(){
		super();		
	}
	

	render(){
		return(null);
	}
}

export default KalturaPlayer;