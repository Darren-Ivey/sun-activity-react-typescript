import * as moment from 'moment';
import * as React from 'react';
import * as SunCalc from 'suncalc';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import { fetchCoordinates } from '../services/services';

interface IState {
    date: Date,
    fetchCoordinatesError: string,
    postcode: string,
    sunActivity: any,
}

class SunActivityPage extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date(),
            fetchCoordinatesError: "",
            postcode: "postcode",
            sunActivity: {},
        };
    }

    public getSunActivityPostCode (): void {
        fetchCoordinates(this.state.postcode)
            .then((response) => {
                return {
                    formattedDate: moment(this.state.date).toDate(),
                    latitude: response.result.latitude,
                    longitude: response.result.longitude
                }
            })
            .then((data) => {
                this.setState({
                    fetchCoordinatesError: "undefined",
                    sunActivity: SunCalc.getTimes(data.formattedDate, data.latitude, data.longitude),
                });
            })
            .catch(({error}) => {
                this.setState({fetchCoordinatesError: error});
            })
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
                    getSunActivityPostCode={this.getSunActivityPostCode} />
                <SunActivity
                    fetchCoordinatesError={fetchCoordinatesError}
                    sunActivity={sunActivity} />
            </div>
        )
    }
}

export default SunActivityPage;