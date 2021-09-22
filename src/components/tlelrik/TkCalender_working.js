import React,{useState,useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Scheduler, DayView, WeekView, MonthView ,AgendaView,
    TimelineView} from '@progress/kendo-react-scheduler';
import { Switch } from '@progress/kendo-react-inputs';
import { DateInput } from '@progress/kendo-react-dateinputs';


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

    const UpdatSchedule=useCallback((event)=>{
        console.log(event)
       // props.ActionPerform("GotoSchedule",event);
        }
    )

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
       <div className="inner-container">
            <div className="outer-space mt-5 mb-3">
            {/* <div className="example-config d-flex">
                <div className="col-12 col-md-6">
                    <label className="d-block text-center">
                        Allow Internal Date Change: <br />
                        <Switch onChange={handleLockChange} checked={canChangeDate} />
                    </label>
                </div>
                <div className="col-12 col-md-6">
                    <label className="d-block text-center">
                        Or override the selected date from outside: <br />
                        <DateInput value={date} onChange={handleOverride} format="dd/MMM/yyyy" />
                    </label>
                </div>
            </div> */}
            <Scheduler
                data={props.data}
                date={date}
                onDateChange={handleDateChange}
            >
           {/* <DayView />
                <WeekView /> */}
                <MonthView  editable={true} onDataAction={UpdatSchedule} />
                <AgendaView />
                <TimelineView />
                <DayView />
                <WeekView />
                
            </Scheduler>
        </div>
    </div>
    )
}

export default TkCalender;