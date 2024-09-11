import { useState } from "react";

// Recursive component to render checkboxes
const CheckboxTree = ({ nodes, onNodeChange, checkedState, level = 0 }) => {
  return (
    <div style={{ marginLeft: level * 20 }}>
      {nodes.map((node, index) => (
        <div key={index}>
          <input
            type='checkbox'
            checked={checkedState[node.label]?.checked || false}
            onChange={() => onNodeChange(node)}
          />{" "}
          {node.label}
          {node.children && (
            <CheckboxTree
              nodes={node.children}
              onNodeChange={onNodeChange}
              checkedState={checkedState}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Checkbox = ({ response }) => {
  // Helper function to flatten the data and initialize state
  const flattenTree = (nodes, parent = null) => {
    let flatData = {};
    nodes.forEach((node) => {
      flatData[node.label] = {
        checked: false,
        parent,
        children: node.children?.map((child) => child.label) || [],
      };
      if (node.children) {
        flatData = { ...flatData, ...flattenTree(node.children, node.label) };
      }
    });
    return flatData;
  };

  // Initialize the state with a flattened data structure
  const [checkedState, setCheckedState] = useState(flattenTree(response));

  // Handle change for a node (toggle state)
  const handleNodeChange = (node) => {
    const newState = { ...checkedState };

    // Toggle current node
    const isChecked = !newState[node.label].checked;
    newState[node.label].checked = isChecked;

    // Function to toggle all children recursively
    const toggleChildren = (nodeLabel, checked) => {
      const node = newState[nodeLabel];
      node.checked = checked;
      node.children.forEach((childLabel) =>
        toggleChildren(childLabel, checked)
      );
    };

    // Toggle all children of the current node
    toggleChildren(node.label, isChecked);

    // Function to update all parents recursively
    const updateParents = (nodeLabel) => {
      const node = newState[nodeLabel];
      if (node.parent) {
        const parent = newState[node.parent];
        // Uncheck parent if any child is unchecked
        parent.checked = parent.children.every(
          (childLabel) => newState[childLabel].checked
        );
        updateParents(node.parent);
      }
    };

    // Update parent nodes if the current node is unchecked
    if (!isChecked) {
      updateParents(node.label);
    }

    setCheckedState(newState);
  };

  return (
    <div>
      <h1>Nested Checkboxes</h1>
      <CheckboxTree
        nodes={response}
        onNodeChange={handleNodeChange}
        checkedState={checkedState}
      />
    </div>
  );
};

export default Checkbox;
