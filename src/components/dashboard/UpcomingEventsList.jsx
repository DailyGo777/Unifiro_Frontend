import React from "react";

const events = [
    {
        day: "20",
        month: "Feb",
        title: "Tech Innovation Summit",
        status: "Published",
        reg: 142,
        color: "bg-cyan-100 text-cyan-700",
    },
    {
        day: "24",
        month: "Feb",
        title: "Tech Innovation Summit",
        status: "Published",
        reg: 142,
        color: "bg-cyan-100 text-cyan-700",
    },
    {
        day: "26",
        month: "Feb",
        title: "Tech Innovation Summit",
        status: "Published",
        reg: 142,
        color: "bg-cyan-100 text-cyan-700",
    },
    {
        day: "29",
        month: "Feb",
        title: "Tech Innovation Summit",
        status: "Published",
        reg: 142,
        color: "bg-cyan-100 text-cyan-700",
    },
    {
        day: "03",
        month: "Mar",
        title: "Tech Innovation Summit",
        status: "Draft",
        reg: 142,
        color: "bg-gray-200 text-gray-600",
    },
];

export default function UpcomingEventsList() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/80 h-[500px] flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-7">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                    <button className="text-xs font-semibold text-cyan-800 hover:text-gray-800 bg-cyan-200 px-2 py-1 rounded-lg">View All</button>
                </div>

                <div className="flex flex-col gap-4">
                    {events.map((event, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-cyan-100/50 rounded-xl flex flex-col items-center justify-center text-cyan-800">
                                <span className="text-xs font-bold leading-none">{event.day}</span>
                                <span className="text-[10px] font-medium leading-none mt-1">{event.month}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 truncate">
                                    {event.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${event.color}`}>
                                        {event.status}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-medium ml-auto flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                                        {event.reg} Reg.
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between bg-gray-100 p-2 rounded-xl">
                <span className="text-sm font-semibold text-gray-700 px-2">Total Active Events</span>
                <div className="bg-cyan-300 text-cyan-900 font-bold px-3 py-1 rounded-lg">07</div>
            </div>
        </div>
    );
}
