'use client';

import { schoolFormSchema, type SchoolFormInput } from '@evdance/validation';
import type { PaginatedResult, School } from '@evdance/types';
import { FormEvent, useEffect, useState } from 'react';

type ApiError = { error?: { message?: string } };
const initialForm: SchoolFormInput = { name: '', status: 'active' };

export function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [form, setForm] = useState<SchoolFormInput>(initialForm);
  const [editingSchoolId, setEditingSchoolId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>();
  const [isSaving, setIsSaving] = useState(false);

  async function loadSchools() {
    const response = await fetch('/api/schools');
    const body = (await response.json()) as PaginatedResult<School> & ApiError;
    if (!response.ok) {
      setMessage(body.error?.message ?? 'Unable to load schools.');
      return;
    }
    setSchools(body.data);
  }

  useEffect(() => {
    void loadSchools();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = schoolFormSchema.safeParse(form);
    if (!validation.success) {
      setMessage(validation.error.issues[0]?.message);
      return;
    }
    setIsSaving(true);
    setMessage(undefined);
    const response = await fetch(
      editingSchoolId ? `/api/schools/${editingSchoolId}` : '/api/schools',
      {
        method: editingSchoolId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      },
    );
    const body = (await response.json()) as { data?: School } & ApiError;
    setIsSaving(false);
    if (!response.ok) {
      setMessage(body.error?.message ?? 'Unable to save the school.');
      return;
    }
    setForm(initialForm);
    setEditingSchoolId(null);
    setMessage(editingSchoolId ? 'School updated.' : 'School created.');
    await loadSchools();
  }

  function edit(school: School) {
    setEditingSchoolId(school.id);
    setForm({ name: school.name, status: school.status });
    setMessage(undefined);
  }
  function cancelEdit() {
    setEditingSchoolId(null);
    setForm(initialForm);
    setMessage(undefined);
  }

  return (
    <main>
      <header>
        <p className="eyebrow">Evdance platform</p>
        <h1>Schools</h1>
        <p>Create and manage tenant schools.</p>
      </header>
      <section className="card">
        <h2>{editingSchoolId ? 'Edit school' : 'Create school'}</h2>
        <form onSubmit={submit}>
          <label>
            School name
            <input
              value={form.name}
              maxLength={160}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              required
            />
          </label>
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
                  status: event.target.value as SchoolFormInput['status'],
                })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <div className="actions">
            <button disabled={isSaving} type="submit">
              {isSaving
                ? 'Saving…'
                : editingSchoolId
                  ? 'Save changes'
                  : 'Create school'}
            </button>
            {editingSchoolId && (
              <button type="button" className="secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
        {message && (
          <p role="status" className="message">
            {message}
          </p>
        )}
      </section>
      <section className="card">
        <h2>All schools</h2>
        {schools.length === 0 ? (
          <p>No schools yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id}>
                  <td>{school.name}</td>
                  <td>
                    <span className={`status ${school.status}`}>
                      {school.status}
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat('en-PK', {
                      dateStyle: 'medium',
                    }).format(new Date(school.createdAt))}
                  </td>
                  <td>
                    <button
                      className="secondary"
                      type="button"
                      onClick={() => edit(school)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
