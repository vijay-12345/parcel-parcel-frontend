import React,{useState,useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Scheduler, DayView, WeekView, MonthView ,AgendaView,
    TimelineView} from '@progress/kendo-react-scheduler';
import { Switch } from '@progress/kendo-react-inputs';
import { DateInput } from '@progress/kendo-react-dateinputs';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import numbers from 'cldr-numbers-full/main/es/numbers.json';
import currencies from 'cldr-numbers-full/main/es/currencies.json';
import caGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/es/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/es/timeZoneNames.json';
import esMessages from '../../lang/tlklang.json';
import $ from 'jquery'
var moment = require('moment') 


load(
    likelySubtags,
    currencyData,
    weekData,
    numbers,
    currencies,
    caGregorian,
    dateFields,
    timeZoneNames
);

loadMessages(esMessages, 'es-ES');
const dateFormat = 'YYYY-MM-DD';
const Timeformat = 'HH:mm';

const TkCalender=(props)=>{
    const defaultDate = new Date();
    const [date, setDate] = useState(defaultDate);
    const [canChangeDate, setCanChangeDate] = useState(true);
    const handleDateChange = useCallback(
        (event) => {
            if (canChangeDate) {
                setDate(event.value);
            }
        },
        [date, setDate, canChangeDate]
    )

    const calenderdata = props.data.map(dataItem => (
        {
            id:dataItem.id,
            title:dataItem.title,
            start: new Date((moment(dataItem.date).format(dateFormat))+'T'+(moment(dataItem.date).format(Timeformat))),
            end:  new Date((moment(dataItem.endDate).format(dateFormat))+'T'+(moment(dataItem.endDate).format(Timeformat))),
            isAllDay: dataItem.isAllDay,
            description: dataItem.description,
            toUserId:dataItem.toUserId,
            // recurrenceRule: dataItem.recurrenceRule,
            // recurrenceId: dataItem.RecurrenceID,
            // recurrenceExceptions: dataItem.RecurrenceException,
            // roomId: dataItem.RoomID,
            // ownerID: dataItem.OwnerID,
            // personId: dataItem.OwnerID
        }
    ));

    const customModelFields = {
        id: 'id',
        title: 'title',
        description: 'description',
        start: 'start',
        end: 'end',
        isAllDay:"isAllDay",
        toUserId:"toUserId",
        // recurrenceRule: 'RecurrenceRule',
        // recurrenceId: 'RecurrenceID',
        // recurrenceExceptions: 'RecurrenceException',
    };

    const UpdatSchedule=useCallback((event)=>{
        // console.log(event);
      props.ActionPerform("GotoSchedule",event);
    })

    const onCellClick=(event)=>{
        return (
            <div>
                {event.title}
            </div>
        );
    }
    

    const handleOverride = useCallback(
        (event) => {
            if (event.value) {
                setDate(event.value)
            }
        },
        [date, setDate]
    )

    const handleLockChange = useCallback(
        () => {
            setCanChangeDate(old => !old)
        },
        [canChangeDate, setCanChangeDate]
    )

        return (
            <LocalizationProvider language="es-ES">
                <IntlProvider locale="es" >
                    <Scheduler
                        // editSlot={onCellClick}
                        modelFields={customModelFields}
                        data={calenderdata}
                        date={date}
                        onDateChange={handleDateChange}
                    >
                        <MonthView  
                            editable={true} 
                            onDataAction={UpdatSchedule} 
                        />
                        <AgendaView  editable={true} onDataAction={UpdatSchedule} />
                        {/* <TimelineView  editable={true} onDataAction={UpdatSchedule} />
                        <DayView  editable={true} onDataAction={UpdatSchedule} />
                        <WeekView  editable={true} onDataAction={UpdatSchedule} /> */}
                    </Scheduler>
                </IntlProvider>
            </LocalizationProvider>
    )
}

export default TkCalender;