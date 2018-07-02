import * as _ from 'lodash';
import * as React from 'react';
import './LocationAndDateForm.css';

interface IProps {
    error: string | boolean,
    getSunActivity: (args: object) => void,
}

class LocationAndDateForm extends React.Component<IProps, {}> {

    private fields: {
        dateInput: React.RefObject<HTMLInputElement>,
        postcodeInput: React.RefObject<HTMLInputElement>
    };

    constructor (props: IProps) {
        super(props);
        this.fields = {
            dateInput: React.createRef(),
            postcodeInput: React.createRef(),
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public gatherData () {
        let values: object = {};
        _.forOwn(this.fields, (field) => {
            if (field.current) {
                values = {...values, [field.current.name]: field.current.value}
            }
        });
        return values;
    }

    public handleSubmit (e: any) {
        e.preventDefault();
        this.props.getSunActivity (this.gatherData());
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
        return this.props.error === 'NOT_FOUND' ? this.renderInputError() : this.renderServiceError();
    }

    public render () {
        return (
            <form className="form" onSubmit={ this.handleSubmit }>
                <h2 className="form__header">Search for your sunrise and sunset times</h2>
                <fieldset className="form_fieldset">
                    <div className="field">
                        <label className="field__label" htmlFor="postcode">Postcode</label>
                        <input required={true} type="text" id="postcode" name="postcode" className="field__input field__input--text" maxLength={8} ref={ this.fields.postcodeInput } />
                    </div>
                    <div className="field">
                        <label className="field__label" htmlFor="date">Date</label>
                        <input required={true} type="date" id="date" name="date" className="field__input field__input--date" ref={ this.fields.dateInput } />
                    </div>
                </fieldset>
                <footer className="footer">
                    { this.props.error && this.handleError() }
                    <button className="footer__button" type="submit">Find</button>
                </footer>
            </form>
        )
    }
}

export default LocationAndDateForm;