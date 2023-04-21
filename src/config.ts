import fs from "fs";
import jsonImport from "./config.json";

type ConfigData = Readonly<typeof jsonImport>;
type Config = ConfigData & { update: (obj: Partial<typeof config>) => void; };
let config = jsonImport as Config;
config.update = (obj: Partial<ConfigData>): void => {
    config = Object.assign(config, obj);
    fs.writeFileSync("../../config.json", JSON.stringify(config, null, "\t"));
};

export default config;
