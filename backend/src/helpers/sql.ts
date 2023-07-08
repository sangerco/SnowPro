import { BadRequestError } from "../expressError";

interface DataToUpdate {
    [key: string]: any;
}

interface NodeToSql {
    [key: string]: string;
}

interface SqlForPartialUpdateResult {
    setCols: string;
    values: any[];
}

const sqlForPartialUpdate = 
    (dataToUpdate: DataToUpdate, nodeToSql: NodeToSql): SqlForPartialUpdateResult => {
        const keys = Object.keys(dataToUpdate);
        if (keys.length === 0) {
            throw new BadRequestError("No data")
        } 

        const cols: string[] = [];
        const values: any[] = [];

        keys.forEach((colName, idx) => {
            const value = dataToUpdate[colName];
            if(value !== undefined) {
                const sqlColName = nodeToSql[colName] || colName;
                cols.push(`"${sqlColName}"=$${idx + 1}`);
                values.push(value)
            }
            
        });

        return {
            setCols: cols.join(", "),
            values: Object.values(dataToUpdate)
        };
}

export { sqlForPartialUpdate }