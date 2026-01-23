const Light = ({color = "red"}) => {
  return <div className={`w-16 h-16 bg-${color}-500 rounded-full`} />;
};

export default Light;
