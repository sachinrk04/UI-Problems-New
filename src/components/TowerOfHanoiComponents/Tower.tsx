import Disk from "./Disk";

interface TowerProps {
  disks: any;
  onClick: () => void;
}

const Tower = ({ disks, onClick }: TowerProps) => {
  return (
    <div className="flex flex-col items-center w-52 h-80 relative">
      <div className="w-2 flex-1 bg-gray-500 rounded-t-lg" />
      <div className="w-full h-2 bg-gray-500 rounded-lg" />
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div
          onClick={onClick}
          className="flex flex-col-reverse justify-start items-center p-2 h-full"
        >
          {disks.map((size: number, index: number) => (
            <Disk key={index} size={size} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tower;
