import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function EventExperience({ event }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-teal-600">The Experience</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard
              icon={<Calendar className="text-teal-500" />}
              label="Date"
              value={event.date}
            />
            <InfoCard
              icon={<Clock className="text-teal-500" />}
              label="Time"
              value={event.time}
            />
            <InfoCard
              icon={<MapPin className="text-teal-500" />}
              label="Location"
              value={event.location}
            />
          </div>

          {/* HIGHLIGHTS */}
          <div>
            <h3 className="text-xl font-semibold text-teal-600 mb-4">
              Event Highlights
            </h3>
            <ul className="space-y-2 text-gray-700">
              {event.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>🚀</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="border rounded-2xl p-6 shadow-sm bg-white space-y-6">
          <h3 className="text-lg font-semibold text-teal-600">Secure Entry</h3>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Phase 1 Registration</span>
            </p>
            <p className="font-semibold text-black">Now Open – Free Entry</p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Pass Types</p>
            <p className="text-sm text-gray-600">
              Student / Founder Pass – Free <br />
              Professional Pass – Free
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-800">Access</p>
            <p className="text-sm text-gray-600">Full access for all 3 days</p>
          </div>

          <Link href={"/emerge"}>
            <button className="w-full cursor-pointer mb-2 bg-gradient-to-r from-teal-500 to-lime-400 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Registeration Closed →
            </button>
          </Link>

          <div className="text-sm text-gray-600 space-y-1 pt-4 border-t">
            <p>
              <span className="font-semibold">Eligibility:</span> Students |
              Founders | Professionals
            </p>
            <p>
              <span className="font-semibold">Limited Access</span>
            </p>
            <ul className="list-disc ml-4">
              <li>Valid registration required</li>
              <li>Phase 1 slots limited</li>
              <li>On-ground verification mandatory</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="border rounded-xl p-4 flex gap-3 items-center">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
