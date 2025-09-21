import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * MultiEntryInput - Reusable input for job/LinkedIn style entries
 * Props:
 *  label: string (section label)
 *  entries: array of { name, date, venue, media }
 *  onChange: function(entries)
 *  mediaLabel: string (optional)
 */
export default function MultiEntryInput({ label, entries, onChange, mediaLabel = "Upload Media" }) {
    const [localEntries, setLocalEntries] = useState(entries || [{ name: "", date: "", venue: "", media: null }]);

    const handleChange = (idx, field, value) => {
        const updated = localEntries.map((entry, i) =>
            i === idx ? { ...entry, [field]: value } : entry
        );
        setLocalEntries(updated);
        onChange(updated);
    };

    const handleAdd = () => {
        const updated = [...localEntries, { name: "", date: "", venue: "", media: null }];
        setLocalEntries(updated);
        onChange(updated);
    };

    const handleRemove = (idx) => {
        const updated = localEntries.filter((_, i) => i !== idx);
        setLocalEntries(updated);
        onChange(updated);
    };

    return (
        <div className="space-y-6">
            <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">{label}</h3>
            {localEntries.map((entry, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b pb-4 mb-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            value={entry.name}
                            onChange={e => handleChange(idx, "name", e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white"
                            placeholder="Name/Title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                        <input
                            type="date"
                            value={entry.date}
                            onChange={e => handleChange(idx, "date", e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Venue</label>
                        <input
                            type="text"
                            value={entry.venue}
                            onChange={e => handleChange(idx, "venue", e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-gray-900 dark:text-white"
                            placeholder="Venue/Location"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{mediaLabel}</label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={e => handleChange(idx, "media", e.target.files[0])}
                            className="block w-full text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                    {localEntries.length > 1 && (
                        <Button type="button" variant="outline" className="mt-2" onClick={() => handleRemove(idx)}>
                            Remove
                        </Button>
                    )}
                </div>
            ))}
            <Button type="button" className="mt-2" onClick={handleAdd}>
                Add Another
            </Button>
        </div>
    );
}
