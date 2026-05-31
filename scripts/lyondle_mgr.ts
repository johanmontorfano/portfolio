export interface PartialColosseProperty {
    text: string; // humanized text value
    type: "str" | "int" | "float" | "list";
}

export interface PartialColosseType {
    text: string;
    comparators: string[];
    textComparators: string[];
}

export type ColosseType = PartialColosseType & { type: string };
export type ColosseProperty = PartialColosseProperty & { prop: string };

export const colosseTypes: Record<
    PartialColosseProperty["type"], PartialColosseType
> = {
    str: {
        text: "string",
        comparators: ["==", "!=", "in", "out"],
        textComparators: ["equals", "is not", "contains", "do not contain"]
    },
    int: {
        text: "whole number",
        comparators: ["==", "!=", ">=", "<="],
        textComparators: [
            "equals",
            "is not",
            "greater than or equal to",
            "lower than or equal to"
        ]
    },
    float: {
        text: "decimal number",
        comparators: ["==", "!=", ">=", "<="],
        textComparators: [
            "equals",
            "is not",
            "greater than or equal to",
            "lower than or equal to"
        ]
    },
    list: {
        text: "decimal number",
        comparators: ["in", "out"],
        textComparators: [
            "contains",
            "do not contain"
        ]
    },
}

export const stationsProperties: Record<string, PartialColosseProperty> = {
    "id": {
        text: "Station ID",
        type: "list"
    },
    "name": {
        text: "Station name",
        type: "str"
    },
    "nameCharacteristics": {
        text: "Station name characteristics",
        type: "list"
    },
    "linesType": {
        text: "Connections transit type",
        type: "list"
    },
    "linesColor": {
        text: "Connections line color",
        type: "list"
    },
    "connections": {
        text: "Connections",
        type: "list"
    },
    "stationCharacteristics": {
        text: "Station characteristics",
        type: "list"
    },
    "street": {
        text: "Street",
        type: "list"
    },
    "lon": {
        text: "Longitude",
        type: "float"
    },
    "lat": {
        text: "Latitude",
        type: "float"
    },
    "borough": {
        text: "Borough",
        type: "list"
    },
    "city": {
        text: "City",
        type: "list"
    },
    "terminus": {
        text: "Is a terminus?",
        type: "int"
    },
    "cognitiveScore": {
        text: "Cognitive score",
        type: "float"
    }
};

export const linesProperties: Record<string, PartialColosseProperty> = {
    "id": {
        text: "Line ID",
        type: "int"
    },
    "line": {
        text: "Line Human ID",
        type: "str"
    },
    "termA": {
        text: "Terminus A ID",
        type: "list"
    },
    "termB": {
        text: "Terminus B ID",
        type: "list"
    },
    "termAName": {
        text: "Terminus A name",
        type: "str"
    },
    "termBName": {
        text: "Terminus B name",
        type: "str"
    },
    "lineType": {
        text: "Transit type",
        type: "str"
    },
    "color": {
        text: "Line color",
        type: "str"
    }
};

export function getDatasetProperties(dataset: string) {
    if (dataset === "stations") return stationsProperties;
    else if (dataset === "lines") return linesProperties;
    throw Error("Invalid dataset name: " + dataset);
}
