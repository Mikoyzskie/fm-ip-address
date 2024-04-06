"use client";

import Image from "next/image";
import { ipSearch } from "@/app/action";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet"
import { useState, useRef, useEffect, FC } from "react"
import { Loader } from "@/components/Loader";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

interface LocationData {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
    geonameId: number;
}

interface AsData {
    asn: number;
    name: string;
    route: string;
    domain: string;
    type: string;
}

interface Data {
    ip: string;
    location: LocationData;
    domains: string[];
    as: AsData;
    isp: string;
}
interface MarkerData {
    coordinates: [number, number];
    title: string;
}

const initialState = {
    message: "",
    result: {
        ip: "",
        location: {
            country: "",
            region: "",
            city: "",
            lat: 0,
            lng: 0,
            postalCode: "",
            timezone: "",
            geonameId: 0
        },
        domains: [],
        as: {
            asn: 0,
            name: "",
            route: "",
            domain: "",
            type: ""
        },
        isp: ""
    }
};

function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <button className={clsx("w-[58px] h-full flex items-center justify-center rounded-r-[15px]",
            pending ? "bg-neutral-800" : "bg-black"
        )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" /></svg>
        </button>
    )
}

export default function Everything() {
    const [state, formAction] = useFormState(ipSearch, initialState);
    const [details, setDetails] = useState<Data>()
    const [markerData, setMarkerData] = useState<MarkerData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const mapRef = useRef<any | null>(null);

    const ZoomHandler: FC = () => {
        const map = useMap();
        const flyToMarker = (coordinates: [number, number], zoom: number) => {
            if (coordinates && typeof coordinates[0] !== "undefined") {
                map.flyTo(coordinates, zoom, {
                    animate: true,
                    duration: 1.5,
                });
            }
        };
        useMapEvents({
            zoomend: () => {
                setLoading(false);
            },
        });
        useEffect(() => {
            if (markerData) {
                if (markerData.coordinates && typeof markerData.coordinates[0] !== "undefined") {
                    flyToMarker(markerData.coordinates, 11);
                }
            }
        }, [markerData]);
        return null;
    };

    useEffect(() => {
        if (state && state.result) {
            setLoading(true);
            setMarkerData({ coordinates: [state.result.location.lat, state.result.location.lng], title: "result" })
        }
        setLoading(false);
    }, [state])

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.ipify.org/?format=json');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const jsonData = await response.json();

                try {
                    const res = await fetch(
                        `https://geo.ipify.org/api/v2/country,city?apiKey=at_cme4nGNshJDTm681IJPFZdA64XY5f&ipAddress=${jsonData.ip}`
                    );
                    if (!res.ok) {
                        throw new Error('Network response was not ok.');
                    }
                    const result = await res.json();
                    setDetails(result)
                    setLoading(false);
                    setMarkerData({ coordinates: [result.location.lat, result.location.lng], title: "result" })

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])


    return (
        <div className="flex flex-col min-h-screen">
            <section>
                <div className="relative">
                    <Image
                        src={"/pattern-bg-desktop.png"}
                        alt="background pattern"
                        height={280}
                        width={1440}
                        priority
                        className="h-[280px] w-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center pt-[33px] tracking-[-0.29px]">
                        <h1 className="font-medium text-[32px] text-white leading-[30px] mb-8">IP Address Tracker</h1>
                        <form action={formAction} className="max-w-[555px] w-full flex ">
                            <div className="px-6 py-[18px] bg-white w-full rounded-l-[15px]">
                                <input type="text" id="ipAddress" name="ipAddress" placeholder="Search for any IP address or domain" className="outline-none w-full text-lg h-full leading-[21px]" />
                            </div>

                            <SubmitButton />
                        </form>
                        <div className="max-w-[1110px] relative -bottom-1/4 w-full bg-white shadow-md rounded-[15px] px-8 py-9 flex gap-8 justify-center z-10">
                            <div className="flex flex-col items-start gap-[13px] basis-full">
                                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">IP Address</p>
                                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px] ">{details ? details.ip : "0.0.0.0"}</h2>
                            </div>
                            <svg className="self-center basis-1" width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.15" width="1" height="75" fill="black" />
                            </svg>
                            <div className="flex flex-col items-start gap-[13px] basis-full">
                                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">Location</p>
                                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px] ">{details ? `${details.location.city}, ${details.location.region} ${details.location.postalCode}` : "Location"}</h2>
                            </div>
                            <svg className="self-center basis-1" width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.15" width="1" height="75" fill="black" />
                            </svg>
                            <div className="flex flex-col items-start gap-[13px] basis-full">
                                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">Timezone</p>
                                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px] ">{details ? `UTC ${details.location.timezone}` : "UTC 0:00"}</h2>
                            </div>
                            <svg className="self-center basis-1" width="1" height="75" viewBox="0 0 1 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.15" width="1" height="75" fill="black" />
                            </svg>
                            <div className="flex flex-col items-start gap-[13px] basis-full">
                                <p className="tracking-[1.75px] text-xs font-bold text-[rgba(44,44,44,0.5)]">ISP</p>
                                <h2 className="text-[#2C2C2C] text-[26px] leading-[30px] font-bold -tracking-[0.23px] ">{details ? details.isp : "ISP"}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="grow w-full h-full">
                {loading && <Loader />}

                <div className='relative z-0'>
                    <MapContainer center={[43.6426, -79.3871]} zoom={11} style={{ height: "calc(100vh - 280px)", width: "100vw" }}>
                        {/* 21. Set the tile layer for the map. */}
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {/* 22. Conditionally render the marker. */}
                        {markerData && markerData.coordinates && (
                            <Marker position={markerData.coordinates}>
                                <Popup>{markerData.title}</Popup>
                            </Marker>
                        )}
                        {/* 23. Include the ZoomHandler for zoom events. */}
                        <ZoomHandler />
                    </MapContainer>
                </div>


            </section>
        </div>
    );
}