export function isNodeJs(){
    /*
        Way of detecting if running on Node.js
        @return true if the program is running in NodeJs.
     */
    return (typeof process !== 'undefined') &&
        ((process.release.name === 'node') ||
            // Node (>= 3.0.0) or io.js
            (process.release.name.search(/node|io.js/) !== -1) ||
            // Node (>= 0.10.0) or io.js
            (typeof process.versions.node !== 'undefined'));
}

export function isBrowser(){
    /*
        Way of detecting if running on browser.
        @return true if the program is runnin in the browser.
     */
    return (typeof window !== 'undefined')
}


function objectToString(obj){
    let mapping = Object.entries(obj).map(pair => {
        let [k, v] = pair;
        if (typeof v === 'object' && v !== null)
            v =  objectToString(v);
        return `${k}: ${v}`;
    })
    return `{ ${mapping.join(", ")} }`
}

export class debug {
    /*
        These are tools which help with debugging. They are not used in production.
    */
    static func(name, string){
        if (isNodeJs())
            console.log(`\x1b[37;45;1m   FUNC  \x1b[0m \x1b[35m${name}: ${string}\x1b[0m`);
        if (isBrowser())
            console.log(`%c  FUNC  ` + `%c ${name}` +`%c: ${string}`, "background:blue;color:white", "color:blue", "color:BBBBBB");
    }

    static log(string){
        if (isNodeJs())
            console.log(`\x1b[1;47;1m   LOG   \x1b[0m \x1b[37m${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c   LOG  ` + `%c ${string}`, "background:gray;color:white", "color:BBBBBB");
    }

    static condition(condition, string){
        if (isNodeJs())
            console.log(`\x1b[37;46;1m   ${condition.toUpperCase()}   \x1b[0m \x1b[34m${string}\x1b[0m`);
        else if (isBrowser())
            console.log("%c  COND  " + `%c ${condition} (` + `%c${string}` + `%c)` + "%c => true", `background:#00AAAA;color:white`, `color:blue`, "color:BBBBBB", `color:blue`, "color: blue");

    }

    static data(name, string){
        if (isNodeJs())
            console.log(`\x1b[37;42;1m   DATA   \x1b[0m \x1b[32m${name}=> ${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  DATA  ` + `%c ${name} = ` + `%c${JSON.stringify(string)}`, "background:green;color:white", "color:green", "color:BBBBBB");
    }

    static event(name, string){
        if (isNodeJs())
            console.log(`\x1b[1;45;1m  EVNT  \x1b[0m \x1b[37m${name}: ${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  EVNT  ` + `%c ${name}` + `%c: ${string}`, "background:purple;color:white", "color:purple", "color:BBBBBB");
    }

    static error(string){
        if (isNodeJs())
            console.log(`\x1b[1;41;1m   ERR  \x1b[0m \x1b[31m$${string}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c   ERR  ` + `%c ${string}`, "background:red;color:white", "color:red");
    }

    static react_error(action){
        let {type, errors} = action;
        if (!errors && !type)
            throw new Error(`A different error was thrown: ${action}`)
        errors.forEach(error => {
            if (isNodeJs())
                console.log(`\x1b[1;41;1m  ${type}  \x1b[0m \x1b[31m$${error}\x1b[0m`);
            else if (isBrowser())
                console.log(`%c  ${type}  ` + `%c ${error}`, "background:red;color:white", "color:red");
        })
    }

    static react_data(action){
        let {type, data} = action;
        let values = data;
        if (typeof data === 'object' && data !== null)
            values = Object.entries(data);

        if (isNodeJs())
            console.log(`\x1b[37;42;1m  ${type}  \x1b[0m \x1b[32m$${values}\x1b[0m`);
        else if (isBrowser())
            console.log(`%c  ${type}  ` + `%c${values}`, "background:green;color:white", "color:BBBBBB");
    }
}
