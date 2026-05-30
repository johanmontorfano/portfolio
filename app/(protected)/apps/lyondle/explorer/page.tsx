"use client";

import { ColosseProperty, colosseTypes, getDatasetProperties } from "@/scripts/lyondle_mgr";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";

// will render an object value relative to its type
export function WithValue(props: { type: string, value: any }) {
  // Handle null or undefined gracefully in table cells
  if (props.value === null || props.value === undefined) {
    return <span className="text-base-content/30 italic text-sm">empty</span>;
  }

  switch (props.type) {
    case "int":
      return (
        <span className="font-mono font-semibold text-secondary">
          {Number(props.value).toFixed(0)}
        </span>
      );

    case "float":
      return (
        <span className="font-mono font-medium text-primary">
          {Number(props.value).toFixed(2)}
        </span>
      );

    case "list":
      const listArray = Array.isArray(props.value) 
        ? props.value 
        : typeof props.value === "string" 
          ? props.value.split(",").map(s => s.trim()) 
          : [props.value];

      return (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {listArray.map((item, index) => (
            <div key={index} className="badge badge-ghost badge-sm font-medium gap-1">
              {String(item)}
            </div>
          ))}
        </div>
      );

    case "str":
    default:
      const stringValue = String(props.value);
      return (
        <span className="text-base-content font-normal max-w-sm block truncate" title={stringValue}>
          {stringValue}
        </span>
      );
  }
}

export default function Page() {
    const [results, setResults] = useState([]);
    const [selectedDataset, setSelectedDataset] = useState("stations");
    const [selectedProperty, setSelectedProperty] = useState<
        ColosseProperty | null
    >(null);
    const [selectedComparator, setSelectedComparator] = useState<
        string | null
    >(null);
    const [searchString, setSearchString] = useState("");

    const datasetProperties = useMemo(() => {
        return getDatasetProperties(selectedDataset);
    }, [selectedDataset]);

    useEffect(() => {
        setResults([]);
        setSelectedProperty(null);
    }, [selectedDataset]);

    useEffect(() => {
        setSelectedComparator(null);
        setSearchString("");
    }, [selectedProperty]);

    async function handleQuery() {
        if (!selectedProperty || !selectedComparator) return;
        try {
            // since contain requests often implies the searchstring being a
            // substring of the property, we will reverse the serialized if it
            // is a in or out comparison.
            const serialized = [
                `${selectedProperty.type}:${selectedProperty.prop}`,
                selectedComparator,
                `${selectedProperty.type === "list" ?
                    "str" : selectedProperty.type
                }:[${searchString}]`
            ];

            if (["in", "out"].includes(selectedComparator))
                serialized.reverse();

            const res = await fetch("https://api.lyondle.fr/cql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    target: selectedDataset,
                    query: `SELECT ${serialized.join(" ")}`
                })
            });
            const body = await res.json();

            setResults(body.selected);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <p>Colosse Explorer</p>
            <form onSubmit={(ev) => {
                ev.preventDefault();
                handleQuery();
            }} className="flex gap-2 items-baseline">
                <select
                    defaultValue="Stations"
                    className="select max-w-32"
                    onChange={(ev) => {
                        setSelectedDataset(ev.target.value);
                    }}
                    required
                >
                    <option value="stations">Stations</option>
                    <option value="lines">Lines</option>
                </select>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        Search by property
                    </legend>
                    <select
                        value={selectedProperty ?
                            selectedProperty.prop :
                            "Select a property"
                        }
                        className="select"
                        onChange={(ev) => {
                            setSelectedProperty({
                                prop: ev.target.value,
                                ...getDatasetProperties(selectedDataset)[
                                    ev.target.value
                                ]
                            });
                        }}
                        required
                    >
                        <option disabled>Select a property</option>
                        {Object.entries(datasetProperties).map(d => (
                            <option
                                key={`o-prop-${d[0]}`}
                                value={d[0]}
                            >
                                {d[1].text}
                            </option>
                        ))}
                    </select>
                </fieldset>
                {selectedProperty && <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                        Comparison
                    </legend>
                    <select
                        className="select"
                        onChange={(ev) => {
                            setSelectedComparator(ev.target.value);
                        }}
                        value={selectedComparator || "Select a comparator"}
                        required
                    >
                        <option disabled>Select a comparator</option>
                        {colosseTypes[
                            selectedProperty.type
                        ].comparators.map((d, i) => (
                            <option
                                key={`o-comp-${
                                    colosseTypes[
                                        selectedProperty.type
                                    ].textComparators[i]
                                }`}
                                value={d}
                            >
                                {colosseTypes[
                                    selectedProperty.type
                                ].textComparators[i]}
                            </option>
                        ))}
                    </select>
                </fieldset>}
                {selectedComparator && <fieldset className="fieldset">
                    <legend className="fieldset-legend">Value</legend>
                    <input
                        type="text"
                        className="input"
                        placeholder="What are you looking for ?"
                        value={searchString}
                        onChange={(ev) => setSearchString(
                            ev.target.value
                        )}
                        required
                    />
                </fieldset>}
                <button 
                    className="btn btn-primary"
                    type="submit"
                    disabled={searchString === ""}
                >
                    <BsSearch />
                    Search
                </button>
            </form>
            <br />
            {results.length > 0 && <div className="overflow-x-auto border border-base-200 rounded-lg shadow-sm">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            {Object.values(
                                getDatasetProperties(selectedDataset)
                            ).map(v => <th key={"thead-" + v.text}>
                                {v.text}
                            </th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((r: Record<string, string>) => (
                            <tr key={"tr-" + r.id}>
                                {Object.entries(r).map((e, i) => (
                                    <td key={"td-" + r.id + "-" + e[0] + i}>
                                        <WithValue
                                            value={e[1]}
                                            type={getDatasetProperties(
                                                selectedDataset
                                            )[e[0]].type}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>}
            <br />
        </div>
    );
}
