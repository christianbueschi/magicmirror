import React from 'react';
import Annyang from 'annyang';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Transport from './transport';


class MagicMirror extends React.Component {

	constructor() {
        super();

        this.state = {
            transport: {},
            showTransport: false,
            showHello: false
        }

	}

	componentDidMount() {

	    fetch(
	        'http://transport.opendata.ch/v1/connections?from=Engeried&to=Bern',
            {
                method: 'get'
            }
        ).then((response)=> {
	            response.json().then((json)=> {
	                this.setState({transport: json});
                    console.log(json);
                    this.setState({showTransport: true});

                })
        });

        this.setState({showHello: true});

        var commands = {
            'When is the next bus': ()=> {

                this.setState({showTransport: true});
                var now = new Date().getTime();
                var then = new Date(this.state.transport.connections[0].from.departure).getTime();
                var diffMs = then - now;
                var timeToNextBus = Math.round(((diffMs % 86400000) % 3600000) / 60000);
                responsiveVoice.speak("The next bus is leaving in " + timeToNextBus + "minutes", "UK English Female");
            },

            'Hello': ()=> {
                this.setState({showHello: true});
                responsiveVoice.speak("Hello handsome! What can I do for you?", "UK English Female");
            }
        };

        // Add our commands to annyang
        Annyang.addCommands(commands);

        Annyang.addCallback('error', (err)=> {
            console.log(err);
        });

        // Start listening.
        Annyang.start();

    }

	render() {

	    const {
	        transport, showTransport, showHello
        } = this.state;

		return (
		    <section>
                    <ReactCSSTransitionGroup
                        transitionName="hello"
                        transitionAppear={true}
                        transitionAppearTimeout={3000}
                        transitionEnterTimeout={0}
                        transitionLeaveTimeout={0}>

                        <h1 className="h1">Hello</h1>
                    </ReactCSSTransitionGroup>

                <Transport from="Engeried" to="Bern" connections={2}/>
            </section>

        )
	}
}

export default MagicMirror;

