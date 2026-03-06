import type { ClassName, ReactNode } from "react";

/**
 * Sets the title of the page.
 * @param options - The options for the layout.
 * @param options.className - The CSS class name for the wrapper.
 * @param options.header - The header of the page.
 * @param options.footer - The footer of the page.
 * @returns The children of the page.
 */
export function layout(options?: {
    className?: ClassName;
    header?: ReactNode;
    footer?: ReactNode;
}): (props: { children: ReactNode; }) => ReactNode {
    return ({ children }: { children: ReactNode; }): ReactNode => (
        <div className={options?.className ?? ""}>
            {options?.header}
            {children}
            {options?.footer}
        </div>
    );
}
