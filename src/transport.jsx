
import React from 'react';


class Transport extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            transport: {},
            showTransport: false
        };

        this.fetchData();
    }

    fetchData = () => {
        fetch(
            'http://transport.opendata.ch/v1/connections?from=' + this.props.from + '&to= ' + this.props.to,
            {
                method: 'get'
            }
        ).then((response)=> {
            response.json().then((json)=> {
                //this.setState({transport: json});
                console.log(json);
                this.calculateTimeToNextBus(json.connections[0].from.departure);
                //this.setState({showTransport: true});

            })
        });
    };

    calculateTimeToNextBus = (datetimeOfNextBus) => {

        var now = new Date().getTime();
        var nextBus = new Date(datetimeOfNextBus).getTime();
        var diffMs = nextBus - now;
        var timeToNextBus = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        //this.setState({transport: json});
    };


    render() {

        const {
            transport, showTransport
        } = this.state;

        return (
            <section className="m-transport">
                {
                    showTransport &&
                        <h2>{transport.connections[0].from.departure}</h2>
                }

            </section>
        )
    }


}

export default Transport;
