interface DiskProps {
  size: number;
}

const Disk = ({ size }: DiskProps) => {
  return (
    <div
      style={{ width: `${size === 1 ? 1.5 * 25 : size * 25}px` }}
      className="h-5 bg-teal-500 rounded-lg border border-teal-900"
    />
  );
};

export default Disk;
