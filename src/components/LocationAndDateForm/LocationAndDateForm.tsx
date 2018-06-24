import * as React from 'react';

interface IProps {
    fetchCoordinatesError: string,
    getSunActivityPostCode:  () => void,
}

class LocationAndDateForm extends React.Component<IProps, {}> {

    constructor (props: IProps) {
        super(props)
    }

    public render () {
        return (
            <div>
                {this.props.fetchCoordinatesError}
                <span>Click here</span>
            </div>
        )
    }
}

export default LocationAndDateForm;