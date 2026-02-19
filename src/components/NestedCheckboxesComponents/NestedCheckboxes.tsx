import { useState } from "react";
import NestedCheckbox from "./NestedCheckbox";
import { checkboxesData } from "./checkboxesData";

const NestedCheckboxes = () => {
  const [data, setData] = useState(checkboxesData);

  return <NestedCheckbox checkboxesData={data} setCheckboxesData={setData} />;
};

export default NestedCheckboxes;
