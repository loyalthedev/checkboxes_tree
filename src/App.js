import "./App.css";
import Checkbox from "./Checkbox";
function App() {
  const response = [
    {
      label: "Parent 1",
      children: [
        {
          label: "parent 1 child",
        },
        {
          label: "parent 1 child2",
        },
        {
          label: "Parent 2",
          children: [
            {
              label: "parent 2 child",
            },
            {
              label: "parent 2 child2",
            },
            {
              label: "Parent 3",
              children: [
                {
                  label: "Child 1",
                },
                {
                  label: "Child 2",
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Checkbox response={response} />
    </>
  );
}

export default App;
