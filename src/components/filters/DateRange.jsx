import * as React from 'react';
import '@progress/kendo-theme-default/dist/all.css';

import { DateRangePicker } from '@progress/kendo-react-dateinputs';
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/es/numbers.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import esMessages from '../../lang/tlklang.json';

var moment = require('moment')
const dateFormat = "yyyy-MM-dd";

load(
    likelySubtags,
    currencyData,
    weekData, numbers,
    caGregorian,
    dateFields,
    timeZoneNames
);
loadMessages(esMessages, 'es-ES');

class DateRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleInputChange=(e)=>{
        this.props.handleInputChange(this.props.inputOption.key,e);
    }

    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }
    render() {
        return (
            <LocalizationProvider language="es-ES">
                <IntlProvider locale="es" >
                    <DateRangePicker
                        max={new Date()}
                        disabledDate={this.disabledDate}
                        format={dateFormat} 
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </IntlProvider>
            </LocalizationProvider>
        );
    }
}

export default DateRange;