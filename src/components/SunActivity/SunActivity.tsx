import * as React from 'react';

interface IProps {
    fetchCoordinatesError: string,
    sunActivity: any,
}

class SunActivity extends React.Component<IProps, {}> {

    constructor (props: IProps) {
        super(props)
    }

    public render () {
        return (
            <div>
                {this.props.fetchCoordinatesError}
            </div>
        )
    }
}

export default SunActivity;