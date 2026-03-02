import Disk from "./Disk";

interface TowerProps {
  tower: any;
}

const Tower = ({ tower }: TowerProps) => {
  return (
    <div className="flex items-end justify-center min-w-52 h-full pb-2 relative">
      {/* Pole */}
      <div className="absolute bottom-0 w-2 h-64 bg-gray-700 rounded-t-md" />
      {/* Base */}
      <div className="absolute bottom-0 w-full h-2 bg-gray-700 rounded-md" />

      {/* Disks */}
      <div className="px-4 flex flex-col-reverse items-center">
      {tower.length && tower?.map((disk: any, diskIndex: any) => (
        <Disk key={diskIndex} disk={disk} />
      ))}
      </div>
    </div>
  );
};

export default Tower;
