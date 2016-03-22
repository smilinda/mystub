import React from 'react';
import ReactDOM from 'react-dom';
import KalturaPlayer from './components/KalturaPlayer.jsx';

var kPlayer_data = document.getElementById('kPlayer');

var targetId = kPlayer_data.getAttribute('targetId');
var wid = kPlayer_data.getAttribute('wid');
var uiconf_id =  kPlayer_data.getAttribute('uiconf_id');
var entry_id =  kPlayer_data.getAttribute('entry_id');

ReactDOM.render(<KalturaPlayer targetId={targetId} wid={wid} uiconf_id={uiconf_id} entry_id={entry_id} />, document.getElementById('kUtils'));
