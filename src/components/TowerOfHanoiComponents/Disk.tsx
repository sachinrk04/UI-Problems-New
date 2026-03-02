interface DiskProps {
  disk: number;
}

const Disk = ({ disk }: DiskProps) => {
  return (
    <div
      className="h-6 rounded-sm m-[0.5px] transition-all duration-500 z-0"
      style={{
        width: `${disk * 30}px`,
        backgroundColor: `hsl(${disk * 40}, 70%, 50%)`,
      }}
    />
  );
};

export default Disk;
