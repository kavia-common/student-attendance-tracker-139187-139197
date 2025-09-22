import React, { useEffect, useMemo, useState } from "react";
import { Card, Button, Select, Loader, Table } from "../components/UI";
import { listStudents, markAttendance } from "../api/client";

const STATUS_OPTIONS = [
  { value: "present", label: "Present ✅" },
  { value: "absent", label: "Absent ❌" },
  { value: "late", label: "Late ⏰" },
  { value: "excused", label: "Excused 📝" },
];

// PUBLIC_INTERFACE
export default function MarkAttendance() {
  /** Page to mark today's attendance for each student. */
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [selected, setSelected] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await listStudents();
        if (mounted) setStudents(Array.isArray(res) ? res : res?.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const columns = useMemo(
    () => [
      { key: "roll", title: "Roll No", dataIndex: "rollNumber" },
      { key: "name", title: "Student Name", dataIndex: "name" },
      {
        key: "status",
        title: "Status",
        dataIndex: "id",
        render: (_v, row) => (
          <Select
            value={selected[row.id] || "present"}
            onChange={(e) => setSelected((s) => ({ ...s, [row.id]: e.target.value }))}
            options={STATUS_OPTIONS}
          />
        ),
      },
    ],
    [selected]
  );

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage("");
    try {
      const tasks = students.map((s) =>
        markAttendance({
          studentId: s.id,
          date,
          status: selected[s.id] || "present",
          notes: "",
        })
      );
      await Promise.all(tasks);
      setMessage("Attendance saved successfully.");
    } catch (e) {
      console.error(e);
      setMessage("Some records failed to save. Please retry.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Mark Attendance</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Select status for each student and save.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label style={{ fontSize: 13, color: "var(--color-text-muted)" }}>
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  marginLeft: 8,
                  padding: "8px 10px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                }}
              />
            </label>
            <Button onClick={handleSaveAll} disabled={saving || loading}>
              {saving ? "Saving..." : "Save All"}
            </Button>
          </div>
        </div>
      </Card>
      <Card>
        {loading ? (
          <Loader />
        ) : (
          <Table
            columns={columns}
            data={students}
            emptyLabel="No students found. Add students via backend or admin panel."
          />
        )}
        {message && (
          <div style={{ marginTop: 12, fontSize: 13, color: message.includes("success") ? "var(--color-secondary)" : "var(--color-error)" }}>
            {message}
          </div>
        )}
      </Card>
    </div>
  );
}
