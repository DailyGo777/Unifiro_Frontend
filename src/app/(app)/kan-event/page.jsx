"use client";

import Navbar from "@/components/Navbar";
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-screen mt-0.8">
        {/* Hero Image */}
        <img
          src="/hero_kan.png"
          alt="KAN"
          className="w-full h-full object-cover"
        />

        {/* Buttons Container */}
        <div className="absolute bottom-32 left-16 flex gap-6">
          <button className="bg-[#FE9A0D] text-white text-center w-48 h-12 px-6 py-2 rounded-lg font-medium hover:bg-[#E58A0C] transition-colors shadow-lg">
            Download Brochure
          </button>
          <Link href={"https://docs.google.com/forms/d/e/1FAIpQLSenGbqcoNYbxR63wwwSNGm_TyOGL2lLvKf-DvI-LMBfwGC-EQ/viewform"} target="_blank">
            <button className="bg-white cursor-pointer text-[#FE9A0D] text-center w-48 h-12 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg border border-[#FE9A0D]">
              Apply Now
            </button>
          </Link>
        </div>
      </div>
      <div className="py-8 px-4 flex justify-center itmes-center">
        <img src="/kan_logo.png" alt="kan-logo" className="w-100% h-28" />
      </div>
      <div className="flex flex-col justify-center items-center py-16 px-4 bg-[#F5F5F5]">
        <h1 className="text-[#2D3290] font-bold text-4xl text-center mb-12">
          ABOUT THE PROGRAM
        </h1>

        <div className="max-w-5xl w-full px-8 md:px-20 flex flex-col gap-y-10">
          {/* What is KAN Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">What is KAN?</h3>
            <p className="text-black text-lg leading-relaxed">
              A flagship startup acceleration program by the Government of
              Karnataka and KDEM, designed to help early-stage startups scale
              faster through mentorship, market access and investor readiness.
            </p>
          </div>

          {/* Why This Program Matters Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              Why This Program Matters
            </h3>
            <ul className="list-disc list-outside ml-6 space-y-3 text-black text-lg">
              <li>Shortens the time from idea → traction → scale</li>
              <li>Provides structured guidance from industry experts</li>
              <li>
                Opens doors to market pilots, investors and government networks
              </li>
              <li>Strengthens regional startup ecosystems</li>
            </ul>
          </div>

          {/* About KAN Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">About KAN</h3>
            <p className="text-black text-lg leading-relaxed">
              The Karnataka Acceleration Network (KAN) is a pioneering
              initiative launched by the Government of Karnataka aimed at
              significantly enhancing the startup ecosystem across the state. As
              one of the first programs of its kind in India, KAN is designed to
              support growth-stage startups and establish a robust network
              between accelerators and incubators in Bengaluru and its
              surrounding regions, including Mysuru, Mangaluru, and
              Hubballi-Dharwad-Belagavi clusters.
            </p>
          </div>

          {/* Offerings Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">Offerings</h3>
            <ul className="list-disc list-outside ml-6 space-y-3 text-black text-lg">
              <li>
                <strong>Foster Inter-Linkages:</strong> Facilitate the exchange
                of information and best practices among accelerators and
                incubators.
              </li>
              <li>
                <strong>Support Startup Growth:</strong> Help growth-stage
                startups scale up by providing crucial support and resources.
              </li>
              <li>
                <strong>Assist in Fundraising and Exit Strategies:</strong> Aid
                startups in raising venture capital, planning exits through
                acquisitions, and gaining customer traction.
              </li>
              <li>
                <strong>Facilitate Technology Commercialization:</strong>{" "}
                Support the commercialization of technology solutions to enhance
                market outreach.
              </li>
              <li>
                <strong>Provide Expert Advisory:</strong> Offer technical and
                business guidance through a network of experts and mentors.
              </li>
              <li>
                <strong>Promote Globalization and Industry Connections:</strong>{" "}
                Connect startups with industry leaders, venture capitalists, and
                promote international expansion.
              </li>
              <li>
                <strong>Support Intellectual Property Rights:</strong> Provide
                comprehensive IPR support to safeguard innovations.
              </li>
              <li>
                <strong>Translate R&D to Market:</strong> Assist in translating
                research and development efforts into commercial ventures.
              </li>
            </ul>
          </div>

          {/* Program Structure Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              Program Structure
            </h3>
            <p className="text-black text-lg leading-relaxed">
              KAN will operate with a total of six selected accelerators and
              incubators, split between Bengaluru and Beyond Bengaluru clusters.
              Bengaluru-based accelerators will serve as mentor accelerators,
              while those in the Beyond Bengaluru clusters will act as mentee
              accelerators/incubators. The mentor accelerators will guide and
              support the mentee accelerators through their expertise and
              experience.
            </p>
          </div>

          {/* Accelerator and Incubator Pairs Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              Accelerator and Incubator Pairs
            </h3>
            <ul className="list-decimal list-outside ml-6 space-y-3 text-black text-lg">
              <li>Jain Launchpad – SJCE-STEP</li>
              <li>DERBI Foundation – SHINE Foundation</li>
              <li>GINSERV – ASTRA</li>
            </ul>
          </div>

          {/* Program Implementation Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              Program Implementation
            </h3>
            <p className="text-black text-lg leading-relaxed">
              Over the next three years, KAN will run a total of 18 cohorts.
              Each mentor-mentee pair will facilitate two cohorts per year,
              fostering a continuous exchange of knowledge and support to drive
              the growth of startups in the targeted regions.
            </p>
          </div>

          {/* Selection Criteria Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              Selection Criteria
            </h3>
            <p className="text-black text-lg leading-relaxed mb-3">
              The Startups that adhere with the following criteria will be
              considered for the program:
            </p>
            <ul className="list-disc list-outside ml-6 space-y-3 text-black text-lg">
              <li>
                Incorporated as any company other than OPC (One Person Company)
              </li>
              <li>
                Stage: MVP-ready, PoC to early revenue/traction, or seed funded
              </li>
              <li>
                Founders must be open to active engagement and assessment-driven
                workshops
              </li>
              <li>The Startup must be registered in Karnataka</li>
            </ul>
          </div>

          {/* Impact Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">Impact</h3>
            <p className="text-black text-lg leading-relaxed">
              The Karnataka Acceleration Network aims to significantly bolster
              the startup ecosystem in Karnataka by creating a collaborative
              environment for accelerators and incubators. This initiative will
              provide essential resources, mentorship, and support to
              approximately 360 growth-stage startups, promoting innovation and
              economic development across the state.
            </p>
          </div>

          {/* KAN Privacy Policy Section */}
          <div className="space-y-4">
            <h3 className="text-[#2D3290] font-bold text-2xl">
              KAN Privacy Policy
            </h3>
            <p className="text-black text-lg leading-relaxed">
              The Karnataka Acceleration Network (KAN) is committed to
              safeguarding the privacy of all participating startups,
              accelerators, and incubators. We collect only essential
              information necessary to facilitate program activities, such as
              mentorship, funding support, and networking opportunities.
            </p>
            <p className="text-black text-lg leading-relaxed">
              All data shared with KAN will be kept confidential and used solely
              for the purpose of supporting and enhancing the startup ecosystem.
              We do not share your information with third parties without your
              explicit consent, except as required by law or to fulfill program
              objectives.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
