import { useEffect, useState } from "react";
import { useExplorerContext } from "@/components/explorer/context";
import { PartialColosseProperty } from "@/scripts/lyondle_mgr";
import { BsSave, BsX } from "react-icons/bs";

// allows editing object (line, station) data, changes are comitted to the
// initial object only on save
export function RowEditor(props: {
    dataset: Record<string, PartialColosseProperty>
}) {
    const ctx = useExplorerContext();
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (ctx.object) {
            setFormData({ ...ctx.object });
        } else {
            setFormData({});
        }
    }, [ctx.object]);

    if (!ctx.open || !ctx.object) return null;

    function onChange(key: string, value: any, type: string) {
        let processedValue = value;
        
        if (type === "int" || type === "float") {
            processedValue = value === "" ? "" : Number(value);
        } else if (type === "list") {
            processedValue = value;
        }
        setFormData((prev) => ({ ...prev, [key]: processedValue }));
    };

    function onSave(e: React.SubmitEvent) {
        e.preventDefault();
        ctx.setObject({ ...formData });
        if (ctx.onRequireSave) ctx.onRequireSave();
        ctx.setOpen(false);
    };

    return (
        <div className="modal modal-open modal-bottom sm:modal-middle">
            <div className="modal-box border border-base-300">
                <div className="flex justify-end">
                    <button 
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => ctx.setOpen(false)}
                    >
                        <BsX size={18} />
                    </button>
                </div>
                <form onSubmit={onSave} className="space-y-4">
                    <div className="max-h-[60vh] overflow-y-auto px-1 space-y-3">
                        {Object.entries(ctx.object).map(([key]) => {
                            if (key === "id") return null;

                            const propMeta = props.dataset[key];
                            const label = propMeta?.text || key;
                            const type = propMeta?.type || "str";
                            
                            const value = type === "list" && Array.isArray(
                                formData[key
                            ]) ? formData[key].join(", ") : formData[key] ?? "";

                            return (
                                <fieldset key={`field-${key}`} className="fieldset p-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <label className="fieldset-legend text-sm font-medium text-base-content/80">
                                            {label}
                                        </label>
                                        <span className="badge badge-xs badge-ghost font-mono opacity-60">
                                            {type}
                                        </span>
                                    </div>
                                    {type === "list" || (typeof value === "string" && value.length > 40) ? (
                                        <textarea
                                            className="textarea textarea-bordered w-full font-sans text-sm min-h-[5rem]"
                                            value={value}
                                            placeholder={
                                                type === "list" ?
                                                    "item1, item2, item3" : ""
                                            }
                                            onChange={(e) => onChange(
                                                key, e.target.value, type
                                            )}
                                        />
                                    ) : (
                                        <input
                                            type={
                                                type === "int" ||
                                                type === "float" ?
                                                    "number" : "text"
                                            }
                                            step={type === "float" ? "0.01" : "1"}
                                            className="input input-bordered w-full font-mono text-sm"
                                            value={value}
                                            onChange={(e) => onChange(
                                                key, e.target.value, type
                                            )}
                                        />
                                    )}
                                </fieldset>
                            );
                        })}
                    </div>
                    <div className="modal-action border-t border-base-200 pt-3 mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => ctx.setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary gap-2"
                        >
                            <BsSave size={16} />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <div
                className="modal-backdrop"
                onClick={() => ctx.setOpen(false)}
            />
        </div>
    );
}
