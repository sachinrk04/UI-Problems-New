interface GitCommandsAndDetailsProps {
    dataLists: any;
}

const GitCommandsAndDetails = ({dataLists}: GitCommandsAndDetailsProps) => {
    
  return (
    <div className="flex flex-col gap-y-4">
      {dataLists.map((item: any, index: number) => (
        <div key={index} className="space-y-0.5">
            <h4 className="text-base font-bold text-blue-500 ">{index + 1}: {item.title}</h4>
            <p className="text-sm font-medium text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GitCommandsAndDetails;
