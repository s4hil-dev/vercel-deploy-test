// pages/Admin.jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes, deleteNote } from "../features/noteSlice";
import { useEffect } from "react";

export default function Admin() {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes);

  useEffect(() => {
    dispatch(fetchAllNotes());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-stone-300 pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-stone-500">
            Role management
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-stone-950">
            Admin Panel
          </h1>
        </div>
        <div className="border border-stone-300 bg-stone-50/80 px-5 py-3 text-sm text-stone-600 shadow-sm">
          {notes.length} total {notes.length === 1 ? "note" : "notes"}
        </div>
      </section>

      {notes.length === 0 ? (
        <section className="border border-dashed border-stone-300 bg-stone-50/50 px-6 py-16 text-center">
          <p className="text-lg font-medium text-stone-800">No notes found</p>
          <p className="mt-2 text-sm text-stone-500">User notes will appear here.</p>
        </section>
      ) : (
        <section className="grid gap-4">
          {notes.map(n => (
            <article
              key={n._id}
              className="flex flex-col justify-between gap-5 border border-stone-300/80 bg-white/82 p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <p className="leading-7 text-stone-800">
                  {n.content}
                </p>
                <p className="mt-2 text-sm text-stone-500">
                  {n.user?.email}
                </p>
              </div>

              <button
                onClick={() => dispatch(deleteNote(n._id))}
                className="self-start border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:border-red-300 hover:bg-red-100 sm:self-center"
              >
                Delete
              </button>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
