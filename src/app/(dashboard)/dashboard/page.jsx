"use client";
import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StatCard";
import TrendChart from "@/components/dashboard/TrendChart";
import UpcomingEventsList from "@/components/dashboard/UpcomingEventsList";
import { Ticket, Users, Play, Calendar } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto mt-1 animate-fade-in-up">
            <DashboardHeader title="Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" 
            >
                <StatCard
                    icon={Ticket}
                    title="Total Events"
                    value="26"
                    trend="+12%"
                    trendLabel="vs last month"
                    trendPositive={true}
                />
                <StatCard
                    title="Total Registrations"
                    value="1,284"
                    trend="+7.9%"
                    trendLabel="vs last month"
                    trendPositive={true}
                />
                <StatCard
                    icon={Play}
                    title="Active Events"
                    value="26"
                    trend="+12%"
                    trendLabel="vs last month"
                    trendPositive={true}
                />
                <StatCard
                    
                    icon={Ticket}
                    title="Total Events"
                    value="26"
                    trend="+12%"
                    trendLabel="vs last month"
                    trendPositive={true}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <TrendChart />
                </div>

                {/* Upcoming Events Section */}
                <div className="lg:col-span-1">
                    <UpcomingEventsList />
                </div>
            </div>
        </div>
    );
}
