/* eslint-disable @typescript-eslint/naming-convention */
import { createContext } from "react";

/**
 * Represents a page object which can be accessed from the `PagesContext`.
 *
 * @interface IPage
 * @typedef {IPage}
 */
export interface IPage {
    element: JSX.Element;
    label: string;
    link: string;
}

// Creates a React Context to pass the pages down to the navbar element.
export const PagesContext = createContext<IPage[]>([]);
