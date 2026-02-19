const NestedCheckbox = ({
  checkboxesData = [],
  setCheckboxesData,
  isNested = false,
}: {
  checkboxesData: any[];
  setCheckboxesData: any;
  isNested?: boolean;
}) => {
  const updateChildren = (children: any, checked: boolean) => {
    return children.map((child: any) => ({
      ...child,
      checked: checked,
      children: Array.isArray(child.children)
        ? updateChildren(child.children, checked)
        : child?.children,
    }));
  };

  const handleToggle = (id: any, checked: boolean) => {
    const updateTree = (nodes: any) => {
      return nodes.map((node: any) => {
        if (node.id === id) {
          return {
            ...node,
            checked: checked,
            children: Array.isArray(node.children)
              ? updateChildren(node.children, checked)
              : node.children,
          };
        }

        if (Array.isArray(node.children)) {
          const updatedChildren = updateTree(node.children);

          const allChildrenChecked = updatedChildren.every(
            (child: any) => child.checked,
          );

          return {
            ...node,
            checked: allChildrenChecked,
            children: updatedChildren,
          };
        }

        return node;
      });
    };

    setCheckboxesData((prev: any) => updateTree(prev));
  };

  return (
    <div>
      {Array.isArray(checkboxesData) &&
        checkboxesData?.map((item: any) => (
          <div key={item.id} className={`py-0.5 ${isNested && "ml-5"}`}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!item.checked}
                onChange={(e) => handleToggle(item.id, e.target.checked)}
              />
              <label>{item.name}</label>
            </div>
            {Array.isArray(item.children) && item.children.length > 0 && (
              <NestedCheckbox
                checkboxesData={item.children}
                setCheckboxesData={setCheckboxesData}
                isNested={true}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default NestedCheckbox;
