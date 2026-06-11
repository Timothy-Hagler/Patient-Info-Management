import React, { useState, useEffect } from "react";
import Axios from "axios";

const accountType = sessionStorage.getItem("accountType") || "";
const isVolunteer = accountType === "volunteer";
const isStaff = accountType === "staff";
const isNurse = accountType === "nurse";
const isDoctor = accountType === "doctor";
const canEdit = !isVolunteer;
const canDelete = isDoctor;
const canAdd = !isVolunteer;
const showMedical = !isStaff && !isVolunteer;

const INPUT_CLS = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const LABEL_CLS = "block text-sm font-medium text-gray-700 mb-1";
const SECTION_HDR = "text-xs uppercase tracking-wide text-gray-400 font-semibold border-b border-gray-100 pb-1.5 mb-3 mt-4";

function Field({ label, value, editing, type = "text", onChange, readOnly, min, step }) {
  return (
    <div className="mb-3">
      <label className={LABEL_CLS}>{label}</label>
      {editing && !readOnly ? (
        <input type={type} defaultValue={value || ""} onChange={onChange} className={INPUT_CLS} min={min} step={step} />
      ) : (
        <p className="text-sm text-gray-800 py-1.5">{value || <span className="text-gray-400 italic">—</span>}</p>
      )}
    </div>
  );
}

function TextAreaField({ label, value, editing, onChange, readOnly }) {
  return (
    <div className="mb-3">
      <label className={LABEL_CLS}>{label}</label>
      {editing && !readOnly ? (
        <textarea defaultValue={value || ""} onChange={onChange} rows={3} className={INPUT_CLS} />
      ) : (
        <p className="text-sm text-gray-800 py-1.5 whitespace-pre-wrap">{value || <span className="text-gray-400 italic">—</span>}</p>
      )}
    </div>
  );
}

const TABS = ["Personal", "Emergency", "Admission", "Insurance & Billing", "Medical"];
const visibleTabs = (role) => {
  if (role === "volunteer") return ["Personal"];
  if (role === "staff") return ["Personal", "Emergency", "Admission", "Insurance & Billing"];
  return TABS;
};

function PatientModal({ patient: initialPatient, onClose, onSaved, onDeleted }) {
  const [patient] = useState(initialPatient);
  const [editing, setEditing] = useState(false);
  const [changes, setChanges] = useState({});
  const [activeTab, setActiveTab] = useState(visibleTabs(accountType)[0]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);

  const ch = (field) => (e) => setChanges(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    const keys = Object.keys(changes);
    if (keys.length === 0) { setEditing(false); return; }
    setSaving(true);
    await Axios.post("http://localhost:8080/api/updateData/", {
      schema: "PIMS", table: "Patients",
      cols_to_update: keys, updated_info: changes,
      location: "personID", data: patient.personID,
    });
    setSaving(false);
    setEditing(false);
    setChanges({});
    onSaved();
  };

  const handleDelete = async () => {
    await Axios.post("http://localhost:8080/api/removeRow/", {
      schema: "PIMS", table: "Patients", location: "personID", data: patient.personID,
    });
    onDeleted();
  };

  const tabs = visibleTabs(accountType);

  const f = (field) => ({ value: patient[field], editing, onChange: ch(field) });
  const ro = (field, readOnly) => ({ value: patient[field], editing, onChange: ch(field), readOnly });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {patient.firstName} {patient.middleName} {patient.lastName}
            </h2>
            <p className="text-sm text-gray-400">Patient ID: {patient.personID}</p>
          </div>
          <div className="flex items-center gap-2">
            {!editing && canEdit && (
              <button onClick={() => setEditing(true)} className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Edit
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {activeTab === "Personal" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <Field label="First Name" {...f("firstName")} />
              <Field label="Middle Name" {...f("middleName")} />
              <Field label="Last Name" {...f("lastName")} />
              <Field label="Sex" {...f("sex")} />
              <Field label="Date of Birth" {...f("dateOfBirth")} type="date" />
              {!isVolunteer && (
                <>
                  <div className="col-span-full"><p className={SECTION_HDR}>Address</p></div>
                  <Field label="Street" {...f("street")} />
                  <Field label="City" {...f("city")} />
                  <Field label="State" {...f("state")} />
                  <Field label="Zip Code" {...f("zip")} />
                  <div className="col-span-full"><p className={SECTION_HDR}>Phone Numbers</p></div>
                  <Field label="Home Phone" {...f("homePhone")} />
                  <Field label="Work Phone" {...f("workPhone")} />
                  <Field label="Cell Phone" {...f("cellPhone")} />
                </>
              )}
            </div>
          )}

          {activeTab === "Emergency" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <div className="col-span-full"><p className={SECTION_HDR}>Emergency Contact 1</p></div>
              <Field label="Name" {...f("emergencyContact1_name")} />
              <Field label="Phone" {...f("emergencyContactPhone_1")} />
              <div className="col-span-full"><p className={SECTION_HDR}>Emergency Contact 2</p></div>
              <Field label="Name" {...f("emergencyContact2_name")} />
              <Field label="Phone" {...f("emergencyContactPhone_2")} />
              <div className="col-span-full"><p className={SECTION_HDR}>Other</p></div>
              <Field label="Family Doctor" {...f("familyDoctor")} />
            </div>
          )}

          {activeTab === "Admission" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <div className="col-span-full"><p className={SECTION_HDR}>Admitted</p></div>
              <Field label="Date Admitted" {...f("dateOfAdmittance")} type="date" />
              <Field label="Time Admitted" {...f("timeOfAdmittance")} type="time" />
              <div className="col-span-full"><TextAreaField label="Reason Admitted" {...f("reason")} /></div>
              <div className="col-span-full"><p className={SECTION_HDR}>Location</p></div>
              <Field label="Facility" {...f("facility")} />
              <Field label="Floor" {...f("floor")} />
              <Field label="Room Number" {...f("roomNumber")} />
              <Field label="Bed Number" {...f("bedNumber")} />
              <div className="col-span-full"><p className={SECTION_HDR}>Discharged</p></div>
              <Field label="Date Discharged" {...f("dateOfDischarge")} type="date" />
              <Field label="Time Discharged" {...f("timeOfDischarge")} type="time" />
            </div>
          )}

          {activeTab === "Insurance & Billing" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <div className="col-span-full"><p className={SECTION_HDR}>Insurance</p></div>
              <Field label="Insurance Carrier" {...f("insuranceCarrier")} />
              <Field label="Group Number" {...f("insuranceGroupNumber")} />
              <Field label="Account Number" {...f("insuranceAccountNumber")} />
              <div className="col-span-full"><p className={SECTION_HDR}>Billing</p></div>
              <div className="col-span-full"><TextAreaField label="Billing Information" {...f("listOfBillingInfo")} /></div>
              <Field label="Amount Paid" {...f("amountPaid")} type="number" min="0" step="0.01" />
              <Field label="Amount Owed" {...f("amountOwed")} type="number" min="0" step="0.01" />
              <Field label="Amount Paid by Insurance" {...f("amountPaidByInsurance")} type="number" min="0" step="0.01" />
            </div>
          )}

          {activeTab === "Medical" && showMedical && (
            <div>
              <TextAreaField label="Doctor's Notes" {...ro("drNotes", isNurse)} />
              <TextAreaField label="Nurse's Notes" {...ro("nursesNotes", isDoctor)} />
              <TextAreaField label="Scheduled Procedures" {...f("additionalProcedures")} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <div>
            {editing && canDelete && (
              confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-red-600">Delete this patient?</span>
                  <button onClick={handleDelete} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">Yes, delete</button>
                  <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Delete Patient
                </button>
              )
            )}
          </div>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button onClick={() => { setEditing(false); setChanges({}); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => window.print()} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                  Print
                </button>
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AddPatientModal({ onClose, onAdded }) {
  const [data, setData] = useState({});
  const [step, setStep] = useState("form"); // "form" | "confirm"
  const [saving, setSaving] = useState(false);

  const f = (field) => (e) => setData(prev => ({ ...prev, [field]: e.target.value }));

  const handleAdd = async () => {
    if (!data.firstName || !data.lastName) { alert("First and last name are required."); return; }
    setSaving(true);
    const res = await Axios.get("http://localhost:8080/api/getHighestPersonID/?schema=PIMS&table=Patients");
    const nextID = (res.data[0]["MAX(personID)"] || 0) + 1;
    const payload = { ...data, personID: nextID, middleName: data.middleName || "" };
    const keys = Object.keys(payload);
    const values = Object.values(payload).map(v => `'${v}'`).join(",");
    await Axios.post("http://localhost:8080/api/insertRow/", {
      schema: "PIMS", table: "Patients", headers: keys, values,
    });
    setSaving(false);
    onAdded();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {step === "confirm" ? "Confirm New Patient" : "Add New Patient"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {step === "confirm" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Add {data.firstName} {data.lastName}?</h3>
            <p className="text-sm text-gray-500 mb-6">This will create a new patient record in the database.</p>
            <div className="flex gap-3">
              <button onClick={() => setStep("form")} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
              <button onClick={handleAdd} disabled={saving} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {saving ? "Adding..." : "Yes, Add Patient"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <div className="col-span-full"><p className={SECTION_HDR}>Personal Information</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>First Name *</label><input type="text" onChange={f("firstName")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Middle Name</label><input type="text" onChange={f("middleName")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Last Name *</label><input type="text" onChange={f("lastName")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Sex</label><input type="text" onChange={f("sex")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Date of Birth</label><input type="date" onChange={f("dateOfBirth")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Contact</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Street</label><input type="text" onChange={f("street")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>City</label><input type="text" onChange={f("city")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>State</label><input type="text" onChange={f("state")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Zip Code</label><input type="number" onChange={f("zip")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Home Phone</label><input type="text" onChange={f("homePhone")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Work Phone</label><input type="text" onChange={f("workPhone")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Cell Phone</label><input type="text" onChange={f("cellPhone")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Emergency Contacts</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Contact 1 Name</label><input type="text" onChange={f("emergencyContact1_name")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Contact 1 Phone</label><input type="text" onChange={f("emergencyContactPhone_1")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Contact 2 Name</label><input type="text" onChange={f("emergencyContact2_name")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Contact 2 Phone</label><input type="text" onChange={f("emergencyContactPhone_2")} className={INPUT_CLS} /></div>
                <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Family Doctor</label><input type="text" onChange={f("familyDoctor")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Admission</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Date Admitted</label><input type="date" onChange={f("dateOfAdmittance")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Time Admitted</label><input type="time" onChange={f("timeOfAdmittance")} className={INPUT_CLS} /></div>
                <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Reason Admitted</label><textarea rows={2} onChange={f("reason")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Facility</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Facility</label><input type="text" onChange={f("facility")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Floor</label><input type="number" onChange={f("floor")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Room Number</label><input type="number" onChange={f("roomNumber")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Bed Number</label><input type="number" onChange={f("bedNumber")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Discharge</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Date Discharged</label><input type="date" onChange={f("dateOfDischarge")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Time Discharged</label><input type="time" onChange={f("timeOfDischarge")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Insurance</p></div>
                <div className="mb-3"><label className={LABEL_CLS}>Insurance Carrier</label><input type="text" onChange={f("insuranceCarrier")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Group Number</label><input type="text" onChange={f("insuranceGroupNumber")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Account Number</label><input type="text" onChange={f("insuranceAccountNumber")} className={INPUT_CLS} /></div>
                <div className="col-span-full"><p className={SECTION_HDR}>Billing</p></div>
                <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Billing Information</label><textarea rows={2} onChange={f("listOfBillingInfo")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Amount Paid</label><input type="number" min="0" step="0.01" onChange={f("amountPaid")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Amount Owed</label><input type="number" min="0" step="0.01" onChange={f("amountOwed")} className={INPUT_CLS} /></div>
                <div className="mb-3"><label className={LABEL_CLS}>Amount Paid by Insurance</label><input type="number" min="0" step="0.01" onChange={f("amountPaidByInsurance")} className={INPUT_CLS} /></div>
                {showMedical && (
                  <>
                    <div className="col-span-full"><p className={SECTION_HDR}>Medical Notes</p></div>
                    <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Doctor's Notes</label><textarea rows={3} onChange={f("drNotes")} readOnly={isNurse || isStaff} className={INPUT_CLS} /></div>
                    <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Nurse's Notes</label><textarea rows={3} onChange={f("nursesNotes")} readOnly={isDoctor || isStaff} className={INPUT_CLS} /></div>
                    <div className="mb-3 col-span-full"><label className={LABEL_CLS}>Scheduled Procedures</label><textarea rows={3} onChange={f("additionalProcedures")} className={INPUT_CLS} /></div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
              <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">Cancel</button>
              <button onClick={() => setStep("confirm")} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add Patient
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Patient_List() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("http://localhost:8080/api/getFullPatientTable/");
      setPatients(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPatients(); }, []);

  const openPatient = async (id) => {
    const res = await Axios.get(`http://localhost:8080/api/getPatientInformation/?selection=*&schema=PIMS&table=Patients&location=personID&data=${id}`);
    setSelectedPatient(res.data[0]);
  };

  const q = search.toLowerCase();
  const filtered = patients.filter(p =>
    (p.firstName || "").toLowerCase().includes(q) ||
    (p.lastName || "").toLowerCase().includes(q) ||
    (p.middleName || "").toLowerCase().includes(q)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
            {!loading && <p className="text-sm text-gray-500 mt-0.5">{filtered.length} of {patients.length} patient{patients.length !== 1 ? "s" : ""}</p>}
          </div>
          {canAdd && (
            <button onClick={() => setShowAdd(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Patient
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patients by name…"
            className="w-full sm:w-80 pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-sm text-gray-400">Loading patients…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-sm text-gray-400">{search ? "No patients match your search." : "No patients found."}</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Sex</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Date of Birth</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Room</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.personID} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{p.firstName} {p.middleName} {p.lastName}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{p.sex || "—"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{p.dateOfBirth || "—"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.roomNumber || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openPatient(p.personID)} className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onSaved={() => { setSelectedPatient(null); loadPatients(); }}
          onDeleted={() => { setSelectedPatient(null); loadPatients(); }}
        />
      )}
      {showAdd && (
        <AddPatientModal
          onClose={() => setShowAdd(false)}
          onAdded={() => { setShowAdd(false); loadPatients(); }}
        />
      )}
    </div>
  );
}
