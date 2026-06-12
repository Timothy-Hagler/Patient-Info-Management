import React, { useState } from "react";

const FAQS = [
  { q: "How do system administrators add users to the system?", a: "System administrators generate a username and password for each user, which is stored in the database. Contact an administrator to request a new account." },
  { q: "How do I log in to the system?", a: "Navigate to the PIMS login page, enter the username and password provided by your administrator, and click Sign in." },
  { q: "How do I search for a patient?", a: "On the Patients page, use the search bar at the top to filter patients by first, middle, or last name in real time. No additional steps needed." },
  { q: "How do I edit a patient's information?", a: "Click View next to a patient's name in the list, then click the Edit button inside the patient modal. Make your changes and click Save Changes. Note: access to certain fields depends on your role." },
  { q: "How do I add a new patient?", a: "On the Patients page, click the Add Patient button in the upper right. Fill in the required information and confirm to add the record to the database." },
  { q: "How do I delete a patient from the system?", a: "Open a patient's record and enter edit mode. A Delete Patient button will appear at the bottom of the modal (available to Doctors only). You will be asked to confirm before the record is removed." },
  { q: "How do I print a patient's report?", a: "Open a patient's record (View mode) and click the Print button in the modal footer. This will trigger your browser's print dialogue." },
  { q: "How do I log out?", a: "Click Sign out in the top-right corner of the navigation bar." },
];

const TEAM = [
  { name: "Timothy Hagler",   email: "trh0030@uah.edu" },
  { name: "Sydney Keller",    email: "smk0023@uah.edu" },
  { name: "Benjamin Stone",   email: "bas0043@uah.edu" },
  { name: "Laurel Strelzoff", email: "lcs0018@uah.edu" },
];

function Accordion({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {question}
        <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Help_Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Help & Info</h1>
        <p className="text-sm text-gray-500 mb-8">Answers to common questions about using PIMS.</p>

        <section className="mb-10">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => <Accordion key={i} question={faq.q} answer={faq.a} />)}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-base font-semibold text-gray-800 mb-4">About PIMS</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-600 leading-relaxed">
              The Patient Information Management System (PIMS) allows doctors, nurses, office staff, and volunteers to access patient records based on their role.
              Doctors can view and edit all information including clinical notes. Nurses can view all information and edit nurse notes.
              Office staff can manage administrative and insurance details. Volunteers have limited access to patient name and location.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-4">Contact the Administrators</h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {TEAM.map(({ name, email }) => (
              <div key={email} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm font-medium text-gray-800">{name}</span>
                <a href={`mailto:${email}`} className="text-sm text-blue-600 hover:underline">{email}</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
