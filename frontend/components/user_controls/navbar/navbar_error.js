
export class NavbarEntriesError extends Error{
    constructor(message) {
        let m = message || "NavbarLayout: navEntries must be an object with strings as keys pointing to strings" +
            " or other components. You cannot use components by itself.";
        super(`${m}`);
        this.name = "NavbarEntriesError";
    }
}

export class NavbarEntriesTitleErrors extends Error{
    constructor(message) {
        let m = message || "NavbarLayout: navEntries must be an object with strings as keys pointing to strings" +
            " or other components. You cannot use a component as the title of a navbar.";
        super(`${m}`);
        this.name = "NavbarEntriesTitleError";
    }
}