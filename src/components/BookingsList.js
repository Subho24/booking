import axios from "../axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingVisual } from "./Loading";
import { FaRegClock } from 'react-icons/fa'
import { MdOutlinePeopleOutline } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Box, Modal, Card, CardContent } from "@mui/material";


export const BookingList = (props) => {
    const { companyId } = useParams();
    const [customerInfo, setCustoemrInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false)
    const nav = useNavigate();
    const currDate = new Date()
    const selectedDate = props.selectedDate === null ? `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}` : props.selectedDate


    const countCustomers = (bookings) => {
        let totalCustomers = 0;

        for(let i=0; i<props.bookings.length; i++) {
            totalCustomers += bookings[i].number_of_people
        }

        return totalCustomers;
    }

    const handleCustomerInfoClick = (booking) => {
        setCustoemrInfo({
            customer_name: booking.customer_name,
            customer_mobile: booking.customer_mobile,
            customer_email: booking.customer_email
        });
        setModalOpen(true);
    }


    const listStyles = {
        display: 'flex',
        gap: 50
    }

    const modalContent = (
        <div className="confirmModal">
            <AiOutlineCloseCircle onClick={() => setModalOpen(false)} style={{float: 'right', padding: 10}} />
            <h1>Customer Details</h1>
            <ul>
                {
                    customerInfo !== null ? (
                        <li style={{display: 'inline-flex', flexWrap: 'wrap'}}>
                            <h3>Customer Name: {customerInfo.customer_name}</h3>
                            <h3>Customer Mobile: {customerInfo.customer_mobile}</h3>
                            <h3>Customer Email: {customerInfo.customer_email}</h3>
                        </li>
                    ) : <p>----</p>
                }
            </ul> 
        </div>
    )

    const summaryStyle = {
        width: '75%',
        border: '0px solid black',
        margin: '10px auto 0px auto',
        boxShadow: '5px 3px 5px dimgrey',
        borderRadius: '5px',
        fontWeight: 'bolder',
        height: '25px',
        background: 'aliceblue'
    }

    const typeStyle = {
        border: '0px solid black',
        padding: 2,
        boxShadow: '0px 2px 1px dimgrey',
        borderRadius: '5px',
        background: 'aliceblue',
        float: 'right'
    }

    const nameStyle = {
        border: '0px solid black',
        padding: 2,
        boxShadow: '0px 2px 1px dimgrey',
        borderRadius: '5px',
        background: 'aliceblue',
        float: 'left',
        marginBottom: '10px'
    }

    if(props.bookings.length < 1) {
        return(
            <p>No bookings for today!</p>
        )
    } else {
        return (
            <>
                <Box>
                    <div style={summaryStyle}>{props.bookings.length} {props.bookings.length > 1 ? 'bookings' : 'booking'} {countCustomers(props.bookings)} {countCustomers(props.bookings) > 1 ? 'customers' : 'customer'}</div>
                    {props.bookings.map(booking => {
                        return(
                            <Card sx={{marginTop: 5}} onClick={() => handleCustomerInfoClick(booking)}>
                                <CardContent>
                                    <span style={{float: 'left'}}>{booking.booking_time}</span>
                                    <span style={typeStyle}>{booking.booking_type} </span>
                                    <br/>
                                    <br/>
                                    <span style={nameStyle}>{booking.customer_name}</span><span style={{float: 'left', paddingTop: '4px', paddingLeft: '5px', color: 'red'}}>{booking.number_of_people} person</span>
                                </CardContent>
                            </Card>
                        )
                    })}
                    <Modal
                        open={modalOpen}
                    >
                        {modalContent}
                    </Modal>
                </Box>
            </>
        )
    }
}