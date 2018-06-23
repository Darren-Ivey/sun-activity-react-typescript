import * as React from 'react';

interface IProps {
    fetchCoordinatesError: string,
    sunActivity: string,
}

class SunActivity extends React.Component<IProps, {}> {

    constructor (props: IProps) {
        super(props)
    }

    public render () {
        return (
            <div>
                {this.props.fetchCoordinatesError}
                {this.props.sunActivity}
            </div>
        )
    }
}

export default SunActivity;