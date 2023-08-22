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

const sqlForPartialUpdate = (
  dataToUpdate: DataToUpdate,
  nodeToSql: NodeToSql
): SqlForPartialUpdateResult => {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) {
    throw new BadRequestError("No data");
  }

  const cols: string[] = keys.map(
    (colName, idx) => `"${nodeToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
};

export { sqlForPartialUpdate };
