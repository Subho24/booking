import { NavLink } from 'react-router-dom';
import { BsTag, BsPerson, BsCalendarCheck, BsCalendarWeek } from 'react-icons/bs';
import { BiTime } from 'react-icons/bi';


export const NavBar = (props) => {
    const divStyle = {
        display: 'inline-block',
        marginTop: '10%',
        marginRight: '20%',
        marginLeft: '20%',
    }
    const NavLinkStyle = {
        margin: 15,
        fontSize: '1.2em',
        fontStyle: 'none',
        textDecoration: 'none',
        color: 'grey'
    }
    return (
        <div style={divStyle} className='NavBar'  >
            <NavLink style={NavLinkStyle} to={'/book'}>
                <BsTag/>{props.selectedType === '' ? 'Type' : props.selectedType}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/people'}>
                <BsPerson/>{props.peopleAmount === 0 ? 'People' : props.peopleAmount === 1 ? '1 person' : `${props.peopleAmount} persons`}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/date'}>
                <BsCalendarWeek/>{props.selectedDate === null ? 'Date' : props.selectedDate}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/time'}>
                <BiTime/>{props.selectedTime === null ? 'Time' : props.selectedTime}
            </NavLink>
            <NavLink style={NavLinkStyle} to={'/confirm'}>
                <BsCalendarCheck/>Confirm
            </NavLink>
        </div>
    )
}