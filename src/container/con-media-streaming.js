import React from 'react';
import ReactHLS from 'react-hls';
import ReactPlayer from "react-player";
import ReactFlowPlayer from 'react-flow-player';

export default class MediaStreaming extends React.Component {
    constructor(props) {
        super(props);

        //this.video = window.document.querySelector("#videoElement");

    }


     playRTMP=(src) =>{
        const $ =window.$;
        //$('#player-tip').hide();

        /*if (isMobile()) {
            $('#player-tip').html("RTMP protocol is not supported on your device.");
            return;
        }*/

        var flashvars = {
            autoPlay : 'true',
            src : escape(src),
            streamType : 'live',
            scaleMode : 'letterbox',
        };
        var params = {
            allowFullScreen : 'true',
            allowScriptAccess : 'always',
            wmode : 'opaque'
        };
        var attributes = {
            id : 'player'
        };

        window.swfobject.embedSWF('../asset/plugin/hls.swf', 'player', '640', '480', '10.2', null, flashvars, params,
            attributes);
    }


    render() {

        this.playRTMP("rtmp://156.38.129.58/app/live");
        return (
            <div className="container">


                <div className="container">

                    <iframe width="560" height="315" src="rtmp://156.38.129.58/app/live" frameBorder="0"
                            allowFullScreen></iframe>

                    {/*<ReactFlowPlayer
                        playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
                        playerId="reactFlowPlayer"
                        sources={[
                            {
                                type: "rtmp/mp4",
                                src: "rtmp://156.38.129.58/app/live"
                            }
                        ]}
                    />*/}
                </div>

                <div className="flowplayer" data-rtmp="rtmp://156.38.129.58/app/live">

                    {/* <video controls
                           autoPlay={true}
                           src="rtmp://156.38.129.58/app/live"
                           width="300"
                           height="200">
                        Sorry, your browser doesn't support embedded videos.
                    </video>*/}

                </div>


            </div>
        )
    }
}

