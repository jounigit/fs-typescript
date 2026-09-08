import type { CoursePart } from "../App";
import type { FC } from "react";
import { Parts } from "./Part";

export const Content: FC<{ parts: CoursePart[] }> = ({ parts }) => {
    

    return (
        <div>
            <Parts courseParts={parts} />
        </div>
    );
}
