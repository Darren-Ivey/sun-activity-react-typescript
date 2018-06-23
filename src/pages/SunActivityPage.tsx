import * as React from 'react';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';

interface IState {
    date: string,
    fetchCoordinatesError: string,
    postcode: string,
    sunActivity: string,
}

class SunActivityPage extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            date: "",
            fetchCoordinatesError: "",
            postcode: "",
            sunActivity: "",
        };
    }

    public getSunActivityPostCode () {
        return this.state.postcode + this.state.date;
    }

    public render () {
        const { sunActivity, fetchCoordinatesError } = this.state;

        return (
            <div>
                <h1>
                    Sunrise and Sunset
                </h1>
                <LocationAndDateForm
                    fetchCoordinatesError={fetchCoordinatesError}
                    getSunActivityPostCode={this.getSunActivityPostCode()} />
                <SunActivity
                    fetchCoordinatesError={fetchCoordinatesError}
                    sunActivity={sunActivity} />
            </div>
        )
    }
}

export default SunActivityPage;