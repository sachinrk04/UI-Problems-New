import Light from './Light';

const Lights = ({variant = "col", activeLight = "RED"}) => {
  return (
    <div className={`flex flex-${variant} gap-4 p-3 bg-gray-900 rounded-md`}>
        <Light color = {activeLight === "RED" ? "red" : "gray"} />
        <Light color = {activeLight === "YELLOW" ? "yellow" : "gray"} />
        <Light color = {activeLight === "GREEN" ? "green" : "gray"} />
    </div>
  );
}

export default Lights;
