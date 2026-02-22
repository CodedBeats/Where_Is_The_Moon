export type OrientationClassification =
    | "wall-ish"
    | "sky-ish"
    | "floor-ish"
    | "right-wall-ish"
    | "left-wall-ish"
    | "unknown";

export interface OrientationData {
    classification: OrientationClassification;
    alpha: number | null;
    beta: number | null;
    gamma: number | null;
}