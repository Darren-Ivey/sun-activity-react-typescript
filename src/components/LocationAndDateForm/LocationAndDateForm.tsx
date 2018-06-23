import * as React from 'react';

interface IProps {
    fetchCoordinatesError: string,
    getSunActivityPostCode: string,
}

class LocationAndDateForm extends React.Component<IProps, {}> {

    constructor (props: IProps) {
        super(props)
    }

    public render () {
        return (
            <div>
                {this.props.fetchCoordinatesError}
                {this.props.getSunActivityPostCode}
            </div>
        )
    }
}

export default LocationAndDateForm;