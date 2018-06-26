import * as moment from 'moment';
import * as React from 'react';
import * as SunCalc from 'suncalc';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import { fetchCoordinates } from '../services/services';

interface IState {
    fetchCoordinatesError: string,
    sunActivity: any,
}

class SunActivityPage extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            fetchCoordinatesError: "",
            sunActivity: {},
        };

        this.getSunActivity = this.getSunActivity.bind(this);
    }

    public getSunActivity (postcode: string, date: string): void {
        fetchCoordinates(postcode)
            .then((response) => {
                return {
                    formattedDate: moment(date).toDate(),
                    latitude: response.result.latitude,
                    longitude: response.result.longitude
                }
            })
            .then((data) => {
                console.log("Data: ",data)
                this.setState({
                    fetchCoordinatesError: "undefined",
                    sunActivity: SunCalc.getTimes(data.formattedDate, data.latitude, data.longitude),
                });
            })
            .catch(({error}) => {
                this.setState({
                    fetchCoordinatesError: "error"
                });
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
                    error={fetchCoordinatesError}
                    getSunActivity={this.getSunActivity} />
                <SunActivity
                    fetchCoordinatesError={fetchCoordinatesError}
                    sunActivity={sunActivity} />
            </div>
        )
    }
}

export default SunActivityPage;