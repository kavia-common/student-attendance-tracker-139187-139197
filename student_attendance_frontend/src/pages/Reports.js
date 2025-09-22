import React, { useEffect, useMemo, useState } from "react";
import { Card, Button, Input, Select, Loader } from "../components/UI";
import { getSummaryReport, listStudents } from "../api/client";

// PUBLIC_INTERFACE
export default function Reports() {
  /** Summary report page showing counts by status and rate. */
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    studentId: "",
  });
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const studentOptions = useMemo(
    () => [{ value: "", label: "All students" }].concat(students.map((s) => ({ value: s.id, label: `${s.name} (${s.rollNumber})` }))),
    [students]
  );

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

  const fetchSummary = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getSummaryReport({
        from: filters.from,
        to: filters.to,
        studentId: filters.studentId || undefined,
      });
      setSummary(res);
    } catch (e) {
      setError("Failed to load report");
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Stat = ({ label, value, color }) => (
    <Card style={{ flex: 1, borderLeft: `4px solid ${color}`, padding: 16 }}>
      <div style={{ fontSize: 13, color: "var(--color-text-muted)" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{value ?? "-"}</div>
    </Card>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
          <Input label="From" type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
          <Input label="To" type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
          <Select
            label="Student"
            value={filters.studentId}
            onChange={(e) => setFilters((f) => ({ ...f, studentId: e.target.value }))}
            options={studentOptions}
            style={{ minWidth: 220 }}
          />
          <Button onClick={fetchSummary}>Generate</Button>
        </div>
      </Card>

      {loading ? (
        <Loader />
      ) : error ? (
        <div style={{ color: "var(--color-error)" }}>{error}</div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Stat label="Present" value={summary?.present} color="#10B981" />
            <Stat label="Absent" value={summary?.absent} color="#EF4444" />
            <Stat label="Late" value={summary?.late} color="#F59E0B" />
            <Stat label="Excused" value={summary?.excused} color="#3B82F6" />
          </div>
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Attendance Rate</div>
            <div style={{ height: 14, background: "#E5E7EB", borderRadius: 8, overflow: "hidden" }}>
              {(() => {
                const total = (summary?.present || 0) + (summary?.absent || 0) + (summary?.late || 0) + (summary?.excused || 0);
                const rate = total > 0 ? Math.round(((summary?.present || 0) / total) * 100) : 0;
                return (
                  <div
                    style={{
                      width: `${rate}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                      transition: "width 300ms ease",
                    }}
                    aria-label={`Attendance rate ${rate}%`}
                  />
                );
              })()}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
