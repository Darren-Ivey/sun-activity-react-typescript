import * as React from 'react';

interface IProps {
    error: string,
    getSunActivity: (postcode: string, date: string) => void,
}

class LocationAndDateForm extends React.Component<IProps, {}> {

    public fields: {
        dateInput: any,
        postcodeInput: any
    };

    constructor (props: IProps) {
        super(props);
        this.fields = {
            dateInput: React.createRef(),
            postcodeInput: React.createRef()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleSubmit (e: any) {
        e.preventDefault();

        // TODO: Improve data gathering
        this.props.getSunActivity (
            this.fields.postcodeInput.current.value,
            this.fields.dateInput.current.value
        );
    }

    public renderInputError () {
        return (
            <div className="error">
                <p className="error__message">
                    Sorry, we can't find a location for that postcode. Please check your postcode is valid or try another.
                </p>
            </div>
        )
    }

    public renderServiceError () {
        return (
            <div className="error">
                <p className="error__message">Please try again.</p>
            </div>
        )
    }

    public handleError () {
        (this.props.error && this.props.error === '404') ? this.renderInputError() : this.renderServiceError();
    }

    public render () {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postCode">Postcode</label>
                        <input required={true} type="text" id="postCode" className="field__input field__input--text" maxLength={8} ref={ this.fields.postcodeInput } />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input required={true} type="date" id="date" className="field__input field__input--date" ref={ this.fields.dateInput } />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.handleError() }
                    <button className="footer__button" type="submit">Find</button>
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;