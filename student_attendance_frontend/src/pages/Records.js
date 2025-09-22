import React, { useEffect, useMemo, useState } from "react";
import { Card, Button, Input, Select, Loader, Table } from "../components/UI";
import { listAttendance, listStudents } from "../api/client";

const STATUS_OPTIONS = [
  { value: "", label: "Any status" },
  { value: "present", label: "Present" },
  { value: "absent", label: "Absent" },
  { value: "late", label: "Late" },
  { value: "excused", label: "Excused" },
];

// PUBLIC_INTERFACE
export default function Records() {
  /** Attendance records page with filters and table. */
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ studentId: "", date: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await listStudents();
        setStudents(Array.isArray(res) ? res : res?.data || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const studentOptions = useMemo(() => [{ value: "", label: "All students" }].concat(
    students.map((s) => ({ value: s.id, label: `${s.name} (${s.rollNumber})` }))
  ), [students]);

  const columns = useMemo(
    () => [
      { key: "id", title: "ID", dataIndex: "id" },
      { key: "student", title: "Student", dataIndex: "studentName" },
      { key: "roll", title: "Roll No", dataIndex: "rollNumber" },
      { key: "date", title: "Date", dataIndex: "date" },
      { key: "status", title: "Status", dataIndex: "status" },
      { key: "notes", title: "Notes", dataIndex: "notes" },
    ],
    []
  );

  const fetchRows = async () => {
    setLoading(true);
    try {
      const query = {
        studentId: filters.studentId || undefined,
        date: filters.date || undefined,
        status: filters.status || undefined,
      };
      const res = await listAttendance(query);
      const arr = Array.isArray(res) ? res : res?.data || [];
      // attempt to enrich with student info if missing names
      const map = new Map(students.map((s) => [s.id, s]));
      const final = arr.map((r) => {
        const st = map.get(r.studentId) || {};
        return {
          ...r,
          studentName: r.studentName || st.name || r.studentId,
          rollNumber: r.rollNumber || st.rollNumber || "-",
        };
      });
      setRows(final);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
          <Select
            label="Student"
            value={filters.studentId}
            onChange={(e) => setFilters((f) => ({ ...f, studentId: e.target.value }))}
            options={studentOptions}
            style={{ minWidth: 220 }}
          />
          <Input
            label="Date"
            type="date"
            value={filters.date}
            onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))}
          />
          <Select
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            options={STATUS_OPTIONS}
            style={{ minWidth: 160 }}
          />
          <Button onClick={fetchRows}>Apply Filters</Button>
        </div>
      </Card>
      <Card>
        {loading ? <Loader /> : <Table columns={columns} data={rows} emptyLabel="No attendance records" />}
      </Card>
    </div>
  );
}
