import PageHeader from '../PageHeader';

const GitPageComponents = () => {
  return (
    <div className="p-4 overflow-auto min-h-[calc(100vh-4rem)]">
      <div className="w-full px-4 py-2 overflow-auto rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.10)]">
        <PageHeader
          title="Git Commands"
          description="Git Commands && Git for DevOps"
        />
      </div>
      <div className='mt-4'>
        Git Page Components
      </div>
    </div>
  );
}

export default GitPageComponents;
