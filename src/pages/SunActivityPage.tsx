import * as moment from 'moment';
import * as React from 'react';
import * as SunCalc from 'suncalc';
import LocationAndDateForm from '../components/LocationAndDateForm/LocationAndDateForm';
import SunActivity from '../components/SunActivity/SunActivity';
import { fetchCoordinates } from '../services/services';
import './SunActivityPage.css'

interface IState {
    coordinatesError: string | boolean,
    sunActivity: any,
}

class SunActivityPage extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            coordinatesError: false,
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
                this.setState({
                    coordinatesError: false,
                    sunActivity: SunCalc.getTimes(data.formattedDate, data.latitude, data.longitude),
                });
            })
            .catch(({error}) => {
                this.setState({
                    coordinatesError: error
                });
            })
    }

    public render () {
        const { sunActivity, coordinatesError } = this.state;

        return (
            <div className="page-sun-activity">
                <h1 className="page-sun-activity__header">
                    Sunrise and Sunset
                </h1>
                <LocationAndDateForm
                    error={coordinatesError}
                    getSunActivity={this.getSunActivity} />
                <SunActivity
                    sunActivity={sunActivity} />
            </div>
        )
    }
}

export default SunActivityPage;