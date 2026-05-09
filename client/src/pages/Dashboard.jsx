// pages/Dashboard.jsx
import { useDispatch, useSelector } from "react-redux";
import { createNote, fetchMyNotes } from "../features/noteSlice";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);

  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchMyNotes());
  }, [dispatch]);

  const handleAdd = () => {
    if (!content) return;
    dispatch(createNote(content));
    setContent("");
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-stone-300 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
            Personal archive
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950">
            My Notes
          </h1>
        </div>
        <div className="border border-stone-300 bg-stone-50/80 px-5 py-3 text-sm text-stone-600 shadow-sm">
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </div>
      </section>

      <section className="border border-stone-300/80 bg-stone-50/75 p-4 shadow-xl shadow-stone-300/30 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          className="min-h-12 flex-1 border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-700 focus:ring-4 focus:ring-stone-300/40"
          placeholder="Write note..."
        />
        <button
          onClick={handleAdd}
          className="min-h-12 bg-stone-950 px-6 font-medium text-stone-50 shadow-sm transition hover:bg-stone-800"
        >
          Add
        </button>
        </div>
      </section>

      {notes.length === 0 ? (
        <section className="border border-dashed border-stone-300 bg-stone-50/50 px-6 py-16 text-center">
          <p className="text-lg font-medium text-stone-800">No notes yet</p>
          <p className="mt-2 text-sm text-stone-500">Add your first thought above.</p>
        </section>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map(n => (
            <article
              key={n._id}
              className="min-h-40 border border-stone-300/80 bg-white/82 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-stone-300/30"
            >
              <p className="whitespace-pre-wrap leading-7 text-stone-800">
                {n.content}
              </p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
