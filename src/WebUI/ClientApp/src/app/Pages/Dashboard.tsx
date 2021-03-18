import React, {useEffect, useState} from "react";
import {DesksClient, PaginatedListDeskDto} from "../api/web-client";
import axios, {AxiosInstance} from "axios";

interface IDeskTile {
    desk: PaginatedListDeskDto
}

function DeskTile(props : IDeskTile) {
    const desk = props.desk;
    return (
        <div
            className="sm:rounded-tr-none relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 shadow-sm">
            <div>
                  <span className="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                           stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </span>
            </div>
            <div className="mt-8">
                <h3 className="text-lg font-medium">
                    <a href="#" className="focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true"/>
                        {desk.name}
                    </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    {desk.description ?? "No Description"}
                </p>
            </div>
            <span className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
                  </svg>
                </span>
        </div>
    );
}

export default function Dashboard() {

    const [desks, setDesks] = useState< {items:PaginatedListDeskDto[] | undefined}>({items: undefined})

    useEffect(() => {
        const instance: AxiosInstance = axios.create({transformResponse: data => data});
        const client = new DesksClient(undefined, instance);
        client.listDesks(10, 1).then((res) => setDesks({items: res.items}))
    }, []);

    return (
        <section aria-labelledby="quick-links-title">
            <div
                className="rounded-lg overflow-hidden shadow-2xl divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                <h2 className="sr-only" id="quick-links-title">Quick links</h2>
                {desks.items?.map((desk) => (
                    <DeskTile desk={desk}/>
                ))}
            </div>
        </section>
    )
}