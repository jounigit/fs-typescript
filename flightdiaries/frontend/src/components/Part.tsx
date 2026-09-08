import type { CoursePart } from "../App";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Parts = ({ courseParts }: { courseParts: CoursePart[] }) => {
const showCourses = courseParts.map(part => {
        switch (part.kind) {
            case "basic":
                return (
                    <div key={part.name}>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b><br />
                        <i>{part.description}</i>
                    </p>
                    </div>
                )
            case "group":
                return (
                    <div key={part.name}>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b><br />
                        Project exercises: {part.groupProjectCount}
                    </p>
                    </div>
                )
            case "background":
                return (
                    <div key={part.name}>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b><br />
                        <i>{part.description}</i><br />
                        Background material: {part.backgroundMaterial}
                    </p>
                    </div>
                )
            case "special":
                return (
                    <div key={part.name}>
                    <p>
                        <b>{part.name} {part.exerciseCount}</b><br />
                        <i>{part.description}</i><br />
                        Required skills: {part.requirements.join(", ")}
                    </p>
                    </div>
                )
            default:
                return assertNever(part);
        }
    });

    return (
        <div>
            {showCourses}
        </div>
    );
}
