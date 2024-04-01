import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import * as actions from "../../../redux/actions";
import Link from "next/link";

function Advertisement(props) { // Prop for image URL

    let popup_img = props.fetchImgInfo.data && props.fetchImgInfo.isLoading === false ? props.fetchImgInfo.data.popup : '';
    const [showPopup, setShowPopup] = useState(false);

    const handleOpen = () => {
        setShowPopup(true);
    };

    const handleClose = () => {
        setShowPopup(false);
        sessionStorage.setItem('popupStatus', 'false');
    };

    useEffect(() => {
        const storedStatus = sessionStorage.getItem('popupStatus');
        if (!storedStatus) {
            handleOpen();
        }
    }, []);

    return (
        <div className={`advertisement-modal ${showPopup ? 'active' : ''}`}>
            <div className="advertisement-modal-content">
                <Link href={popup_img  && popup_img.url_link ? popup_img.url_link : '#'}>
                    <img
                        src={popup_img  && popup_img.bucket_img ? popup_img.bucket_img : 'https://vigomanager.com/app-assets/mobile/img-huy/golden%20smile%20logo.png'}
                        alt="Advertisement" className="advertisement-image"/>
                </Link>
                <button className="close-button" onClick={handleClose}>x</button>
            </div>
            <div className="advertisement-modal-overlay" onClick={handleClose}></div>
        </div>

    );
}


const mapStateToProps = state => ({
    slideImageListInfo: state.slideImageListInfo,
    fetchImgInfo: state.fetchImgInfo
});
export default connect(mapStateToProps, actions)(Advertisement);