'use client'
import Slider from "react-slick";
import Link from "next/link";

function ImagesBanner() {
    return (
        <>
            <section className="image_bannertour_small">
                <Link href={'/Category'}>
                <div data-aos="zoom-in"  data-aos-duration="3000">
                    <img src="https://namecard.nhanhtravel.com/app-assets/mobile/GoldenSmileTravel/banner-nho-1692955015.png" />
                </div>
                </Link>
            </section>
        </>
    )
}

export default ImagesBanner;