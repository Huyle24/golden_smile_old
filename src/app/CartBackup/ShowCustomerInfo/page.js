"use client"
import CustomerList from "./CustomerList";
import DetailBooking from "./DetailBooking";
import InfoCustomer from "./InfoCustomer";
import Receipt from "./Receipt";

export default function Home(){
    return (
        <main>
            <InfoCustomer />
            {/*<CustomerList />*/}
            <Receipt />
        </main>
    )
}